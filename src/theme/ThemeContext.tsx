import { createContext, useMemo } from 'react'
import { Theme } from './types'
import { useColorScheme } from 'react-native'
import { darkColors, lightColors } from './colors'
import { spacing } from './spacing'
import { typography } from './typography'
import { borderRadius } from './borderRadius'
import { shadows } from './shadows'
import { useSettingsStore } from '@/store'

export const ThemeContext = createContext<Theme | null>(null)

interface Props {
  children: React.ReactNode
}
export function ThemeProvider({ children }: Props) {
  const colorScheme = useColorScheme()
  const themePreference = useSettingsStore(s => s.settings.themePreference)

  // 'system' → follow device setting, 'light'/'dark' → explicit override
  const isDark =
    themePreference === 'system'
      ? colorScheme === 'dark'
      : themePreference === 'dark'

  const theme = useMemo(
    () => ({
      colors: isDark ? darkColors : lightColors,
      spacing,
      typography,
      borderRadius,
      shadows: shadows(isDark),
      isDark,
    }),
    [isDark],
  )

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
