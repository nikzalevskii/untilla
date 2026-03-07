import { STORAGE_KEYS, storageGet, storageSet } from "@/services/storage"
import { create } from "zustand"

type ThemePreference = 'system' | 'light' | 'dark'

type AppSettings = {
  themePreference: ThemePreference
  language: 'en' | 'ru' | 'system'
  hapticsEnabled: boolean
  notificationsEnabled: boolean
}

const DEFAULT_SETTINGS: AppSettings = {
  themePreference: 'system',
  language: 'system',
  hapticsEnabled: true,
  notificationsEnabled: true,
}

type SettingsStore = {
  settings: AppSettings
  initialize: () => void
  updateSetting: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K],
  ) => void
}

export const useSettingsStore = create<SettingsStore>()((set, get) => ({
  settings: DEFAULT_SETTINGS,

  initialize: () => {
    const stored = storageGet<AppSettings>(STORAGE_KEYS.SETTINGS)
    set({ settings: { ...DEFAULT_SETTINGS, ...(stored ?? {}) } })
  },

  updateSetting: (key, value) => {
    const { settings } = get()
    const updated = { ...settings, [key]: value }
    storageSet(STORAGE_KEYS.SETTINGS, updated)
    set({ settings: updated })
  },
}))
