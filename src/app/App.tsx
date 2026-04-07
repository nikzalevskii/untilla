import i18n from '@/i18n'
import { useTheme } from '@/hooks'
import { RootNavigator } from '@/navigation'
import { navigationRef } from '@/navigation/navigationRef'
import { getNavigationTheme } from '@/navigation/theme'
import { ThemeProvider } from '@/theme'
import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StatusBar } from 'react-native'
import { getLocales } from 'react-native-localize'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { SplashScreen } from '@/screens'
import { useCountdownStore, useSettingsStore } from '@/store'

function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
  const [splashDone, setSplashDone] = useState(false)
  const initializeCountdowns = useCountdownStore(s => s.initialize)
  const initializeSettings = useSettingsStore(s => s.initialize)

  const handleSplashFinish = useCallback(() => {
    setSplashDone(true)
  }, [])

  useEffect(() => {
    initializeCountdowns()
    initializeSettings()
  }, [initializeCountdowns, initializeSettings])

  // Sync store language → i18next.
  // 'system' resolves to device language, 'en'/'ru' → explicit override.
  const language = useSettingsStore(s => s.settings.language)

  useEffect(() => {
    const resolved =
      language === 'system'
        ? getLocales()[0]?.languageCode || 'en'
        : language
    i18n.changeLanguage(resolved)
  }, [language])

  if (!splashDone) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SplashScreen onFinish={handleSplashFinish} />
      </>
    )
  }

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  )
}

export default App
