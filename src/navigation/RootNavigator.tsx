import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { AddEditScreen, SettingsScreen } from '@/screens'
import { FloatingTabBar } from '@/components/FloatingTabBar'
import { HomeStack } from './HomeStack'
import { AddEditParamList, RootTabParamList, SettingsParamList } from './types'

const Tab = createBottomTabNavigator<RootTabParamList>()
const AddEditStack = createNativeStackNavigator<AddEditParamList>()
const SettingsStack = createNativeStackNavigator<SettingsParamList>()

// WHY freezeOnBlur: freezes off-screen components, saves CPU on nested navigators.
const STACK_OPTIONS = { headerShown: false, freezeOnBlur: true } as const

const SCREEN_OPTIONS = { headerShown: false, freezeOnBlur: true } as const

// WHY () => null: hides default tab bar. FloatingTabBar renders as absolute overlay
// on top of the navigator, bypassing RN's opaque tab bar wrapper View.
const HIDE_DEFAULT_TAB_BAR = () => null

const ROOT_STYLE = { flex: 1 } as const

function AddEditNavigator() {
  return (
    <AddEditStack.Navigator screenOptions={STACK_OPTIONS}>
      <AddEditStack.Screen name="AddEdit" component={AddEditScreen} />
    </AddEditStack.Navigator>
  )
}

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={STACK_OPTIONS}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}

export function RootNavigator() {
  return (
    <View style={ROOT_STYLE}>
      <Tab.Navigator screenOptions={SCREEN_OPTIONS} tabBar={HIDE_DEFAULT_TAB_BAR}>
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="AddEditTab" component={AddEditNavigator} />
        <Tab.Screen name="SettingsTab" component={SettingsNavigator} />
      </Tab.Navigator>
      {/* Later in JSX = higher in z-order. Renders as absolute overlay above screens. */}
      <FloatingTabBar />
    </View>
  )
}
