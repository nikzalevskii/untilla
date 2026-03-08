import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 120,
  },

  tempCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
    marginBottom: 12,
  },
  tempCardEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  tempCardTitle: {
    ...theme.typography.title2,
    color: theme.colors.text,
    flex: 1,
  },
}))
