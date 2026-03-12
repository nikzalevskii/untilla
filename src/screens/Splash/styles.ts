import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoMark: {
    marginBottom: theme.spacing.lg,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  title: {
    ...theme.typography.title1,
    color: theme.colors.text,
    letterSpacing: 2,
  },
}))
