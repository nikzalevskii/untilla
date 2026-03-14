import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 120,
  },
  header: {
    marginBottom: theme.spacing['3xl'],
  },
  title: {
    ...theme.typography.screenTitle,
    color: theme.colors.text,
  },
}))
