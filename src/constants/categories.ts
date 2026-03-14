import type { CountdownCategory } from '@/types'

export type CategoryDefinition = {
  key: CountdownCategory
  color: string
  labelKey: string
}

export const CATEGORIES: CategoryDefinition[] = [
  { key: 'birthday', color: '#F9437A', labelKey: 'addEdit.categoryBirthday' },
  { key: 'holiday', color: '#FF6B35', labelKey: 'addEdit.categoryHoliday' },
  { key: 'travel', color: '#2EC4B6', labelKey: 'addEdit.categoryTravel' },
  { key: 'anniversary', color: '#9061F9', labelKey: 'addEdit.categoryAnniversary' },
  { key: 'work', color: '#3B82F6', labelKey: 'addEdit.categoryWork' },
  { key: 'health', color: '#10B981', labelKey: 'addEdit.categoryHealth' },
  { key: 'personal', color: '#F59E0B', labelKey: 'addEdit.categoryPersonal' },
  { key: 'other', color: '#6B7280', labelKey: 'addEdit.categoryOther' },
]

export const getCategoryColor = (key: CountdownCategory): string =>
  CATEGORIES.find(category => category.key === key)?.color ?? '#6B7280'
