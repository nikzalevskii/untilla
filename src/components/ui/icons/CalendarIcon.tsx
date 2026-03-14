import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import type { IconProps } from './types'

export function CalendarIcon({ color = '#78716C', size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={4}
        width={18}
        height={18}
        rx={2}
        stroke={color}
        strokeWidth={2}
      />
      <Path d="M16 2V6" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M8 2V6" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M3 10H21" stroke={color} strokeWidth={2} />
    </Svg>
  )
}
