import { memo, useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks'
import { useTimeRemaining } from '@/hooks/useTimeRemaining'
import { getCardColors } from '@/theme/cardThemes'
import { useStyles } from './styles'
import type { CountdownCardProps } from './types'

function CountdownCardComponent({ countdown, onPress }: CountdownCardProps) {
  const styles = useStyles()
  const { isDark } = useTheme()
  const { t } = useTranslation()

  const timeRemaining = useTimeRemaining(countdown.targetDate, 'minute')

  const cardColors = useMemo(
    () => getCardColors(countdown.theme, isDark),
    [countdown.theme, isDark],
  )

  const handlePress = useCallback(() => {
    onPress(countdown.id)
  }, [onPress, countdown.id])

  const isCountUp = countdown.mode === 'countup'

  const primaryNumber = timeRemaining.totalDays.toString()

  const primaryLabel = useMemo(() => {
    if (timeRemaining.isToday && !isCountUp) {
      return t('home.today')
    }
    if (isCountUp) {
      return t('home.daysSince', { count: timeRemaining.totalDays })
    }
    if (timeRemaining.isPast) {
      return t('home.daysPast', { count: timeRemaining.totalDays })
    }
    return t('home.daysLeft', { count: timeRemaining.totalDays })
  }, [timeRemaining, isCountUp, t])

  const secondaryText = useMemo(() => {
    if (timeRemaining.isToday) return '🎉'
    return `${timeRemaining.hours}h ${timeRemaining.minutes}m`
  }, [timeRemaining])

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <LinearGradient
          colors={[cardColors.gradientStart, cardColors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.content}>
            <View style={styles.left}>
              {countdown.emoji && (
                <Text style={styles.emoji}>{countdown.emoji}</Text>
              )}
              <Text style={styles.title} numberOfLines={2}>
                {countdown.title}
              </Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.daysNumber}>
                {timeRemaining.isToday ? '🎉' : primaryNumber}
              </Text>
              <Text style={styles.daysLabel}>{primaryLabel}</Text>
              {!timeRemaining.isToday && (
                <Text style={styles.secondaryText}>{secondaryText}</Text>
              )}
            </View>
          </View>
        </LinearGradient>
      )}
    </Pressable>
  )
}

export const CountdownCard = memo(CountdownCardComponent)
