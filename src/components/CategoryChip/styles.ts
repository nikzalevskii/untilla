import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
  },
  chipSelected: {
    backgroundColor: theme.colors.primaryLight,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  chipText: {
    ...theme.typography.label,
    color: theme.colors.text,
  },
  chipTextSelected: {
    color: theme.colors.primary,
  },
}))
