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
import { formatDate, splitDaysToMonths } from '@/utils'
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

export const CountdownDetailScreen = ({ route, navigation }: Props) => {
  const styles = useStyles()
  const { isDark, colors } = useTheme()
  const { t, i18n } = useTranslation()
  const { id } = route.params

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
    return CATEGORIES.find(category => category.key === countdown.category) ?? null
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

  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progressPercent)

  const heroTimeString = useMemo(() => {
    const h = timeRemaining.hours
    const m = timeRemaining.minutes
    const s = timeRemaining.seconds
    return `${h}h ${m}m ${s}s`
  }, [timeRemaining.hours, timeRemaining.minutes, timeRemaining.seconds])

const handleBack = () => navigation.goBack()

  const handleShare = () => {
    // TODO: Share functionality — post-MVP
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
            useCountdownStore.getState().deleteCountdown(id)
            navigation.goBack()
          },
        },
      ],
    )
  }

  if (!countdown) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Pressable onPress={handleBack} style={styles.fallbackBackButton}>
          <ArrowLeftIcon size={24} color={colors.text} />
        </Pressable>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {t('countdownDetail.notFound')}
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── Gradient Hero ──────────────────────────────────── */}
        <LinearGradient
          colors={heroGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.hero}
        >
          {/* Status bar spacer */}
          <SafeAreaView edges={['top']} style={styles.statusBarSpacer} />

          {/* Nav bar */}
          <View style={styles.navBar}>
            <Pressable
              onPress={handleBack}
              accessibilityLabel={t('countdownDetail.back')}
              accessibilityRole="button"
            >
              <ArrowLeftIcon size={24} color="#FFFFFFE6" />
            </Pressable>
            <Pressable
              onPress={handleShare}
              accessibilityLabel={t('countdownDetail.share')}
              accessibilityRole="button"
            >
              <ShareIcon size={22} color="#FFFFFFE6" />
            </Pressable>
          </View>

          {/* Progress Ring + Number */}
          <View style={styles.ringContainer}>
            {/* SVG rings */}
            <Svg width={RING_SIZE} height={RING_SIZE} style={styles.ringSvg}>
              {/* Track (background ring) */}
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth={RING_STROKE}
                fill="none"
              />
              {/* Progress arc */}
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth={RING_STROKE}
                fill="none"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation={-90}
                origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
              />
            </Svg>

            {/* Number overlay (centered on ring) */}
            <View style={styles.ringNumberContainer}>
              <Text style={styles.heroNumber}>{formatted.primary}</Text>
              <Text style={styles.heroLabel}>{formatted.primaryLabel}</Text>
              <Text style={styles.heroTime}>{heroTimeString}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ─── Content Area ──────────────────────────────────── */}
        <View style={styles.contentArea}>
          {/* Event Title */}
          <Text style={styles.eventTitle}>{countdown.title}</Text>

          {/* Date Row */}
          <View style={styles.dateRow}>
            <CalendarIcon
              size={16}
              color={isDark ? '#A8A29E' : '#78716C'}
            />
            <Text style={styles.dateText}>
              {formatDate(countdown.targetDate, i18n.language)}
            </Text>
          </View>

          {/* Category Chip */}
          {categoryInfo && (
            <View style={styles.categoryChip}>
              <View
                style={[
                  styles.categoryDot,
                  { backgroundColor: categoryInfo.color },
                ]}
              />
              <Text style={styles.categoryText}>
                {t(categoryInfo.labelKey)}
              </Text>
            </View>
          )}

          {/* Time Breakdown */}
          <View style={styles.breakdownContainer}>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownCard}>
                <Text style={styles.breakdownNumber}>{months}</Text>
                <Text style={styles.breakdownLabel}>
                  {t('countdownDetail.months')}
                </Text>
              </View>
              <View style={styles.breakdownCard}>
                <Text style={styles.breakdownNumber}>{remainingDays}</Text>
                <Text style={styles.breakdownLabel}>
                  {t('countdownDetail.days')}
                </Text>
              </View>
              <View style={styles.breakdownCard}>
                <Text style={styles.breakdownNumber}>
                  {timeRemaining.hours}
                </Text>
                <Text style={styles.breakdownLabel}>
                  {t('countdownDetail.hours')}
                </Text>
              </View>
              <View style={styles.breakdownCard}>
                <Text style={styles.breakdownNumber}>
                  {timeRemaining.minutes}
                </Text>
                <Text style={styles.breakdownLabel}>
                  {t('countdownDetail.minutes')}
                </Text>
              </View>
            </View>
          </View>

          {/* Note Card */}
          {countdown.note && (
            <View style={styles.noteCard}>
              <Text style={styles.noteLabel}>
                {t('countdownDetail.note')}
              </Text>
              <Text style={styles.noteText}>{countdown.note}</Text>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionsSection}>
            <Pressable
              onPress={handleEdit}
              style={styles.editButton}
              accessibilityLabel={t('countdownDetail.editCountdown')}
              accessibilityRole="button"
            >
              {!isDark && (
                <PencilIcon size={16} color={colors.text} />
              )}
              <Text style={styles.editButtonText}>
                {t('countdownDetail.editCountdown')}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleDelete}
              accessibilityRole="button"
            >
              <Text style={styles.deleteText}>
                {t('countdownDetail.delete')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
