import { HomeStackParamList } from '@/navigation/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'
import { Text, View } from 'react-native'

interface Props
  extends NativeStackScreenProps<HomeStackParamList, 'CountdownDetail'> {}

export const CountdownDetailScreen = ({ route }: Props) => {
  const { t } = useTranslation()
  const styles = useStyles()
  const { id } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('countdownDetail.title')}</Text>
      <Text style={styles.subtitle}>ID: {id}</Text>
    </View>
  )
}
