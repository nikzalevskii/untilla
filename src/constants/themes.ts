import { countdownThemes } from '@/types/countdown'

// Order = display order in ThemePicker
export const CARD_THEMES = countdownThemes

export const DEFAULT_THEME = 'violet' as const satisfies (typeof countdownThemes)[number]
