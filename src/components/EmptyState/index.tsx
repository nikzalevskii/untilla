import { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'

type Props = {
  onAdd: () => void
}

export const EmptyState = ({ onAdd }: Props) => {
  const styles = useStyles()
  const { t } = useTranslation()

  const handlePress = useCallback(() => {
    onAdd()
  }, [onAdd])

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⏳</Text>
      <Text style={styles.title}>{t('home.emptyTitle')}</Text>
      <Text style={styles.subtitle}>{t('home.emptySubtitle')}</Text>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>{t('home.emptyButton')}</Text>
      </Pressable>
    </View>
  )
}
