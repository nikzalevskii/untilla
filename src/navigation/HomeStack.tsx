import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList } from './types'
import { CountdownDetailScreen, HomeScreen } from '@/screens'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CountdownDetail" component={CountdownDetailScreen} />
    </Stack.Navigator>
  )
}
