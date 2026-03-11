import { useState, useEffect } from 'react'
import type { CountdownValue } from '@/types'

export function calculateTimeRemaining(targetDate: string): CountdownValue {
  const now = Date.now()
  const target = new Date(targetDate).getTime()
  const diff = target - now

  const isPast = diff <= 0
  const absDiff = Math.abs(diff)

  const totalDays = Math.floor(absDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000)

  const nowDate = new Date(now)
  const targetDateObj = new Date(targetDate)
  const isToday =
    nowDate.getFullYear() === targetDateObj.getFullYear() &&
    nowDate.getMonth() === targetDateObj.getMonth() &&
    nowDate.getDate() === targetDateObj.getDate()

  return { totalDays, hours, minutes, seconds, isPast, isToday }
}

/**
 * Hook for live-updating remaining time.
 *
 * @param targetDate — ISO 8601 event date
 * @param interval — update frequency:
 *   'minute' (default) — for lists (Home Screen). 10 cards × 1 update/min = OK
 *   'second' — for detail screen. 1 card × 1 update/sec = OK
 *
 * Why two modes:
 * → Home Screen has 10+ cards. If each updates every second:
 *   10 re-renders/sec × React reconciliation = noticeable lag on weak devices.
 * → Detail screen has one card — per-second updates give "ticking" seconds.
 *
 * Lazy initialization via useState(() => ...) — calculateTimeRemaining
 * is called only on first render, not on every re-render.
 *
 * Note on freezeOnBlur:
 * When screen is frozen (freezeOnBlur: true on Stack), React does not process
 * state updates. setInterval keeps running, but setRemaining does not trigger
 * re-renders on the frozen component. On return, React applies the latest
 * value — user sees up-to-date time. Not a leak — timer is cleared on unmount.
 */
export function useTimeRemaining(
  targetDate: string,
  interval: 'minute' | 'second' = 'minute',
): CountdownValue {
  const [remaining, setRemaining] = useState<CountdownValue>(() =>
    calculateTimeRemaining(targetDate),
  )

  useEffect(() => {
    setRemaining(calculateTimeRemaining(targetDate))

    const ms = interval === 'second' ? 1000 : 60_000

    const timer = setInterval(() => {
      setRemaining(calculateTimeRemaining(targetDate))
    }, ms)

    return () => clearInterval(timer)
  }, [targetDate, interval])

  return remaining
}
