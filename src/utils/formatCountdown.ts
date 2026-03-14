import type { CountdownMode, CountdownValue } from '@/types'

export type FormattedCountdown = {
  primary: string
  primaryLabel: string
  secondary: string
  full: string
}

type TranslateFn = (key: string, options?: Record<string, unknown>) => string

export function formatCountdown(
  value: CountdownValue,
  mode: CountdownMode,
  t: TranslateFn,
): FormattedCountdown {
  const { totalDays, hours, minutes, isPast, isToday } = value

  if (isToday && mode === 'countdown') {
    return {
      primary: '0',
      primaryLabel: t('countdown.today'),
      secondary: '',
      full: t('countdown.todayFull'),
    }
  }

  if (mode === 'countup') {
    return {
      primary: totalDays.toString(),
      primaryLabel: t('countdown.daysSince', { count: totalDays }),
      secondary: formatSecondary(hours, minutes, t),
      full: buildFullString(totalDays, hours, minutes, 'since', t),
    }
  }

  if (isPast) {
    return {
      primary: totalDays.toString(),
      primaryLabel: t('countdown.daysPast', { count: totalDays }),
      secondary: t('countdown.passed'),
      full: buildFullString(totalDays, hours, minutes, 'ago', t),
    }
  }

  return {
    primary: totalDays.toString(),
    primaryLabel: t('countdown.daysLeft', { count: totalDays }),
    secondary: formatSecondary(hours, minutes, t),
    full: buildFullString(totalDays, hours, minutes, 'left', t),
  }
}

function formatSecondary(
  hours: number,
  minutes: number,
  t: TranslateFn,
): string {
  return `${t('countdown.nHours', { count: hours })} ${t('countdown.nMinutes', { count: minutes })}`
}

// Builds accessibility-friendly string: "15 days, 3 hours, 24 minutes left"
function buildFullString(
  days: number,
  hours: number,
  minutes: number,
  suffix: 'left' | 'ago' | 'since',
  t: TranslateFn,
): string {
  const parts: string[] = []

  if (days > 0) {
    parts.push(t('countdown.nDays', { count: days }))
  }
  if (hours > 0) {
    parts.push(t('countdown.nHours', { count: hours }))
  }
  parts.push(t('countdown.nMinutes', { count: minutes }))

  const joined = parts.join(', ')

  switch (suffix) {
    case 'left':
      return t('countdown.fullLeft', { time: joined })
    case 'ago':
      return t('countdown.fullAgo', { time: joined })
    case 'since':
      return t('countdown.fullSince', { time: joined })
  }
}
