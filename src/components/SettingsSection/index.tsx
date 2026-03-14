import React from 'react'
import { Text, View } from 'react-native'
import { useStyles } from './styles'

type Props = {
  label: string
  children: React.ReactNode
}

export function SettingsSection({ label, children }: Props) {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  )
}
