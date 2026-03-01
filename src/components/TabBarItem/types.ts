import type { ComponentType } from 'react'
import type { IconProps } from '@/components/ui/icons/types'

export type TabBarItemProps = {
  Icon: ComponentType<IconProps>
  label: string
  isActive: boolean
  iconColor: string
  onPress: () => void
}
