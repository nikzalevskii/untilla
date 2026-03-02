// "How many days left?" vs "How many days since?"
export type CountdownMode = 'countdown' | 'countup'

// Optional tag for grouping/filtering. Stored as a string key, not a number,
// so storage remains human-readable ("birthday" instead of 2).
export type CountdownCategory =
  | 'birthday'
  | 'holiday'
  | 'travel'
  | 'anniversary'
  | 'work'
  | 'health'
  | 'personal'
  | 'other'

// Card colour theme. Stored as a string key rather than a hex value so that
// the same key ('violet') can resolve to different gradients in light vs dark mode.
export type CountdownTheme =
  | 'violet' // brand accent, default
  | 'rose' // warm pink — birthdays, anniversaries
  | 'amber' // orange — travel, adventures
  | 'emerald' // green — health, nature
  | 'sky' // blue — calm, neutral
  | 'slate' // dark grey — work events

// How far in advance to send a reminder notification.
// 'day_of' is a special case: fires at 9:00 AM on the day of the event.
export type NotificationOffset = '1h' | '1d' | '3d' | '1w' | '1m' | 'day_of'

export type Countdown = {
  // --- Identity ---
  id: string // UUID v4, generated on creation
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601

  // --- Content ---
  title: string // e.g. "Barcelona trip", "Mom's birthday"
  targetDate: string // ISO 8601. Future date for countdown, past date for countup
  mode: CountdownMode

  // --- Appearance ---
  theme: CountdownTheme
  emoji?: string // e.g. "✈️", "🎂" — shown on the card

  // --- Organisation ---
  category?: CountdownCategory
  note?: string // user note, up to 500 chars
  sortOrder: number // used for drag-to-reorder; fractional values allowed
  isArchived: boolean // archived items are hidden from the main list

  // --- Notifications ---
  notificationsEnabled: boolean
  notificationOffsets: NotificationOffset[]
}

// Fields submitted when creating a new countdown.
// Auto-generated fields (id, createdAt, updatedAt, sortOrder, isArchived)
// are intentionally excluded — the store sets them automatically.
// Using a dedicated type instead of Partial<Countdown> keeps title/targetDate/mode required.
export type CreateCountdownInput = {
  title: string
  targetDate: string
  mode: CountdownMode
  theme: CountdownTheme
  emoji?: string
  category?: CountdownCategory
  note?: string
  notificationsEnabled: boolean
  notificationOffsets: NotificationOffset[]
}

// Fields that can be changed when editing an existing countdown.
// All fields are optional — pass only what changed.
// 'mode' is excluded intentionally: switching countdown ↔ countup changes the
// meaning of targetDate (future vs past). Handle that with a dedicated action if needed.
export type UpdateCountdownInput = Partial<Omit<CreateCountdownInput, 'mode'>>

// Computed time breakdown derived from targetDate. Never stored — recalculated live.
export type CountdownValue = {
  totalDays: number // full days until / since the event
  hours: number // remaining hours after full days
  minutes: number // remaining minutes after full hours
  seconds: number // remaining seconds after full minutes
  isPast: boolean // true when the event date has passed
  isToday: boolean // true on the day of the event (triggers celebration UI)
}
