import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { CountdownMode } from '@/types'
import { useTimeRemaining } from './useTimeRemaining'
import { formatCountdown, type FormattedCountdown } from '@/utils'

// Wraps useTimeRemaining + formatCountdown + i18n into a single hook.
// Components only need one call instead of wiring three dependencies.
// useMemo ensures recalculation only when timeRemaining changes.
export function useFormattedCountdown(
  targetDate: string,
  mode: CountdownMode,
  interval: 'minute' | 'second' = 'minute',
): FormattedCountdown {
  const timeRemaining = useTimeRemaining(targetDate, interval)
  const { t } = useTranslation()

  return useMemo(
    () => formatCountdown(timeRemaining, mode, t),
    [timeRemaining, mode, t],
  )
}
