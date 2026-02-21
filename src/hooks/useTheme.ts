import { type Theme, ThemeContext } from '@/theme'
import { useContext } from 'react'

export function useTheme(): Theme {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return theme
}
