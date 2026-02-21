import { useTheme } from '@/hooks'
import { ThemeProvider } from '@/theme'
import { StatusBar, Text } from 'react-native'
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
  const { isDark } = useTheme()

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Text>UTILLA239</Text>
    </>
  )
}

export default App
