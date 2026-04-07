import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCountdownDetail } from '@/hooks'
import { ProgressRing } from '@/components'
import { overlay } from '@/theme/colors'
import { ArrowLeftIcon } from '@/components/ui/icons/ArrowLeftIcon'
import { ShareIcon } from '@/components/ui/icons/ShareIcon'
import { PencilIcon } from '@/components/ui/icons/PencilIcon'
import { CalendarIcon } from '@/components/ui/icons/CalendarIcon'
import type { HomeStackParamList } from '@/navigation/types'
import { useStyles } from './styles'

const RING_SIZE = 168
const RING_STROKE = 10

type Props = NativeStackScreenProps<HomeStackParamList, 'CountdownDetail'>

export const CountdownDetailScreen = ({ route, navigation }: Props) => {
  const styles = useStyles()
  const { id } = route.params

  const {
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
  } = useCountdownDetail(id, navigation)

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
        {/* Hero */}
        <LinearGradient
          colors={heroGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.hero}
        >
          <SafeAreaView edges={['top']} style={styles.statusBarSpacer}>
            <View style={styles.navBar}>
            <Pressable
              onPress={handleBack}
              accessibilityLabel={t('countdownDetail.back')}
              accessibilityRole="button"
            >
              <ArrowLeftIcon size={24} color={overlay.icon} />
            </Pressable>
            <Pressable
              onPress={handleShare}
              accessibilityLabel={t('countdownDetail.share')}
              accessibilityRole="button"
            >
              <ShareIcon size={22} color={overlay.icon} />
            </Pressable>
          </View>

          <View style={styles.ringContainer}>
            <View style={styles.ringSvg}>
              <ProgressRing
                progress={progressPercent}
                size={RING_SIZE}
                strokeWidth={RING_STROKE}
              />
            </View>
            <View style={styles.ringNumberContainer}>
              <Text style={styles.heroNumber}>{formatted.primary}</Text>
              <Text style={styles.heroLabel}>{formatted.primaryLabel}</Text>
              <Text style={styles.heroTime}>{heroTimeString}</Text>
            </View>
          </View>
          </SafeAreaView>
        </LinearGradient>
        

        {/* Content */}
        <View style={styles.contentArea}>
          <Text style={styles.eventTitle}>{countdown.title}</Text>

          <View style={styles.dateRow}>
            <CalendarIcon size={16} color={colors.textTertiary} />
            <Text style={styles.dateText}>{eventDate}</Text>
          </View>

          {categoryInfo && (
            <View style={styles.categoryChip}>
              <View
                style={[styles.categoryDot, { backgroundColor: categoryInfo.color }]}
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

          {countdown.note && (
            <View style={styles.noteCard}>
              <Text style={styles.noteLabel}>
                {t('countdownDetail.note')}
              </Text>
              <Text style={styles.noteText}>{countdown.note}</Text>
            </View>
          )}

          <View style={styles.actionsSection}>
            <Pressable
              onPress={handleEdit}
              style={styles.editButton}
              accessibilityLabel={t('countdownDetail.editCountdown')}
              accessibilityRole="button"
            >
              {!isDark && <PencilIcon size={16} color={colors.text} />}
              <Text style={styles.editButtonText}>
                {t('countdownDetail.editCountdown')}
              </Text>
            </Pressable>

            <Pressable onPress={handleDelete} accessibilityRole="button">
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
