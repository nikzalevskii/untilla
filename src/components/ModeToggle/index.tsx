import React, { memo, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'
import type { CountdownMode } from '@/types'

type Props = {
  value: CountdownMode
  onChange: (mode: CountdownMode) => void
}

function ModeToggleComponent({ value, onChange }: Props) {
  const styles = useStyles()
  const { t } = useTranslation()

  const handleCountdown = useCallback(() => onChange('countdown'), [onChange])
  const handleCountup = useCallback(() => onChange('countup'), [onChange])

  const isCountdown = value === 'countdown'

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.option, isCountdown && styles.optionActive]}
        onPress={handleCountdown}
      >
        <Text
          style={[styles.optionText, isCountdown && styles.optionTextActive]}
        >
          {t('addEdit.modeCountdown')}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.option, !isCountdown && styles.optionActive]}
        onPress={handleCountup}
      >
        <Text
          style={[styles.optionText, !isCountdown && styles.optionTextActive]}
        >
          {t('addEdit.modeCountup')}
        </Text>
      </Pressable>
    </View>
  )
}

export const ModeToggle = memo(ModeToggleComponent)
