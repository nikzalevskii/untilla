import { loadCountdowns, saveCountdowns } from '@/services/countdownStorage'
import { Countdown, CreateCountdownInput, UpdateCountdownInput } from '@/types'
import { useMemo } from 'react'
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
  deleteAllCountdowns: () => void
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
      (max, countdown) => Math.max(max, countdown.sortOrder),
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

    const updated = countdowns.map(countdown =>
      countdown.id === id
        ? { ...countdown, ...updates, updatedAt: new Date().toISOString() }
        : countdown,
    )

    saveCountdowns(updated)
    set({ countdowns: updated })
  },

  deleteCountdown: id => {
    const { countdowns } = get()
    const updated = countdowns.filter(countdown => countdown.id !== id)
    saveCountdowns(updated)
    set({ countdowns: updated })
  },

  deleteAllCountdowns: () => {
    saveCountdowns([])
    set({ countdowns: [] })
  },

  toggleArchive: id => {
    const { countdowns } = get()
    const updated = countdowns.map(countdown =>
      countdown.id === id
        ? {
            ...countdown,
            isArchived: !countdown.isArchived,
            updatedAt: new Date().toISOString(),
          }
        : countdown,
    )
    saveCountdowns(updated)
    set({ countdowns: updated })
  },

  reorderCountdowns: orderedIds => {
    const { countdowns } = get()

    const lookup = new Map(
      countdowns.map(countdown => [countdown.id, countdown]),
    )

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

export const useCountdowns = () => useCountdownStore(state => state.countdowns)

export const useIsCountdownsLoading = () =>
  useCountdownStore(state => state.isLoading)

export const useCountdownById = (id: string) =>
  useCountdownStore(state =>
    state.countdowns.find(countdown => countdown.id === id),
  )

export const useActiveCountdowns = () => {
  const countdowns = useCountdowns()
  return useMemo(
    () =>
      countdowns
        .filter(countdown => !countdown.isArchived)
        .sort(
          (a, b) =>
            new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime(),
        ),
    [countdowns],
  )
}

export const useArchivedCountdowns = () => {
  const countdowns = useCountdowns()
  return useMemo(
    () =>
      countdowns
        .filter(countdown => countdown.isArchived)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        ),
    [countdowns],
  )
}
