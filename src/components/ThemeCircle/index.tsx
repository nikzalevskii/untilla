import React, { memo, useCallback, useMemo } from 'react'
import { Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { getCardColors } from '@/theme/cardThemes'
import { useStyles } from './styles'
import type { CountdownTheme } from '@/types'

type Props = {
  themeKey: CountdownTheme
  isDark: boolean
  isSelected: boolean
  onPress: (key: CountdownTheme) => void
}

function ThemeCircleComponent({
  themeKey,
  isDark,
  isSelected,
  onPress,
}: Props) {
  const styles = useStyles()

  const handlePress = useCallback(() => {
    onPress(themeKey)
  }, [onPress, themeKey])

  const cardColors = getCardColors(themeKey, isDark)

  const gradientColors = useMemo(
    () => [cardColors.gradientStart, cardColors.gradientEnd],
    [cardColors.gradientStart, cardColors.gradientEnd],
  )

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => pressed && styles.circlePressed}
      accessibilityRole="button"
      accessibilityLabel={themeKey}
    >
      <LinearGradient
        colors={gradientColors}
        style={[styles.circle, isSelected && styles.circleSelected]}
      />
    </Pressable>
  )
}

export const ThemeCircle = memo(ThemeCircleComponent)
