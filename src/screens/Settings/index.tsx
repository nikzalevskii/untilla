import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'

export function SettingsScreen() {
  const { t } = useTranslation()
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>
    </View>
  )
}
