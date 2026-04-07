import { useEffect, useMemo, useState } from 'react'
import { Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks'
import { navigationRef } from '@/navigation/navigationRef'
import { useStyles } from './styles'
import { TabBarItem } from '@/components/TabBarItem'
import { FabButton } from '@/components/FabButton'
import { HomeIcon } from '@/components/ui/icons/HomeIcon'
import { SettingsIcon } from '@/components/ui/icons/SettingsIcon'

const PILL_HEIGHT = 64
const BOTTOM_MARGIN_ANDROID = 0
const BOTTOM_MARGIN_IOS = -12

// WHY navigationRef instead of BottomTabBarProps: renders as absolute overlay
// above Tab.Navigator, bypassing RN's opaque tab bar wrapper View.
export function FloatingTabBar() {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const styles = useStyles()
  const insets = useSafeAreaInsets()
  const isAndroid = Platform.OS === 'android'

  // WHY useState + listener: re-renders on every tab switch via navigationRef.
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      const state = navigationRef.getState()
      if (state) setActiveIndex(state.index)
    })
    return unsubscribe
  }, [])

  const bottomMargin = isAndroid ? BOTTOM_MARGIN_ANDROID : BOTTOM_MARGIN_IOS
  const bottomInset = Math.max(insets.bottom, 0)
  const bottomOffset = Math.max(bottomInset + bottomMargin, 0)

  const wrapperStyle = useMemo(
    () => ({ height: bottomOffset + PILL_HEIGHT }),
    [bottomOffset],
  )

  const containerStyle = useMemo(
    () => ({ bottom: bottomOffset }),
    [bottomOffset],
  )

  const isHomeActive     = activeIndex === 0
  const isAddActive      = activeIndex === 1
  const isSettingsActive = activeIndex === 2

  // WHY no useCallback: TabBarItem/FabButton are not wrapped in React.memo,
  // so stable references provide zero benefit. Deps change on every tab switch anyway.
  const handleHomePress = () => {
    if (!isHomeActive && navigationRef.isReady()) {
      navigationRef.navigate('HomeTab', { screen: 'Home' })
    }
  }

  const handleAddPress = () => {
    if (!isAddActive && navigationRef.isReady()) {
      navigationRef.navigate('AddEditTab' as never)
    }
  }

  const handleSettingsPress = () => {
    if (!isSettingsActive && navigationRef.isReady()) {
      navigationRef.navigate('SettingsTab' as never)
    }
  }

  // WHY white for active: active tab has violet background, needs white for contrast.
  const homeIconColor     = isHomeActive     ? '#FFFFFF' : colors.tabInactive
  const settingsIconColor = isSettingsActive ? '#FFFFFF' : colors.tabInactive

  return (
    <View style={[styles.wrapper, wrapperStyle]} pointerEvents="box-none">
      <View style={[styles.container, containerStyle]} pointerEvents="box-none">
        <View style={styles.pill}>
          <TabBarItem
            Icon={HomeIcon}
            label={t('tabs.home')}
            isActive={isHomeActive}
            iconColor={homeIconColor}
            onPress={handleHomePress}
          />
          <FabButton onPress={handleAddPress} />
          <TabBarItem
            Icon={SettingsIcon}
            label={t('tabs.settings')}
            isActive={isSettingsActive}
            iconColor={settingsIconColor}
            onPress={handleSettingsPress}
          />
        </View>
      </View>
    </View>
  )
}
