import { memo } from 'react'
import { Pressable, Text } from 'react-native'
import { useWatch, Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'
import type { CountdownFormInput } from './schema'

type Props = {
  control: Control<CountdownFormInput>
  onPress: () => void
}

function SaveButtonComponent({ control, onPress }: Props) {
  const styles = useStyles()
  const { t } = useTranslation()

  const titleValue = useWatch({ control, name: 'title' })

  const canSave = titleValue.trim().length > 0

  return (
    <Pressable
      onPress={onPress}
      style={styles.headerButton}
      disabled={!canSave}
    >
      <Text style={[styles.saveText, !canSave && styles.saveDisabled]}>
        {t('addEdit.save')}
      </Text>
    </Pressable>
  )
}

export const SaveButton = memo(SaveButtonComponent)