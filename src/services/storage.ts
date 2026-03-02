import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV({ id: 'untilla-storage' })

export const STORAGE_KEYS = {
  COUNTDOWNS: 'countdowns',
  SETTINGS: 'settings',
  ONBOARDING_COMPLETE: 'onboarding_complete',
} as const

export function storageGet<T>(key: string): T | null {
  const raw = storage.getString(key)
  if (raw === undefined) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function storageSet<T>(key: string, value: T | null): void {
  if (value === null) {
    storage.remove(key)
    return
  }
  storage.set(key, JSON.stringify(value))
}

export function isOnboardingComplete(): boolean {
  return storage.getBoolean(STORAGE_KEYS.ONBOARDING_COMPLETE) ?? false
}

export function markOnboardingComplete(): void {
  storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true)
}
