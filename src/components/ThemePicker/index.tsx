import React, { memo } from 'react'
import { View } from 'react-native'
import { useTheme } from '@/hooks'
import { CARD_THEMES } from '@/constants'
import { ThemeCircle } from '@/components/ThemeCircle'
import { useStyles } from './styles'
import type { CountdownTheme } from '@/types'

type Props = {
  selected: CountdownTheme
  onSelect: (theme: CountdownTheme) => void
}

function ThemePickerComponent({ selected, onSelect }: Props) {
  const styles = useStyles()
  const { isDark } = useTheme()

  return (
    <View style={styles.container}>
      {CARD_THEMES.map(themeKey => (
        <ThemeCircle
          key={themeKey}
          themeKey={themeKey}
          isDark={isDark}
          isSelected={selected === themeKey}
          onPress={onSelect}
        />
      ))}
    </View>
  )
}

export const ThemePicker = memo(ThemePickerComponent)
