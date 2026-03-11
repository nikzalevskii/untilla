import type { CountdownTheme } from '@/types'

type CardThemeColors = {
  gradientStart: string
  gradientEnd: string
}

const lightCardThemes: Record<CountdownTheme, CardThemeColors> = {
  violet: { gradientStart: '#8B5CF6', gradientEnd: '#6D28D9' },
  rose: { gradientStart: '#F43F5E', gradientEnd: '#BE123C' },
  amber: { gradientStart: '#F59E0B', gradientEnd: '#D97706' },
  emerald: { gradientStart: '#10B981', gradientEnd: '#059669' },
  sky: { gradientStart: '#0EA5E9', gradientEnd: '#0369A1' },
  slate: { gradientStart: '#64748B', gradientEnd: '#475569' },
}

const darkCardThemes: Record<CountdownTheme, CardThemeColors> = {
  violet: { gradientStart: '#7C3AED', gradientEnd: '#5B21B6' },
  rose: { gradientStart: '#E11D48', gradientEnd: '#9F1239' },
  amber: { gradientStart: '#D97706', gradientEnd: '#B45309' },
  emerald: { gradientStart: '#059669', gradientEnd: '#047857' },
  sky: { gradientStart: '#0284C7', gradientEnd: '#075985' },
  slate: { gradientStart: '#475569', gradientEnd: '#334155' },
}

/**
 * @param theme
 * @param isDark
 */
export function getCardColors(
  theme: CountdownTheme,
  isDark: boolean,
): CardThemeColors {
  const map = isDark ? darkCardThemes : lightCardThemes
  return map[theme] ?? lightCardThemes.violet
}
