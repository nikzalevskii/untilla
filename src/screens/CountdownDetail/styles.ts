import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 120, 
  },
  hero: {
    height: 350,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl, // 20
  },
  statusBarSpacer: {
    width: '100%',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 44,
  },

  ringContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringSvg: {
    position: 'absolute',
  },
  ringNumberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  heroNumber: {
    fontFamily: 'DMSans-ExtraBold',
    fontSize: 64,
    fontWeight: '800',
    letterSpacing: -2,
    color: '#FFFFFF',
  },
  heroLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)', // #FFFFFFCC
  },
  heroTime: {
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)', // #FFFFFF80
  },

  contentArea: {
    paddingTop: theme.spacing['2xl'], // 24
    paddingHorizontal: theme.spacing.xl, // 20
    paddingBottom: theme.spacing['3xl'], // 32
    gap: 18,
  },

  eventTitle: {
    fontFamily: 'DMSans-Bold',
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.text,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm, // 8
  },
  dateText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    fontWeight: '400',
    color: theme.colors.textSecondary,
  },

  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.spacing.sm, // 8 (dark), 6 (light) — using 8, close enough
    borderRadius: theme.borderRadius.xl, // 20
    paddingVertical: theme.spacing.sm, // 8
    paddingHorizontal: theme.spacing.md, // 12
    backgroundColor: theme.isDark ? '#2D1B69' : '#F5F3FF',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryText: {
    ...theme.typography.label, // 13px/500
    color: theme.isDark ? '#A78BFA' : '#7C3AED',
  },

  breakdownContainer: {
    ...(theme.isDark && {
      backgroundColor: theme.colors.surface, // #0F0E0D
      borderRadius: theme.borderRadius.xl, // 20
      padding: theme.spacing.lg, // 16
    }),
  },
  breakdownRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm, // 8
  },
  breakdownCard: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.xs, // 4
    borderRadius: theme.borderRadius.lg, // 12
    paddingVertical: theme.spacing.lg, // 16
    paddingHorizontal: theme.isDark ? theme.spacing.sm : 0, // Dark: 8, Light: 0
    backgroundColor: theme.isDark
      ? theme.colors.surfaceSecondary // #161412
      : theme.colors.surface, // #FFFFFF
    justifyContent: 'center',
  },
  breakdownNumber: {
    fontFamily: 'DMSans-Bold',
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  breakdownLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },

  noteCard: {
    backgroundColor: theme.isDark
      ? theme.colors.surface // #0F0E0D
      : theme.colors.surface, // #FFFFFF
    borderRadius: theme.borderRadius.xl, // 20
    padding: theme.spacing.lg, // 16
    gap: theme.spacing.sm, // 8
  },
  noteLabel: {
    ...theme.typography.caption, // 12px/400
    fontWeight: '500',
    letterSpacing: 0.5,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  noteText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    fontWeight: '400',
    color: theme.colors.text,
    lineHeight: theme.isDark ? 22.5 : undefined, // Dark: lineHeight 1.5 (15*1.5)
  },

  actionsSection: {
    alignItems: 'center',
    gap: theme.spacing.md, // 12
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 52,
    borderRadius: theme.borderRadius.xl, // 20
    gap: theme.spacing.sm, // 8 (for pencil icon + text)
    backgroundColor: theme.isDark
      ? theme.colors.surfaceSecondary // #161412
      : theme.colors.surface, // #FFFFFF
    ...(theme.isDark && {
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.07)', // #FFFFFF12
    }),
  },
  editButtonText: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  deleteText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: '#DC2626', // both themes
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  fallbackBackButton: {
    padding: theme.spacing.md,
    alignSelf: 'flex-start',
  },
}))