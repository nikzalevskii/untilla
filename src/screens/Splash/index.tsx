import React, { useEffect, useRef } from 'react'
import { Image } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated'
import RNBootSplash from 'react-native-bootsplash'
import { useStyles } from './styles'

type Props = {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: Props) {
  const styles = useStyles()

  // Ref keeps the latest onFinish without adding it to useEffect deps.
  // SharedValues are stable refs (like useRef) — included in deps to satisfy ESLint,
  // but the effect still runs exactly once on mount.
  const onFinishRef = useRef(onFinish)

  const logoScale = useSharedValue(0.8)
  const logoOpacity = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const titleTranslateY = useSharedValue(20)
  const screenOpacity = useSharedValue(1)

  useEffect(() => {
    // Wait for native splash crossfade to finish, then start JS animations
    RNBootSplash.hide({ fade: true }).then(() => {
      // 1. Logo: fade in + spring scale (0.8 → 1.0)
      logoOpacity.value = withTiming(1, { duration: 400 })
      logoScale.value = withSpring(1, { damping: 12, stiffness: 100 })

      // 2. Title: fade in + slide up (300ms delay)
      titleOpacity.value = withDelay(300, withTiming(1, { duration: 500 }))
      titleTranslateY.value = withDelay(
        300,
        withSpring(0, { damping: 15, stiffness: 120 }),
      )

      // 3. Screen: fade out (1500ms delay). Callback runs on UI thread —
      // in Reanimated 4 (JSI) JS functions can be called directly without runOnJS.
      screenOpacity.value = withDelay(
        1500,
        withTiming(
          0,
          { duration: 400, easing: Easing.out(Easing.ease) },
          finished => {
            if (finished) runOnJS(onFinishRef.current)()
          },
        ),
      )
    })
  }, [logoOpacity, logoScale, screenOpacity, titleOpacity, titleTranslateY])

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }))

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }))

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }))

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      <Animated.View style={[styles.logoMark, logoStyle]}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logoImage}
        />
      </Animated.View>
      <Animated.Text style={[styles.title, titleStyle]}>Untilla</Animated.Text>
    </Animated.View>
  )
}
