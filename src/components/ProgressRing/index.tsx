import { memo } from 'react'
import Svg, { Circle } from 'react-native-svg'
import { overlay } from '@/theme/colors'

type Props = {
  progress: number
  size: number
  strokeWidth: number
  trackColor?: string
  progressColor?: string
}

function ProgressRingComponent({
  progress,
  size,
  strokeWidth,
  trackColor = overlay.ringTrack,
  progressColor = overlay.ringProgress,
}: Props) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  // strokeDashoffset: полная окружность = пустое кольцо, 0 = полное кольцо
  // (1 - progress) инвертирует: progress 0 → пустое, progress 1 → полное
  const dashoffset = circumference * (1 - progress)

  return (
    <Svg width={size} height={size}>
      {/* Track — фоновое кольцо, всегда видно */}
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        strokeLinecap="round"
        rotation={-90}
        origin={`${center}, ${center}`}
      />
    </Svg>
  )
}

export const ProgressRing = memo(ProgressRingComponent)