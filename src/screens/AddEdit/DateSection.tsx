import { memo, useState } from 'react'
import { Pressable, Text, View, Platform } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useWatch, Control, UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks'
import { CalendarIcon } from '@/components/ui/icons/CalendarIcon'
import { useStyles } from './styles'
import type { CountdownFormInput } from './schema'

type Props = {
  control: Control<CountdownFormInput>
  setValue: UseFormSetValue<CountdownFormInput>
}

function DateSectionComponent({ control, setValue }: Props) {
  const styles = useStyles()
  const { colors, isDark } = useTheme()
  const { t, i18n } = useTranslation()
  const isAndroid = Platform.OS === 'android'

  const [showDatePicker, setShowDatePicker] = useState(false)

  const targetDateValue = useWatch({ control, name: 'targetDate' })
  const dateValue = new Date(targetDateValue)
  const formattedDate = dateValue.toLocaleDateString(i18n.language, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const handleDatePress = () => setShowDatePicker(true)

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (isAndroid) {
      setShowDatePicker(false)
    }
    if (event.type === 'set' && selectedDate) {
      setValue('targetDate', selectedDate.toISOString(), {
        shouldValidate: true,
      })
    }
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{t('addEdit.dateLabel')}</Text>
      {isAndroid ? (
        <>
          <Pressable
            onPress={handleDatePress}
            style={({ pressed }) => [
              styles.dateButton,
              pressed && styles.dateButtonPressed,
            ]}
          >
            <Text style={styles.dateText}>{formattedDate}</Text>
            <CalendarIcon color={colors.textSecondary} />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={dateValue}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </>
      ) : (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display="compact"
          onChange={handleDateChange}
          themeVariant={isDark ? 'dark' : 'light'}
        />
      )}
    </View>
  )
}

export const DateSection = memo(DateSectionComponent)