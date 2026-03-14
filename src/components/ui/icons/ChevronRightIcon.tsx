import React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from './types'

export function ChevronRightIcon({ color = '#A8A29E', size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
