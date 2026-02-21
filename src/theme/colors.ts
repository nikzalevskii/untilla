const palette = {
  purple50: '#F5F3FF',
  purple100: '#EDE9FE',
  purple500: '#8B5CF6',
  purple600: '#7C3AED',
  purple900: '#4C1D95',

  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray500: '#71717A',
  gray800: '#27272A',
  gray900: '#18181B',
  gray850: '#1F1F23',
  gray750: '#2E2E33',

  red400: '#F87171',
  red500: '#EF4444',
  green400: '#4ADE80',
  green500: '#22C55E',

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
  border: string
  error: string
  success: string
}

export const lightColors: ColorScheme = {
  background: palette.gray50,
  surface: palette.white,
  surfaceSecondary: palette.gray100,
  text: palette.gray900,
  textSecondary: palette.gray500,
  textTertiary: palette.gray200,
  primary: palette.purple600,
  primaryLight: palette.purple50,
  border: palette.gray200,
  error: palette.red500,
  success: palette.green500,
}

export const darkColors: ColorScheme = {
  background: palette.gray900,
  surface: palette.gray800,
  surfaceSecondary: palette.gray850,
  text: palette.gray50,
  textSecondary: palette.gray500,
  textTertiary: palette.gray800,
  primary: palette.purple500,
  primaryLight: palette.purple900,
  border: palette.gray750,
  error: palette.red400,
  success: palette.green400,
}
