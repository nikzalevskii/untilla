import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  circleSelected: {
    borderWidth: 3,
    borderColor: theme.colors.text,
  },
  circlePressed: {
    opacity: 0.8,
  },
}))
