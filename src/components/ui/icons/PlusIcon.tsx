import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './types'

export function PlusIcon({ color = '#FFFFFF', size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}
