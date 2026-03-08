import { Pressable, Text } from 'react-native'
import { useStyles } from './styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '@/navigation'
import { selectActiveCountdowns, useCountdownStore } from '@/store'
import { useCallback, useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { Countdown } from '@/types'
import { EmptyState } from '@/components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { HomeHeader } from '@/components/HomeHeader'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

export const HomeScreen = ({ navigation }: Props) => {
  const styles = useStyles()

  const countdowns = useCountdownStore(useShallow(selectActiveCountdowns))
  const isLoading = useCountdownStore(s => s.isLoading)

  const sortedCountdowns = useMemo(
    () =>
      [...countdowns].sort(
        (a, b) =>
          new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime(),
      ),
    [countdowns],
  )

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
      // TODO: Заменить на <CountdownCard countdown={item} onPress={handleCardPress} />
      <Pressable
        onPress={() => handleCardPress(item.id)}
        style={styles.tempCard}
      >
        <Text style={styles.tempCardEmoji}>{item.emoji ?? '⏳'}</Text>
        <Text style={styles.tempCardTitle}>{item.title}</Text>
      </Pressable>
    ),
    [handleCardPress, styles],
  )

  const keyExtractor = useCallback((item: Countdown) => item.id, [])

  if (isLoading) {
    return <SafeAreaView style={styles.container} edges={['top']} />
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      {sortedCountdowns.length === 0 ? (
        <EmptyState onAdd={handleAdd} />
      ) : (
        <FlashList
          data={sortedCountdowns}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}
