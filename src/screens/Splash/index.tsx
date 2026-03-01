import React, { useEffect, useRef } from 'react'
import { Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated'
import RNBootSplash from 'react-native-bootsplash'
import { useStyles } from './styles'

type Props = {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: Props) {
  const styles = useStyles()

  // useRef сохраняет актуальную ссылку на onFinish без добавления её в deps useEffect.
  // Это позволяет использовать пустой [] — эффект запускается ровно один раз при монтировании,
  // что семантически правильно: splash — одноразовое событие.
  const onFinishRef = useRef(onFinish)

  // useSharedValue — аналог useRef для анимационных значений.
  // Хранит мутируемое значение в JSI-памяти, доступной с UI-потока без Bridge.
  // Изменение .value не вызывает ре-рендер компонента — анимация идёт мимо React.
  const logoScale = useSharedValue(0.8)
  const logoOpacity = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const titleTranslateY = useSharedValue(20)
  const screenOpacity = useSharedValue(1)

  useEffect(() => {
    // hide() убирает нативный splash (который удерживал MainActivity).
    // Параметр { fade: true } — нативный crossfade между splash и нашим JS-экраном.
    // .then() — ждём завершения нативного fade, только потом запускаем JS-анимации.
    RNBootSplash.hide({ fade: true }).then(() => {
      // 1. Лого: fade in + spring scale (0.8 → 1.0)
      logoOpacity.value = withTiming(1, { duration: 400 })
      logoScale.value = withSpring(1, { damping: 12, stiffness: 100 })

      // 2. Название: fade in + slide up (с задержкой 300ms)
      titleOpacity.value = withDelay(300, withTiming(1, { duration: 500 }))
      titleTranslateY.value = withDelay(
        300,
        withSpring(0, { damping: 15, stiffness: 120 }),
      )

      // 3. Весь экран: fade out (после паузы 1500ms)
      // Третий аргумент withTiming — callback, выполняется на UI-потоке (worklet-контекст).
      // В Reanimated 4 (New Architecture, JSI) JS-функции можно вызывать напрямую из worklet
      // без runOnJS — Bridge больше нет, вызов синхронный через JSI.
      screenOpacity.value = withDelay(
        1500,
        withTiming(
          0,
          { duration: 400, easing: Easing.out(Easing.ease) },
          finished => {
            if (finished) onFinishRef.current()
          },
        ),
      )
    })
    // SharedValue-рефы стабильны между рендерами (как useRef) — их идентичность никогда не меняется.
    // Добавляем в deps чтобы удовлетворить ESLint: эффект всё равно запустится ровно один раз.
  }, [logoOpacity, logoScale, screenOpacity, titleOpacity, titleTranslateY])

  // useAnimatedStyle — подписывается на sharedValue и пересчитывает стили на UI-потоке.
  // Не вызывает ре-рендер React — стили применяются напрямую к нативной View через Fabric.
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
    // Animated.View — обёртка над View с поддержкой анимированных стилей от Reanimated.
    // screenStyle управляет прозрачностью всего экрана (fade out в конце).
    <Animated.View style={[styles.container, screenStyle]}>
      {/* Placeholder логотипа: фиолетовый круг с монограммой "U".
          Заменить на реальный SVG-компонент когда будет готов дизайн. */}
      <Animated.View style={[styles.logoMark, logoStyle]}>
        <Text style={styles.logoLetter}>U</Text>
      </Animated.View>
      <Animated.Text style={[styles.title, titleStyle]}>Untilla</Animated.Text>
    </Animated.View>
  )
}
