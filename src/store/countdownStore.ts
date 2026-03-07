import { loadCountdowns, saveCountdowns } from '@/services/countdownStorage'
import { Countdown, CreateCountdownInput, UpdateCountdownInput } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'

function generateId(): string {
  return uuidv4()
}

type CountdownStore = {
  countdowns: Countdown[]
  isLoading: boolean
  initialize: () => void
  createCountdown: (input: CreateCountdownInput) => Countdown
  updateCountdown: (id: string, updates: UpdateCountdownInput) => void
  deleteCountdown: (id: string) => void
  toggleArchive: (id: string) => void
  reorderCountdowns: (orderedIds: string[]) => void
}

export const useCountdownStore = create<CountdownStore>()((set, get) => ({
  countdowns: [],
  isLoading: true,
  initialize: () => {
    const stored = loadCountdowns()
    set({ countdowns: stored, isLoading: false })
  },
  createCountdown: input => {
    const now = new Date().toISOString()
    const { countdowns } = get()

    const maxSortOrder = countdowns.reduce(
      (max, c) => Math.max(max, c.sortOrder),
      -1,
    )

    const newCountdown: Countdown = {
      ...input,
      id: generateId(),
      sortOrder: maxSortOrder + 1,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    }

    const updated = [...countdowns, newCountdown]
    saveCountdowns(updated)
    set({ countdowns: updated })

    return newCountdown
  },
  updateCountdown: (id, updates) => {
    const { countdowns } = get()

    const updated = countdowns.map(c =>
      c.id === id
        ? { ...c, ...updates, updatedAt: new Date().toISOString() }
        : c,
    )

    saveCountdowns(updated)
    set({ countdowns: updated })
  },

  deleteCountdown: id => {
    const { countdowns } = get()
    const updated = countdowns.filter(c => c.id !== id)
    saveCountdowns(updated)
    set({ countdowns: updated })
  },

  toggleArchive: id => {
    const { countdowns } = get()
    const updated = countdowns.map(c =>
      c.id === id
        ? {
            ...c,
            isArchived: !c.isArchived,
            updatedAt: new Date().toISOString(),
          }
        : c,
    )
    saveCountdowns(updated)
    set({ countdowns: updated })
  },

  reorderCountdowns: orderedIds => {
    const { countdowns } = get()

    const lookup = new Map(countdowns.map(c => [c.id, c]))

    const updated = orderedIds.map((id, index) => {
      const countdown = lookup.get(id)
      if (!countdown) {
        throw new Error(`reorderCountdowns: unknown id "${id}"`)
      }
      return {
        ...countdown,
        sortOrder: index,
        updatedAt: new Date().toISOString(),
      }
    })

    saveCountdowns(updated)
    set({ countdowns: updated })
  },
}))

export const selectActiveCountdowns = (state: CountdownStore): Countdown[] =>
  state.countdowns
    .filter(c => !c.isArchived)
    .sort((a, b) => a.sortOrder - b.sortOrder)

export const selectArchivedCountdowns = (state: CountdownStore): Countdown[] =>
  state.countdowns
    .filter(c => c.isArchived)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )

export const selectCountdownById =
  (id: string) =>
  (state: CountdownStore): Countdown | undefined =>
    state.countdowns.find(c => c.id === id)
