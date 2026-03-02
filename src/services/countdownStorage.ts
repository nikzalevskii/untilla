import type { Countdown } from '@/types'
import { storageGet, storageSet, STORAGE_KEYS } from './storage'

export function loadCountdowns(): Countdown[] {
  return storageGet<Countdown[]>(STORAGE_KEYS.COUNTDOWNS) ?? []
}

export function saveCountdowns(countdowns: Countdown[]): void {
  storageSet(STORAGE_KEYS.COUNTDOWNS, countdowns)
}

export function clearCountdowns(): void {
  storageSet(STORAGE_KEYS.COUNTDOWNS, null)
}
