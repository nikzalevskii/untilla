import { useMemo } from 'react'
import { View, type StyleProp, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from './styles'

type Props = {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export function SafeTopView({ style, children }: Props) {
  const styles = useStyles()
  const insets = useSafeAreaInsets()

  const combinedStyle = useMemo(
    () => [styles.container, { paddingTop: insets.top } as ViewStyle, style],
    [styles.container, insets.top, style],
  )

  return <View style={combinedStyle}>{children}</View>
}
