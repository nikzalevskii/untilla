import React from 'react'
import { Pressable } from 'react-native'
import { PlusIcon } from '@/components/ui/icons/PlusIcon'
import { useStyles } from './styles'

type Props = {
  onPress: () => void
}

export function FabButton({ onPress }: Props) {
  const styles = useStyles()

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Add countdown"
    >
      <PlusIcon />
    </Pressable>
  )
}
