import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  headerButton: {
    minWidth: 60,
  },
  headerTitle: {
    ...theme.typography.title2,
    color: theme.colors.text,
  },
  cancelText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  saveText: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.primary,
    textAlign: 'right',
  },
  saveDisabled: {
    opacity: 0.4,
  },
  scrollView: {
    flex: 1,
  },
  formContent: {
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 120,
    gap: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...theme.typography.caption,
    fontFamily: 'DMSans-Medium',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: theme.colors.textSecondary,
  },
  dateButton: {
    height: 48,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButtonPressed: {
    opacity: 0.8,
  },
  dateText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  notificationsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
  },
  notificationsText: {
    flex: 1,
    gap: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },
  notificationsTitle: {
    ...theme.typography.body,
    fontWeight: '500',
    color: theme.colors.text,
  },
  notificationsDescription: {
    ...theme.typography.label,
    color: theme.colors.textSecondary,
  },
}))
