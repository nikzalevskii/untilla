import { useCallback, useState } from 'react'
import {
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native'
import { SafeTopView } from '@/components/ui/SafeTopView'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useTranslation } from 'react-i18next'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTheme } from '@/hooks'
import {
  DEFAULT_MODE,
  DEFAULT_THEME,
  DEFAULT_NOTIFICATION_OFFSETS,
} from '@/constants'
import { useCountdownById, useCountdownStore } from '@/store/countdownStore'
import {
  FormInput,
  CategoryPicker,
  ThemePicker,
  ModeToggle,
} from '@/components'
import { CalendarIcon } from '@/components/ui/icons/CalendarIcon'
import { useStyles } from './styles'
import type { AddEditParamList } from '@/navigation/types'
import type { CountdownCategory, CountdownMode, CountdownTheme } from '@/types'
import { useFocusEffect } from '@react-navigation/native'

type Props = NativeStackScreenProps<AddEditParamList, 'AddEdit'>

export function AddEditScreen({ route, navigation }: Props) {
  const styles = useStyles()
  const { colors, isDark } = useTheme()
  const { t } = useTranslation()
  const isAndroid = Platform.OS === 'android'

  const editId = route.params?.id
  const isEditing = !!editId
  const existingCountdown = useCountdownById(editId ?? '')

  const [title, setTitle] = useState(existingCountdown?.title ?? '')
  const [targetDate, setTargetDate] = useState(
    existingCountdown?.targetDate ?? new Date().toISOString(),
  )
  const [mode, setMode] = useState<CountdownMode>(
    existingCountdown?.mode ?? DEFAULT_MODE,
  )
  const [category, setCategory] = useState<CountdownCategory | undefined>(
    existingCountdown?.category,
  )
  const [theme, setTheme] = useState<CountdownTheme>(
    existingCountdown?.theme ?? DEFAULT_THEME,
  )
  const [note, setNote] = useState(existingCountdown?.note ?? '')
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    existingCountdown?.notificationsEnabled ?? true,
  )
  const [showDatePicker, setShowDatePicker] = useState(false)

  const createCountdown = useCountdownStore(state => state.createCountdown)
  const updateCountdown = useCountdownStore(state => state.updateCountdown)

  const canSave = title.trim().length > 0

  useFocusEffect(
    useCallback(() => {
      setTitle(existingCountdown?.title ?? '')
      setTargetDate(existingCountdown?.targetDate ?? new Date().toISOString())
      setMode(existingCountdown?.mode ?? DEFAULT_MODE)
      setCategory(existingCountdown?.category)
      setTheme(existingCountdown?.theme ?? DEFAULT_THEME)
      setNote(existingCountdown?.note ?? '')
      setNotificationsEnabled(existingCountdown?.notificationsEnabled ?? true)
      setShowDatePicker(false)
    }, [editId])
  )

  const handleCancel = () => navigation.goBack()

  const handleSave = () => {
    if (!canSave) return

    navigation.setParams({ id: undefined })

    if (isEditing && editId) {
      updateCountdown(editId, {
        title: title.trim(),
        targetDate,
        theme,
        category,
        note: note.trim() || undefined,
        notificationsEnabled,
        notificationOffsets: notificationsEnabled
          ? DEFAULT_NOTIFICATION_OFFSETS
          : [],
      })
    } else {
      createCountdown({
        title: title.trim(),
        targetDate,
        mode,
        theme,
        category,
        note: note.trim() || undefined,
        notificationsEnabled,
        notificationOffsets: notificationsEnabled
          ? DEFAULT_NOTIFICATION_OFFSETS
          : [],
      })
    }

    navigation.goBack()
  }

  const handleDatePress = () => setShowDatePicker(true)

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    // Android closes picker on any action; iOS keeps it open
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }
    if (event.type === 'set' && selectedDate) {
      setTargetDate(selectedDate.toISOString())
    }
  }

  const dateValue = new Date(targetDate)

  const formattedDate = dateValue.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <SafeTopView style={styles.container}>
      {/* Header: Cancel / Title / Save */}
      <View style={styles.header}>
        <Pressable onPress={handleCancel} style={styles.headerButton}>
          <Text style={styles.cancelText}>{t('addEdit.cancel')}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {isEditing ? t('addEdit.editTitle') : t('addEdit.newTitle')}
        </Text>
        <Pressable
          onPress={handleSave}
          style={styles.headerButton}
          disabled={!canSave}
        >
          <Text style={[styles.saveText, !canSave && styles.saveDisabled]}>
            {t('addEdit.save')}
          </Text>
        </Pressable>
      </View>

      {/* Form */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <FormInput
          label={t('addEdit.titleLabel')}
          value={title}
          onChangeText={setTitle}
          placeholder={t('addEdit.titlePlaceholder')}
          maxLength={100}
        />

        {/* Date */}
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

        {/* Mode */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('addEdit.modeLabel')}</Text>
          <ModeToggle value={mode} onChange={setMode} />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('addEdit.categoryLabel')}</Text>
          <CategoryPicker selected={category} onSelect={setCategory} />
        </View>

        {/* Theme */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('addEdit.themeLabel')}</Text>
          <ThemePicker selected={theme} onSelect={setTheme} />
        </View>

        {/* Note */}
        <FormInput
          label={t('addEdit.noteLabel')}
          value={note}
          onChangeText={setNote}
          placeholder={t('addEdit.notePlaceholder')}
          maxLength={500}
          multiline
        />

        {/* Notifications */}
        <View style={styles.notificationsRow}>
          <View style={styles.notificationsText}>
            <Text style={styles.notificationsTitle}>
              {t('addEdit.notificationsTitle')}
            </Text>
            <Text style={styles.notificationsDescription}>
              {t('addEdit.notificationsDescription')}
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{
              true: colors.primary,
              false: colors.surfaceSecondary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>
      </ScrollView>
    </SafeTopView>
  )
}
