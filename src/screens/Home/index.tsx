import { Text, View } from 'react-native'
import { useStyles } from './styles'
import { useTranslation } from 'react-i18next'

export const HomeScreen = () => {
  const styles = useStyles()
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('home.title')}</Text>
      <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
    </View>
  )
}
