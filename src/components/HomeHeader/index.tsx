import { Text, View } from 'react-native'
import { useStyles } from './styles'

export const HomeHeader = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Untilla</Text>
    </View>
  )
}
