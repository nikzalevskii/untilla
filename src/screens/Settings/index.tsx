import { Alert, Linking, ScrollView, Switch, Text, View } from 'react-native'
import { SafeTopView } from '@/components/ui/SafeTopView'
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

const THEME_LABELS: Record<string, string> = {
  system: 'settings.themeSystem',
  light: 'settings.themeLight',
  dark: 'settings.themeDark',
}

const LANGUAGE_LABELS: Record<string, string> = {
  system: 'settings.languageSystem',
  en: 'settings.languageEnglish',
  ru: 'settings.languageRussian',
}

export function SettingsScreen() {
  const styles = useStyles()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const settings = useSettingsStore(state => state.settings)
  const updateSetting = useSettingsStore(state => state.updateSetting)

  const handleThemePress = () => {
    const currentIndex = THEME_CYCLE.indexOf(settings.themePreference)
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length
    updateSetting('themePreference', THEME_CYCLE[nextIndex])
  }

  const handleLanguagePress = () => {
    const currentIndex = LANGUAGE_CYCLE.indexOf(settings.language)
    const nextIndex = (currentIndex + 1) % LANGUAGE_CYCLE.length
    updateSetting('language', LANGUAGE_CYCLE[nextIndex])
  }

  const handleHapticsToggle = (value: boolean) =>
    updateSetting('hapticsEnabled', value)

  const handleNotificationsToggle = (value: boolean) =>
    updateSetting('notificationsEnabled', value)

  const handleRateApp = () => {
    // TODO: replace with actual App Store / Play Store URL
    Linking.openURL('https://apps.apple.com')
  }

  const handlePrivacyPolicy = () => {
    // TODO: replace with actual privacy policy URL
    Linking.openURL('https://untilla.app/privacy')
  }

  const handleDeleteAll = () => {
    Alert.alert(
      t('settings.deleteConfirmTitle'),
      t('settings.deleteConfirmMessage'),
      [
        { text: t('settings.cancel'), style: 'cancel' },
        {
          text: t('settings.deleteConfirmButton'),
          style: 'destructive',
          onPress: () => useCountdownStore.getState().deleteAllCountdowns(),
        },
      ],
    )
  }

  return (
    <SafeTopView style={styles.container}>
      {/* <View style={styles.container}> */}
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
            value={t(THEME_LABELS[settings.themePreference])}
            onPress={handleThemePress}
            showDivider
          />
          <SettingsRow
            label={t('settings.language')}
            value={t(LANGUAGE_LABELS[settings.language])}
            onPress={handleLanguagePress}
          />
        </SettingsSection>

        {/* PREFERENCES */}
        <SettingsSection label={t('settings.preferencesSection')}>
          <SettingsRow
            label={t('settings.hapticFeedback')}
            rightElement={
              <Switch
                value={settings.hapticsEnabled}
                onValueChange={handleHapticsToggle}
                trackColor={{
                  true: colors.primary,
                  false: colors.surfaceSecondary,
                }}
                thumbColor="#FFFFFF"
              />
            }
            showDivider
          />
          <SettingsRow
            label={t('settings.notifications')}
            rightElement={
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={handleNotificationsToggle}
                trackColor={{
                  true: colors.primary,
                  false: colors.surfaceSecondary,
                }}
                thumbColor="#FFFFFF"
              />
            }
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
            rightElement={<ChevronRightIcon color={colors.textTertiary} />}
            onPress={handleRateApp}
            showDivider
          />
          <SettingsRow
            label={t('settings.privacyPolicy')}
            rightElement={<ChevronRightIcon color={colors.textTertiary} />}
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
      {/* </View> */}
    </SafeTopView>
  )
}
