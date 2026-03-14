import { memo, useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useFormattedCountdown, useTheme } from '@/hooks'
import { getCardColors } from '@/theme/cardThemes'
import { useStyles } from './styles'
import type { CountdownCardProps } from './types'

function CountdownCardComponent({ countdown, onPress }: CountdownCardProps) {
  const styles = useStyles()
  const { isDark } = useTheme()

  const formatted = useFormattedCountdown(
    countdown.targetDate,
    countdown.mode,
    'minute',
  )

  const cardColors = useMemo(
    () => getCardColors(countdown.theme, isDark),
    [countdown.theme, isDark],
  )

  const handlePress = useCallback(() => {
    onPress(countdown.id)
  }, [onPress, countdown.id])

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
              <Text style={styles.title} numberOfLines={2}>
                {countdown.title}
              </Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.daysNumber}>{formatted.primary}</Text>
              <Text style={styles.daysLabel}>{formatted.primaryLabel}</Text>
              {formatted.secondary && (
                <Text style={styles.secondaryText}>{formatted.secondary}</Text>
              )}
            </View>
          </View>
        </LinearGradient>
      )}
    </Pressable>
  )
}

export const CountdownCard = memo(CountdownCardComponent)
