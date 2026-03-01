const palette = {
  // Фиолет (бренд-акцент)
  violet50: '#F5F3FF',
  violet100: '#EDE9FE',
  violet300: '#C4B5FD',
  violet400: '#A78BFA',
  violet500: '#8B5CF6',
  violet600: '#7C3AED',
  violet700: '#6D28D9',
  violet900: '#2E1065',

  // Тёплые нейтральные — коричневатый подтон, не холодный zinc/gray
  neutral50: '#FAFAF9',
  neutral100: '#F5F5F4',
  neutral200: '#E7E5E4',
  neutral400: '#A8A29E',
  neutral500: '#78716C',
  neutral700: '#44403C',
  neutral800: '#292524',
  neutral850: '#1C1917',
  neutral900: '#0F0E0D',
  neutral950: '#0A0908',

  white: '#FFFFFF',
  black: '#000000',
} as const

export type ColorScheme = {
  background: string
  surface: string
  surfaceSecondary: string
  text: string
  textSecondary: string
  textTertiary: string
  primary: string
  primaryLight: string
  primaryHover: string
  border: string
  borderSubtle: string
  error: string
  success: string
  warning: string
}

export const lightColors: ColorScheme = {
  background: palette.neutral50,
  surface: palette.white,
  surfaceSecondary: palette.neutral100,
  text: palette.neutral900,
  textSecondary: palette.neutral500,
  textTertiary: palette.neutral400,
  primary: palette.violet600,
  primaryLight: palette.violet50,
  primaryHover: palette.violet700,
  border: palette.neutral200,
  borderSubtle: palette.neutral100,
  error: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
}

export const darkColors: ColorScheme = {
  background: palette.neutral950,
  surface: palette.neutral900,
  surfaceSecondary: '#161412',
  text: palette.neutral50,
  textSecondary: palette.neutral400,
  textTertiary: palette.neutral700,
  primary: palette.violet400,
  primaryLight: '#2D1B69',
  primaryHover: palette.violet300,
  border: '#252321',
  borderSubtle: '#1A1917',
  error: '#F87171',
  success: '#4ADE80',
  warning: '#FCD34D',
}
