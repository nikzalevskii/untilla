import type { CountdownTheme } from '@/types'

type CardThemeColors = {
  gradientStart: string
  gradientEnd: string
}

const lightCardThemes: Record<CountdownTheme, CardThemeColors> = {
  violet: { gradientStart: '#9061F9', gradientEnd: '#5B3FD4' },
  rose: { gradientStart: '#F9437A', gradientEnd: '#C4185A' },
  amber: { gradientStart: '#FBAD33', gradientEnd: '#E07A12' },
  emerald: { gradientStart: '#2DD4A0', gradientEnd: '#0E8C72' },
  sky: { gradientStart: '#38B2F6', gradientEnd: '#1A6FBF' },
  slate: { gradientStart: '#6B7F99', gradientEnd: '#3D4F66' },
}

const darkCardThemes: Record<CountdownTheme, CardThemeColors> = {
  violet: { gradientStart: '#7B47ED', gradientEnd: '#4527A8' },
  rose: { gradientStart: '#E32D67', gradientEnd: '#A01048' },
  amber: { gradientStart: '#E89B1A', gradientEnd: '#C06510' },
  emerald: { gradientStart: '#17B88A', gradientEnd: '#0A7560' },
  sky: { gradientStart: '#1E9EE6', gradientEnd: '#10578F' },
  slate: { gradientStart: '#556B82', gradientEnd: '#2E3D50' },
}

export function getCardColors(
  theme: CountdownTheme,
  isDark: boolean,
): CardThemeColors {
  const map = isDark ? darkCardThemes : lightCardThemes
  return map[theme] ?? lightCardThemes.violet
}
