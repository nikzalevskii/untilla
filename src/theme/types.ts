import type { ColorScheme } from './colors'
import type { spacing } from './spacing'
import type { typography } from './typography'
import type { borderRadius } from './borderRadius'
import type { shadows } from './shadows'

export type Theme = {
  colors: ColorScheme
  spacing: typeof spacing
  typography: typeof typography
  borderRadius: typeof borderRadius
  shadows: ReturnType<typeof shadows>
  isDark: boolean
}
