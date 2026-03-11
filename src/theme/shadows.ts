import { Platform } from 'react-native'

const SHADOW_COLOR_LIGHT = '#1A1035'
const SHADOW_COLOR_DARK = '#0D0820'

export function shadows(isDark: boolean) {
  const shadowColor = isDark ? SHADOW_COLOR_DARK : SHADOW_COLOR_LIGHT
  const opacityBase = isDark ? 0.18 : 0.08

  return {
    sm: Platform.select({
      ios: {
        shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: opacityBase,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
    md: Platform.select({
      ios: {
        shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: opacityBase + 0.04,
        shadowRadius: 20,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
    lg: Platform.select({
      ios: {
        shadowColor,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: opacityBase + 0.08,
        shadowRadius: 40,
      },
      android: {
        elevation: 12,
      },
      default: {},
    }),
  } as const
}
