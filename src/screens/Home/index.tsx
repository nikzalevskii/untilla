import { useStyles } from './styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '@/navigation'
import { useActiveCountdowns, useIsCountdownsLoading } from '@/store'
import { useCallback } from 'react'
import { Countdown } from '@/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { CountdownCard, EmptyState, HomeHeader } from '@/components'

// TODO: REMOVE — temporary mock data for visual testing
const mockData: Countdown[] = [
  {
    id: '1',
    title: 'Barcelona trip',
    targetDate: '2026-06-15T00:00:00.000Z',
    mode: 'countdown',
    theme: 'violet',
    emoji: '✈️',
    sortOrder: 0,
    isArchived: false,
    notificationsEnabled: false,
    notificationOffsets: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: "Mom's birthday",
    targetDate: '2026-04-20T00:00:00.000Z',
    mode: 'countdown',
    theme: 'rose',
    emoji: '🎂',
    sortOrder: 1,
    isArchived: false,
    notificationsEnabled: false,
    notificationOffsets: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    title: '90 days sober',
    targetDate: '2025-12-10T00:00:00.000Z',
    mode: 'countup',
    theme: 'emerald',
    emoji: '💪',
    sortOrder: 2,
    isArchived: false,
    notificationsEnabled: false,
    notificationOffsets: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '4',
    title: 'New Year 2027',
    targetDate: '2027-01-01T00:00:00.000Z',
    mode: 'countdown',
    theme: 'amber',
    emoji: '🎆',
    sortOrder: 3,
    isArchived: false,
    notificationsEnabled: false,
    notificationOffsets: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '5',
    title: 'Project deadline',
    targetDate: '2026-03-25T00:00:00.000Z',
    mode: 'countdown',
    theme: 'slate',
    emoji: '💼',
    sortOrder: 4,
    isArchived: false,
    notificationsEnabled: false,
    notificationOffsets: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '6',
    title: 'Summer vacation',
    targetDate: '2026-07-01T00:00:00.000Z',
    mode: 'countdown',
    theme: 'sky',
    emoji: '🏖️',
    sortOrder: 5,
    isArchived: false,
    notificationsEnabled: false,
    notificationOffsets: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
]

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

export const HomeScreen = ({ navigation }: Props) => {
  const styles = useStyles()

  const countdowns = useActiveCountdowns()
  const isLoading = useIsCountdownsLoading()

  const handleCardPress = useCallback(
    (id: string) => {
      navigation.navigate('CountdownDetail', { id })
    },
    [navigation],
  )

  const handleAdd = useCallback(() => {
    navigation.getParent()?.navigate('AddEditTab', {
      screen: 'AddEdit',
      params: {},
    })
  }, [navigation])

  const renderItem = useCallback(
    ({ item }: { item: Countdown }) => (
      <CountdownCard countdown={item} onPress={handleCardPress} />
    ),
    [handleCardPress],
  )

  const keyExtractor = useCallback((item: Countdown) => item.id, [])

  if (isLoading) {
    return <SafeAreaView style={styles.container} edges={['top']} />
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      {mockData.length === 0 ? (
        // {countdowns.length === 0 ? (
        <EmptyState onAdd={handleAdd} />
      ) : (
        <FlashList
          // data={countdowns}
          data={mockData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}
