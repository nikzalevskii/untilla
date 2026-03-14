import React, { memo } from 'react'
import { Text, TextInput, View } from 'react-native'
import { useTheme } from '@/hooks'
import { useStyles } from './styles'

type Props = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  maxLength?: number
  multiline?: boolean
}

function FormInputComponent({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  multiline = false,
}: Props) {
  const styles = useStyles()
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  )
}

export const FormInput = memo(FormInputComponent)
