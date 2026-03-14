import React, { memo, useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'
import type { CountdownCategory } from '@/types'

type Props = {
  categoryKey: CountdownCategory
  color: string
  labelKey: string
  isSelected: boolean
  onPress: (key: CountdownCategory) => void
}

function CategoryChipComponent({
  categoryKey,
  color,
  labelKey,
  isSelected,
  onPress,
}: Props) {
  const styles = useStyles()
  const { t } = useTranslation()

  const handlePress = useCallback(() => {
    onPress(categoryKey)
  }, [onPress, categoryKey])

  const dotStyle = useMemo(
    () => [styles.dot, { backgroundColor: color }],
    [styles.dot, color],
  )

  return (
    <Pressable
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={t(labelKey)}
    >
      <View style={dotStyle} />
      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
        {t(labelKey)}
      </Text>
    </Pressable>
  )
}

export const CategoryChip = memo(CategoryChipComponent)
