import { StyleSheet } from 'react-native'
import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  row: {
    minHeight: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  labelDestructive: {
    color: theme.colors.error,
  },
  value: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.borderSubtle,
    marginHorizontal: theme.spacing.lg,
  },
  pressed: {
    opacity: 0.7,
  },
}))
