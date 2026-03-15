import { Platform } from 'react-native'
import { createStyles } from '@/theme/createStyles'

const PILL_HEIGHT = 64

export const useStyles = createStyles(theme => ({
  // WHY absolute + transparent: overlay above Tab.Navigator.
  // pointerEvents="box-none" (in component) passes touches through to content.
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  // WHY warm border (#E8E4DF/#2E2E2E): matches Pencil design, not cold neutral200.
  pill: {
    width: '100%',
    height: PILL_HEIGHT,
    borderRadius: PILL_HEIGHT / 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.isDark ? '#2E2E2E' : '#E8E4DF',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: theme.isDark ? 0.10 : 0.05,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
}))
