import { AddEditParamList } from '@/navigation/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'
import { Text, View } from 'react-native'

interface Props extends NativeStackScreenProps<AddEditParamList, 'AddEdit'> {}

export const AddEditScreen = ({ route }: Props) => {
  const { t } = useTranslation()
  const styles = useStyles()
  const isEditing = !!route.params?.id

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? t('addEdit.editTitle') : t('addEdit.newTitle')}
      </Text>
    </View>
  )
}
