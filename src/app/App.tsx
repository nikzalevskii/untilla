import '@/i18n'
import { useTheme } from '@/hooks'
import { RootNavigator } from '@/navigation'
import { getNavigationTheme } from '@/navigation/theme'
import { ThemeProvider } from '@/theme'
import { NavigationContainer } from '@react-navigation/native'
import { useMemo } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

function AppContent() {
  const theme = useTheme()
  const { isDark } = theme
  const navigationTheme = useMemo(() => getNavigationTheme(theme), [theme])

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  )
}

export default App
