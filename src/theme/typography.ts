export const typography = {
  // Цифры countdown — самый крупный элемент в приложении
  display: {
    fontFamily: 'DMSans-ExtraBold',
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: -2,
    fontWeight: '800' as const,
  },

  // Заголовки экранов
  title1: {
    fontFamily: 'DMSans-Bold',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    fontWeight: '700' as const,
  },

  // Заголовки секций, модалок
  title2: {
    fontFamily: 'DMSans-Bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.3,
    fontWeight: '700' as const,
  },

  // Название события на карточке countdown
  cardTitle: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
    fontWeight: '600' as const,
  },

  // Основной текст
  body: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },

  // Метки, подписи табов, второстепенная инфо
  label: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
    fontWeight: '500' as const,
  },

  // Самый мелкий текст — даты, метки времени
  caption: {
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.1,
    fontWeight: '400' as const,
  },
} as const
