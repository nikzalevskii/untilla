import React, { memo, useCallback } from 'react'
import { View } from 'react-native'
import { useStyles } from './styles'
import { CATEGORIES } from '@/constants'
import { CategoryChip } from '@/components/CategoryChip'
import type { CountdownCategory } from '@/types'

type Props = {
  selected: CountdownCategory | undefined
  onSelect: (category: CountdownCategory | undefined) => void
}

function CategoryPickerComponent({ selected, onSelect }: Props) {
  const styles = useStyles()

  const handlePress = useCallback(
    (key: CountdownCategory) => {
      onSelect(selected === key ? undefined : key)
    },
    [selected, onSelect],
  )

  return (
    <View style={styles.container}>
      {CATEGORIES.map(item => (
        <CategoryChip
          key={item.key}
          categoryKey={item.key}
          color={item.color}
          labelKey={item.labelKey}
          isSelected={selected === item.key}
          onPress={handlePress}
        />
      ))}
    </View>
  )
}

export const CategoryPicker = memo(CategoryPickerComponent)
