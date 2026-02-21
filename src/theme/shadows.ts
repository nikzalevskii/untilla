import { Platform } from 'react-native'

const SHADOW_COLOR = '#000000'

export function shadows(isDark: boolean) {
  const shadowOpacity = isDark ? 0.4 : 0.1

  return {
    sm: Platform.select({
      ios: {
        shadowColor: SHADOW_COLOR,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
    md: Platform.select({
      ios: {
        shadowColor: SHADOW_COLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
    lg: Platform.select({
      ios: {
        shadowColor: SHADOW_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: shadowOpacity + 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  } as const
}
