import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: 120,
  },
}))
