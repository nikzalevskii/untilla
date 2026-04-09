type DateInput = string | Date

function toDate(date: DateInput): Date {
  return typeof date === 'string' ? new Date(date) : date
}

// Compares calendar day, not timestamp diff (23:59 yesterday !== today)
export function isToday(date: DateInput): boolean {
  const d = toDate(date)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export function isPast(date: DateInput): boolean {
  return toDate(date).getTime() < Date.now()
}

// Locale-aware date formatting via Intl.DateTimeFormat (supported in Hermes)
// Approximate months + remaining days (30 days = 1 month)
export function splitDaysToMonths(totalDays: number): { months: number; days: number } {
  const months = Math.floor(totalDays / 30)
  const days = totalDays % 30
  return { months, days }
}

export function formatDate(
  date: DateInput,
  locale: string = 'en',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string {
  return new Intl.DateTimeFormat(locale, options).format(toDate(date))
}

/**
 * Parses "YYYY-MM-DD" string as local midnight.
 *
 * Why: new Date("2026-12-25") → UTC midnight (ECMAScript spec).
 * In UTC-5 (New York) that's Dec 24 19:00 local — wrong day.
 * This function constructs a local Date, avoiding the timezone trap.
 *
 * month - 1: JS Date constructor uses zero-based months (Jan=0, Dec=11),
 * but ISO dates are 1-based (Jan=1, Dec=12).
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}
