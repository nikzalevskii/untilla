import { useMemo } from 'react'
import { Alert, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Svg, { Circle } from 'react-native-svg'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { useFormattedCountdown, useTheme, useTimeRemaining } from '@/hooks'
import { useCountdownById, useCountdownStore } from '@/store'
import { getCardColors } from '@/theme/cardThemes'
import { formatDate } from '@/utils'
import { CATEGORIES } from '@/constants/categories'
import { ArrowLeftIcon } from '@/components/ui/icons/ArrowLeftIcon'
import { ShareIcon } from '@/components/ui/icons/ShareIcon'
import { PencilIcon } from '@/components/ui/icons/PencilIcon'
import { CalendarIcon } from '@/components/ui/icons/CalendarIcon'
import type { HomeStackParamList } from '@/navigation/types'
import { useStyles } from './styles'

type Props = NativeStackScreenProps<HomeStackParamList, 'CountdownDetail'>

const RING_SIZE = 168
const RING_STROKE = 10 // innerRadius 0.88 → stroke = size * (1 - 0.88) / 2 ≈ 10
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export const CountdownDetailScreen = ({ route }: Props) => {
  const { t } = useTranslation()
  const styles = useStyles()
  const { id } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('countdownDetail.title')}</Text>
      <Text style={styles.subtitle}>ID: {id}</Text>
    </View>
  )
}
