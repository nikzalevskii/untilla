import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AddEditParamList, RootTabParamList, SettingsParamList } from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddEditScreen, SettingsScreen } from '@/screens'
import { Text } from 'react-native'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { HomeStack } from './HomeStack'

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

type TabIconProps = {
  color: string
  size: number
}

const renderHomeIcon = ({ color, size }: TabIconProps) => (
  <Text style={{ fontSize: size, color }}>🏠</Text>
)

const renderAddIcon = ({ color, size }: TabIconProps) => (
  <Text style={{ fontSize: size, color }}>➕</Text>
)

const renderSettingsIcon = ({ color, size }: TabIconProps) => (
  <Text style={{ fontSize: size, color }}>⚙️</Text>
)

export function RootNavigator() {
  const { colors, spacing } = useTheme()
  const { t } = useTranslation()

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        paddingBottom: spacing.xs,
        paddingTop: spacing.xs,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600' as const,
      },
    }),
    [colors, spacing],
  )

  const homeTabOptions = useMemo(
    () => ({
      tabBarLabel: t('tabs.home'),
      tabBarIcon: renderHomeIcon,
    }),
    [t],
  )

  const addTabOptions = useMemo(
    () => ({
      tabBarLabel: t('tabs.add'),
      tabBarIcon: renderAddIcon,
    }),
    [t],
  )

  const settingsTabOptions = useMemo(
    () => ({
      tabBarLabel: t('tabs.settings'),
      tabBarIcon: renderSettingsIcon,
    }),
    [t],
  )

  return (
    <Tab.Navigator screenOptions={screenOptions}>
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
