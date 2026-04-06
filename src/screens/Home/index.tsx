import { useStyles } from './styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '@/navigation'
import { useActiveCountdowns, useIsCountdownsLoading } from '@/store'
import { useCallback } from 'react'
import { Countdown } from '@/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { CountdownCard, EmptyState, HomeHeader } from '@/components'

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
        {countdowns.length === 0 ? (
        <EmptyState onAdd={handleAdd} />
      ) : (
        <FlashList
          data={countdowns}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}
