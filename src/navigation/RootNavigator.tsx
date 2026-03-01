import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import { AddEditScreen, SettingsScreen } from '@/screens'
import { FloatingTabBar } from '@/components/FloatingTabBar'
import { HomeStack } from './HomeStack'
import { AddEditParamList, RootTabParamList, SettingsParamList } from './types'

const Tab = createBottomTabNavigator<RootTabParamList>()
const AddEditStack = createNativeStackNavigator<AddEditParamList>()
const SettingsStack = createNativeStackNavigator<SettingsParamList>()

const HIDDEN_HEADER = { headerShown: false } as const

function AddEditNavigator() {
  return (
    <AddEditStack.Navigator screenOptions={HIDDEN_HEADER}>
      <AddEditStack.Screen name="AddEdit" component={AddEditScreen} />
    </AddEditStack.Navigator>
  )
}

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={HIDDEN_HEADER}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}

export function RootNavigator() {
  const { t } = useTranslation()

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <FloatingTabBar {...props} />,
    [],
  )

  const screenOptions = useMemo(() => ({ headerShown: false }), [])

  const homeTabOptions = useMemo(() => ({ tabBarLabel: t('tabs.home') }), [t])
  const addTabOptions = useMemo(() => ({ tabBarLabel: t('tabs.add') }), [t])
  const settingsTabOptions = useMemo(
    () => ({ tabBarLabel: t('tabs.settings') }),
    [t],
  )

  return (
    <Tab.Navigator screenOptions={screenOptions} tabBar={renderTabBar}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={homeTabOptions}
      />
      <Tab.Screen
        name="AddEditTab"
        component={AddEditNavigator}
        options={addTabOptions}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsNavigator}
        options={settingsTabOptions}
      />
    </Tab.Navigator>
  )
}
