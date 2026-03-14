import { useCallback, useMemo } from 'react'
import { Alert, Linking, ScrollView, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks'
import { useSettingsStore, useCountdownStore } from '@/store'
import { SettingsSection, SettingsRow } from '@/components'
import { ChevronRightIcon } from '@/components/ui/icons/ChevronRightIcon'
import { useStyles } from './styles'

// WHY cycle instead of picker: single tap cycles the value.
// Picker needs a modal + 2 taps. Cycle is faster for 3 options.
const THEME_CYCLE = ['system', 'light', 'dark'] as const
const LANGUAGE_CYCLE = ['system', 'en', 'ru'] as const

export const SettingsScreen = () => {
  const styles = useStyles()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const settings = useSettingsStore(state => state.settings)
  const updateSetting = useSettingsStore(state => state.updateSetting)

  const themeDisplayValue = useMemo(() => {
    const map = {
      system: t('settings.themeSystem'),
      light: t('settings.themeLight'),
      dark: t('settings.themeDark'),
    }
    return map[settings.themePreference]
  }, [settings.themePreference, t])

  const languageDisplayValue = useMemo(() => {
    const map = {
      system: t('settings.languageSystem'),
      en: t('settings.languageEnglish'),
      ru: t('settings.languageRussian'),
    }
    return map[settings.language]
  }, [settings.language, t])

  const handleThemePress = useCallback(() => {
    const currentIndex = THEME_CYCLE.indexOf(settings.themePreference)
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length
    updateSetting('themePreference', THEME_CYCLE[nextIndex])
  }, [settings.themePreference, updateSetting])

  const handleLanguagePress = useCallback(() => {
    const currentIndex = LANGUAGE_CYCLE.indexOf(settings.language)
    const nextIndex = (currentIndex + 1) % LANGUAGE_CYCLE.length
    updateSetting('language', LANGUAGE_CYCLE[nextIndex])
  }, [settings.language, updateSetting])

  const handleHapticsToggle = useCallback(
    (value: boolean) => updateSetting('hapticsEnabled', value),
    [updateSetting],
  )

  const handleNotificationsToggle = useCallback(
    (value: boolean) => updateSetting('notificationsEnabled', value),
    [updateSetting],
  )

  const handleRateApp = useCallback(() => {
    // TODO: replace with actual App Store / Play Store URL
    Linking.openURL('https://apps.apple.com')
  }, [])

  const handlePrivacyPolicy = useCallback(() => {
    // TODO: replace with actual privacy policy URL
    Linking.openURL('https://untilla.app/privacy')
  }, [])

  const handleDeleteAll = useCallback(() => {
    Alert.alert(
      t('settings.deleteConfirmTitle'),
      t('settings.deleteConfirmMessage'),
      [
        { text: t('settings.cancel'), style: 'cancel' },
        {
          text: t('settings.deleteConfirmButton'),
          style: 'destructive',
          onPress: () => {
            const countdowns = useCountdownStore.getState().countdowns
            const deleteCountdown = useCountdownStore.getState().deleteCountdown
            countdowns.forEach(countdown => deleteCountdown(countdown.id))
          },
        },
      ],
    )
  }, [t])

  // WHY useMemo: chevron and switches don't depend on form state,
  // memoize to avoid recreating on every render.
  const chevronIcon = useMemo(
    () => <ChevronRightIcon color={colors.textTertiary} />,
    [colors.textTertiary],
  )

  const hapticSwitch = useMemo(
    () => (
      <Switch
        value={settings.hapticsEnabled}
        onValueChange={handleHapticsToggle}
        trackColor={{ true: colors.primary, false: colors.surfaceSecondary }}
        thumbColor="#FFFFFF"
      />
    ),
    [settings.hapticsEnabled, handleHapticsToggle, colors],
  )

  const notificationsSwitch = useMemo(
    () => (
      <Switch
        value={settings.notificationsEnabled}
        onValueChange={handleNotificationsToggle}
        trackColor={{ true: colors.primary, false: colors.surfaceSecondary }}
        thumbColor="#FFFFFF"
      />
    ),
    [settings.notificationsEnabled, handleNotificationsToggle, colors],
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings.title')}</Text>
        </View>

        {/* DISPLAY */}
        <SettingsSection label={t('settings.displaySection')}>
          <SettingsRow
            label={t('settings.theme')}
            value={themeDisplayValue}
            onPress={handleThemePress}
            showDivider
          />
          <SettingsRow
            label={t('settings.language')}
            value={languageDisplayValue}
            onPress={handleLanguagePress}
          />
        </SettingsSection>

        {/* PREFERENCES */}
        <SettingsSection label={t('settings.preferencesSection')}>
          <SettingsRow
            label={t('settings.hapticFeedback')}
            rightElement={hapticSwitch}
            showDivider
          />
          <SettingsRow
            label={t('settings.notifications')}
            rightElement={notificationsSwitch}
          />
        </SettingsSection>

        {/* ABOUT */}
        <SettingsSection label={t('settings.aboutSection')}>
          <SettingsRow
            label={t('settings.version')}
            value="1.0.0"
            showDivider
          />
          <SettingsRow
            label={t('settings.rateApp')}
            rightElement={chevronIcon}
            onPress={handleRateApp}
            showDivider
          />
          <SettingsRow
            label={t('settings.privacyPolicy')}
            rightElement={chevronIcon}
            onPress={handlePrivacyPolicy}
          />
        </SettingsSection>

        {/* DANGER ZONE */}
        <SettingsSection label={t('settings.dangerSection')}>
          <SettingsRow
            label={t('settings.deleteAll')}
            isDestructive
            onPress={handleDeleteAll}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  )
}
