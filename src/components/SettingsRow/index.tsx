import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useStyles } from './styles'

type Props = {
  label: string
  value?: string
  rightElement?: React.ReactElement
  isDestructive?: boolean
  showDivider?: boolean
  onPress?: () => void
}

export function SettingsRow({
  label,
  value,
  rightElement,
  isDestructive = false,
  showDivider = false,
  onPress,
}: Props) {
  const styles = useStyles()

  const content = (
    <>
      <View style={styles.row}>
        <Text style={[styles.label, isDestructive && styles.labelDestructive]}>
          {label}
        </Text>
        {value !== undefined && <Text style={styles.value}>{value}</Text>}
        {rightElement}
      </View>
      {showDivider && <View style={styles.divider} />}
    </>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        {content}
      </Pressable>
    )
  }

  return <>{content}</>
}
