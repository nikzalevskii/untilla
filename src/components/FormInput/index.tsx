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
  error?: string
}

function FormInputComponent({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  multiline = false,
  error
}: Props) {
  const styles = useStyles()
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline, 
          error && styles.inputError
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export const FormInput = memo(FormInputComponent)
