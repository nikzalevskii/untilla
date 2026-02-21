import { NavigatorScreenParams } from '@react-navigation/native'

export type HomeStackParamList = {
  Home: undefined
  CountdownDetail: { id: string }
}

export type AddEditParamList = {
  AddEdit: { id?: string }
}

export type SettingsParamList = {
  Settings: undefined
}

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>
  AddEditTab: NavigatorScreenParams<AddEditParamList>
  SettingsTab: NavigatorScreenParams<SettingsParamList>
}
