import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    height: 44,
    borderRadius: theme.borderRadius.lg,
    padding: 4,
    backgroundColor: theme.colors.surfaceSecondary,
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: theme.colors.primary,
  },
  optionText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  optionTextActive: {
    fontFamily: 'DMSans-SemiBold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
}))
