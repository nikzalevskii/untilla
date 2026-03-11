import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  card: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    minHeight: 120,
    ...theme.shadows.md,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    gap: 8,
    paddingRight: theme.spacing.md,
  },
  right: {
    alignItems: 'center',
    minWidth: 70,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    ...theme.typography.title2,
    color: '#FFFFFF',
  },
  daysNumber: {
    fontSize: 48,
    fontFamily: theme.typography.display.fontFamily,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 52,
  },
  daysLabel: {
    fontSize: 13,
    fontFamily: theme.typography.caption.fontFamily,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  secondaryText: {
    fontSize: 12,
    fontFamily: theme.typography.caption.fontFamily,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
}))
