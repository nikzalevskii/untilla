import { Platform } from 'react-native'
import { createStyles } from '@/theme/createStyles'

const PILL_HEIGHT = 64
const FAB_SIZE = 56
const FAB_OVERHANG = FAB_SIZE / 2

export const useStyles = createStyles(theme => ({
  wrapper: {
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
    paddingTop: FAB_OVERHANG,
  },
  pill: {
    width: '100%',
    height: PILL_HEIGHT,
    borderRadius: PILL_HEIGHT / 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: theme.isDark ? 0.5 : 0.10,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  centerSpace: {
    width: FAB_SIZE + 16,
    flexShrink: 0,
  },
}))
