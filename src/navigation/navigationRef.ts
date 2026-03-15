import { createNavigationContainerRef } from '@react-navigation/native'
import { RootTabParamList } from './types'

// WHY module-level ref: lets FloatingTabBar access navigation state and navigate
// without being inside a Navigator. Required for the absolute overlay approach.
export const navigationRef = createNavigationContainerRef<RootTabParamList>()
