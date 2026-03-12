import React from 'react'
import { Pressable, Text } from 'react-native'
import { useStyles } from './styles'
import type { TabBarItemProps } from './types'

// WHY containerActive: Pencil показывает active tab как pill с фиолетовым фоном
// (cornerRadius 26) и белой иконкой/текстом — более явное визуальное различие,
// чем просто фиолетовый текст на белом фоне.
export function TabBarItem({ Icon, label, isActive, iconColor, onPress }: TabBarItemProps) {
  const styles = useStyles()

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isActive && styles.containerActive,
        pressed && styles.containerPressed,
      ]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
    >
      <Icon color={iconColor} size={18} />
      <Text
        style={isActive ? styles.labelActive : styles.labelInactive}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  )
}
