import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList } from './types'
import { CountdownDetailScreen, HomeScreen } from '@/screens'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const STACK_OPTIONS = { headerShown: false, freezeOnBlur: true } as const

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={STACK_OPTIONS}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CountdownDetail" component={CountdownDetailScreen} />
    </Stack.Navigator>
  )
}
