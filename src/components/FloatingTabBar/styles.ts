import { Platform } from 'react-native'
import { createStyles } from '@/theme/createStyles'

const PILL_HEIGHT = 64

export const useStyles = createStyles(theme => ({
  wrapper: {
    backgroundColor: 'transparent',
  },
  // WHY без paddingTop: FAB теперь внутри pill, не нужен overhang сверху.
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  // WHY borderColor из Pencil (#E8E4DF/#2E2E2E): тёплый серый, не холодный neutral200.
  // Shadow: blur 16 y:4 — мягкая тень без "floating card" эффекта.
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
