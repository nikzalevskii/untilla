import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks'
import { useStyles } from './styles'
import { TabBarItem } from '@/components/TabBarItem'
import { FabButton } from '@/components/FabButton'
import { HomeIcon } from '@/components/ui/icons/HomeIcon'
import { SettingsIcon } from '@/components/ui/icons/SettingsIcon'

const PILL_HEIGHT = 64
const FAB_SIZE = 56
const FAB_OVERHANG = FAB_SIZE / 2
const BOTTOM_MARGIN = 16

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme()
  const styles = useStyles()
  const insets = useSafeAreaInsets()

  const bottomInset = Math.max(insets.bottom, 0)

  const wrapperStyle = useMemo(
    () => ({ height: bottomInset + BOTTOM_MARGIN + PILL_HEIGHT + FAB_OVERHANG }),
    [bottomInset],
  )

  const containerStyle = useMemo(
    () => ({ bottom: bottomInset + BOTTOM_MARGIN }),
    [bottomInset],
  )

  const handleTabPress = useCallback(
    (routeName: string, routeKey: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      })
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName)
      }
    },
    [navigation],
  )

  const homeRoute     = state.routes[0]
  const addRoute      = state.routes[1]
  const settingsRoute = state.routes[2]

  const isHomeActive     = state.index === 0
  const isAddActive      = state.index === 1
  const isSettingsActive = state.index === 2

  const handleHomePress = useCallback(
    () => handleTabPress(homeRoute.name, homeRoute.key, isHomeActive),
    [handleTabPress, homeRoute.name, homeRoute.key, isHomeActive],
  )

  const handleAddPress = useCallback(
    () => handleTabPress(addRoute.name, addRoute.key, isAddActive),
    [handleTabPress, addRoute.name, addRoute.key, isAddActive],
  )

  const handleSettingsPress = useCallback(
    () => handleTabPress(settingsRoute.name, settingsRoute.key, isSettingsActive),
    [handleTabPress, settingsRoute.name, settingsRoute.key, isSettingsActive],
  )

  const homeLabel     = descriptors[homeRoute.key].options.tabBarLabel as string ?? 'Home'
  const settingsLabel = descriptors[settingsRoute.key].options.tabBarLabel as string ?? 'Settings'

  const homeIconColor     = isHomeActive     ? colors.primary : colors.textSecondary
  const settingsIconColor = isSettingsActive ? colors.primary : colors.textSecondary

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <View style={[styles.container, containerStyle]}>
        <FabButton onPress={handleAddPress} />
        <View style={styles.pill}>
          <TabBarItem
            Icon={HomeIcon}
            label={homeLabel}
            isActive={isHomeActive}
            iconColor={homeIconColor}
            onPress={handleHomePress}
          />
          <View style={styles.centerSpace} />
          <TabBarItem
            Icon={SettingsIcon}
            label={settingsLabel}
            isActive={isSettingsActive}
            iconColor={settingsIconColor}
            onPress={handleSettingsPress}
          />
        </View>
      </View>
    </View>
  )
}
