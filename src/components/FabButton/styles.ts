import { Platform } from 'react-native'
import { createStyles } from '@/theme/createStyles'

const FAB_SIZE = 56

export const useStyles = createStyles(theme => ({
  button: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonPressed: {
    transform: [{ scale: 0.94 }],
  },
}))
