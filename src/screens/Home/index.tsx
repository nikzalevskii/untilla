import { Text, View } from 'react-native'
import { useStyles } from './styles'

export const HomeScreen = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Your countdowns will appear here</Text>
    </View>
  )
}
