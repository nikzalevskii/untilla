import { createStyles } from '@/theme/createStyles'

export const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 26,
  },
  // WHY отдельный active стиль: Pencil рисует active tab как pill с фиолетовой заливкой.
  // cornerRadius 26 = почти capsule внутри pill (height 64, padding 4 → inner ~56)
  containerActive: {
    backgroundColor: theme.colors.primary,
  },
  containerPressed: {
    opacity: 0.7,
  },
  // WHY 10px/600 uppercase: Pencil показывает compact uppercase labels с letterSpacing 0.5
  // для чёткого разделения от body text. White на active фоне для контраста.
  labelActive: {
    fontSize: 10,
    fontFamily: 'DMSans-SemiBold',
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  // WHY tabInactive вместо textSecondary: Pencil использует отдельный серый (#8A8A8A/#57534E),
  // не совпадающий с textSecondary — менее прозрачный, более нейтральный.
  labelInactive: {
    fontSize: 10,
    fontFamily: 'DMSans-SemiBold',
    fontWeight: '600',
    letterSpacing: 0.5,
    color: theme.colors.tabInactive,
    textTransform: 'uppercase',
  },
}))
