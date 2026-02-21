import { StyleSheet } from 'react-native'
import { Theme } from './types'
import { useContext, useMemo } from 'react'
import { ThemeContext } from './ThemeContext'

type StyleFactory<T extends StyleSheet.NamedStyles<T>> = (theme: Theme) => T

export function createStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: StyleFactory<T>,
) {
  return function useStyles() {
    const theme = useContext(ThemeContext)
    if (!theme) {
      throw new Error('useStyles must be used within ThemeProvider')
    }
    return useMemo(() => StyleSheet.create(factory(theme)), [theme])
  }
}
