import React from 'react'
import { Pressable, Text } from 'react-native'
import { useStyles } from './styles'
import type { TabBarItemProps } from './types'

export function TabBarItem({ Icon, label, isActive, iconColor, onPress }: TabBarItemProps) {
  const styles = useStyles()

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
    >
      <Icon color={iconColor} />
      <Text
        style={isActive ? styles.labelActive : styles.labelInactive}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  )
}
