import { useCallback } from 'react'
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native'
import { SafeTopView } from '@/components/ui/SafeTopView'
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
import type { AddEditParamList } from '@/navigation/types'
import { useFocusEffect } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { CountdownFormData, CountdownFormInput, countdownFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStyles } from './styles'
import { SaveButton } from './SaveButton'
import { DateSection } from './DateSection'

type Props = NativeStackScreenProps<AddEditParamList, 'AddEdit'>

export function AddEditScreen({ route, navigation }: Props) {
  const styles = useStyles()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const editId = route.params?.id
  const isEditing = !!editId
  const existingCountdown = useCountdownById(editId ?? '')

  const { 
    control, 
    handleSubmit, 
    reset, 
    setValue, 
  } = useForm<CountdownFormInput, unknown, CountdownFormData>({
    resolver: zodResolver(countdownFormSchema),
    defaultValues: {
      title: '',
      targetDate: new Date().toISOString(),
      mode: DEFAULT_MODE,
      category: undefined,
      theme: DEFAULT_THEME,
      note: '',
      notificationsEnabled: true,
    }
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        title: existingCountdown?.title ?? '',
        targetDate: existingCountdown?.targetDate ?? new Date().toISOString(),
        mode: existingCountdown?.mode ?? DEFAULT_MODE,
        category: existingCountdown?.category,
        theme: existingCountdown?.theme ?? DEFAULT_THEME,
        note: existingCountdown?.note ?? '',
        notificationsEnabled: existingCountdown?.notificationsEnabled ?? true,
      })
    }, [editId])
  )

  const createCountdown = useCountdownStore(state => state.createCountdown)
  const updateCountdown = useCountdownStore(state => state.updateCountdown)

  const handleCancel = () => navigation.goBack()

  const onValid = (data: CountdownFormData) => {
    navigation.setParams({id: undefined})

    if (isEditing && editId) {
      updateCountdown(editId, {
        title: data.title,
        targetDate: data.targetDate,
        theme: data.theme,
        category: data.category,
        note: data.note,
        notificationsEnabled: data.notificationsEnabled,
        notificationOffsets: data.notificationsEnabled
          ? DEFAULT_NOTIFICATION_OFFSETS
          : [],
      })
    } else {
      createCountdown({
        title: data.title,
        targetDate: data.targetDate,
        mode: data.mode,
        theme: data.theme,
        category: data.category,
        note: data.note,
        notificationsEnabled: data.notificationsEnabled,
        notificationOffsets: data.notificationsEnabled
          ? DEFAULT_NOTIFICATION_OFFSETS
          : [],
      })
    }

    navigation.goBack()
  }

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
        <SaveButton
          control={control}
          onPress={handleSubmit(onValid)}
        />
      </View>

      {/* Form */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          control={control}
          name="title"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <FormInput
              label={t('addEdit.titleLabel')}
              value={value}
              onChangeText={onChange}
              placeholder={t('addEdit.titlePlaceholder')}
              maxLength={100}
              error={error && t(error.message!)}
            />
          )}
        />

        {/* Date */}
        <DateSection
          control={control}
          setValue={setValue}
        />

        {/* Mode */}

        {!isEditing && (
          <Controller
            control={control}
            name="mode"
            render={({field: {onChange, value}}) => (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>
                  {t('addEdit.modeLabel')}
                </Text>
                <ModeToggle value={value} onChange={onChange} />
              </View>
            )}
          />
        )}

        {/* Category */}

        <Controller
          control={control}
          name="category"
          render={({field: {onChange, value}}) => (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>
                {t('addEdit.categoryLabel')}
              </Text>
              <CategoryPicker selected={value} onSelect={onChange} />
            </View>
          )}
        />


        {/* Theme */}
        <Controller
          control={control}
          name="theme"
          render={({ field: { onChange, value } }) => (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>
                {t('addEdit.themeLabel')}
              </Text>
              <ThemePicker selected={value} onSelect={onChange} />
            </View>
          )}
        />

        {/* Note */}
        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, value }, fieldState: {error} }) => (
            <FormInput
              label={t('addEdit.noteLabel')}
              value={value ?? ''}
              onChangeText={onChange}
              placeholder={t('addEdit.notePlaceholder')}
              maxLength={500}
              multiline
              error={error && t(error.message!)}
            />
          )}
        />

        {/* Notifications */}
        <Controller
          control={control}
          name="notificationsEnabled"
          render={({ field: { onChange, value } }) => (
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
                value={value}
                onValueChange={onChange}
                trackColor={{
                  true: colors.primary,
                  false: colors.surfaceSecondary,
                }}
                thumbColor="#FFFFFF"
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeTopView>
  )
}
