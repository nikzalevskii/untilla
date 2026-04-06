import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  card: {
    borderRadius: theme.borderRadius.xl,
    minHeight: 140,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.96 }],
  },
  content: {
    padding: theme.spacing.xl,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  right: {
    alignItems: 'center',
    minWidth: 70,
  },
  title: {
    ...theme.typography.cardTitle,
    color: '#FFFFFF',
  },
  daysNumber: {
    ...theme.typography.display,
    color: '#FFFFFF',
  },
  daysLabel: {
    ...theme.typography.label,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  secondaryText: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
}))
