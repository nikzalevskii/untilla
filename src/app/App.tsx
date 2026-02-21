/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  )
}

function AppContent() {
  return (
    <View style={styles.container}>
      <Text>UTILLA5</Text>
      <View style={styles.block}>
        <Text>UTILLA5</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(74, 111, 134)',
    paddingTop: 200,
  },
  block: {
    backgroundColor: 'rgb(31, 156, 58)',
  },
})

export default App
