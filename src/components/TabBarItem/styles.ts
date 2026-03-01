import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 8,
  },
  containerPressed: {
    opacity: 0.7,
  },
  labelActive: {
    fontSize: 10,
    fontFamily: 'DMSans-Medium',
    letterSpacing: 0.2,
    color: theme.colors.primary,
  },
  labelInactive: {
    fontSize: 10,
    fontFamily: 'DMSans-Medium',
    letterSpacing: 0.2,
    color: theme.colors.textSecondary,
  },
}))
