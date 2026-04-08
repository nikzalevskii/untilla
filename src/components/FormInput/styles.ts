import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    ...theme.typography.caption,
    fontFamily: 'DMSans-Medium',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: theme.colors.textSecondary,
  },
  input: {
    height: 48,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  inputMultiline: {
    height: 80,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  inputError: {
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
  },
}))
