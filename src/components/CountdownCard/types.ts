import type { Countdown } from '@/types'

export type CountdownCardProps = {
  countdown: Countdown
  onPress: (id: string) => void
}
