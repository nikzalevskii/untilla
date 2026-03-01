import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Placeholder логотипа — фиолетовый круг с монограммой "U"
  // Заменить на реальный SVG-логотип когда будет готов дизайн иконки
  logoMark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  logoLetter: {
    fontFamily: 'DMSans-Bold',
    fontSize: 40,
    lineHeight: 48,
    color: '#FFFFFF', 
  },
  title: {
    ...theme.typography.title1, 
    color: theme.colors.text,
    letterSpacing: 2,
  },
}))
