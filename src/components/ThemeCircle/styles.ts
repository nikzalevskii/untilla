import { createStyles } from '@/theme/createStyles'
import { Platform } from 'react-native'

export const useStyles = createStyles(theme => ({
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  circleSelected: {
    borderWidth: Platform.OS === 'ios' ? 1.5 : 3,
    borderRadius: 24,
    borderColor: theme.colors.text,
  },
  circlePressed: {
    opacity: 0.8,
  },
}))
