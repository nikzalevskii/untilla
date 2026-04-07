import { useMemo } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useFormattedCountdown, useTheme, useTimeRemaining } from '@/hooks'
import { useCountdownById, useCountdownStore } from '@/store'
import { getCardColors } from '@/theme/cardThemes'
import { formatDate, splitDaysToMonths } from '@/utils'
import { CATEGORIES } from '@/constants/categories'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList } from '@/navigation/types'

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'CountdownDetail'>

type Props = {
  navigation: Navigation
  id: string
}

export function useCountdownDetail({ navigation, id }: Props) {
  const { isDark, colors } = useTheme()
  const { t, i18n } = useTranslation()
  const countdown = useCountdownById(id)

  const timeRemaining = useTimeRemaining(
    countdown?.targetDate ?? new Date().toISOString(),
    'second',
  )

  const formatted = useFormattedCountdown(
    countdown?.targetDate ?? new Date().toISOString(),
    countdown?.mode ?? 'countdown',
    'second',
  )

  const cardColors = useMemo(
    () => getCardColors(countdown?.theme ?? 'violet', isDark),
    [countdown?.theme, isDark],
  )

  const heroGradient = useMemo(
    () => [cardColors.gradientStart, cardColors.gradientEnd],
    [cardColors.gradientStart, cardColors.gradientEnd],
  )

  const categoryInfo = useMemo(() => {
    if (!countdown?.category) return null
    return CATEGORIES.find(c => c.key === countdown.category) ?? null
  }, [countdown?.category])

  const { months, days: remainingDays } = useMemo(
    () => splitDaysToMonths(timeRemaining.totalDays),
    [timeRemaining.totalDays],
  )

  const progressPercent = useMemo(() => {
    if (!countdown) return 0
    const now = Date.now()
    const created = new Date(countdown.createdAt).getTime()
    const target = new Date(countdown.targetDate).getTime()
    const totalSpan = target - created
    if (totalSpan <= 0) return 1
    const elapsed = now - created
    return Math.min(Math.max(elapsed / totalSpan, 0), 1)
  }, [countdown?.createdAt, countdown?.targetDate])

  const heroTimeString = useMemo(() => {
    const h = timeRemaining.hours
    const m = timeRemaining.minutes
    const s = timeRemaining.seconds
    return `${h}h ${m}m ${s}s`
  }, [timeRemaining.hours, timeRemaining.minutes, timeRemaining.seconds])

  const eventDate = countdown
    ? formatDate(countdown.targetDate, i18n.language)
    : ''

  const handleBack = () => navigation.goBack()

  const handleShare = () => {
    Alert.alert('Share', 'Coming soon!')
  }

  const handleEdit = () => {
    navigation.getParent()?.navigate('AddEditTab', {
      screen: 'AddEdit',
      params: { id },
    })
  }

  const handleDelete = () => {
    Alert.alert(
      t('countdownDetail.deleteConfirmTitle'),
      t('countdownDetail.deleteConfirmMessage'),
      [
        { text: t('countdownDetail.cancel'), style: 'cancel' },
        {
          text: t('countdownDetail.deleteConfirmButton'),
          style: 'destructive',
          onPress: () => {
            // getState() — вызов store action вне React tree.
            // Безопасно в callback (не в рендере).
            useCountdownStore.getState().deleteCountdown(id)
            navigation.goBack()
          },
        },
      ],
    )
  }


  return {
    countdown,
    formatted,
    timeRemaining,
    heroGradient,
    categoryInfo,
    months,
    remainingDays,
    progressPercent,
    heroTimeString,
    eventDate,
    isDark,
    colors,
    t,
    handleBack,
    handleShare,
    handleEdit,
    handleDelete,
  }
}