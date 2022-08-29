export interface AuthModel {
  api_token: string
  refreshToken?: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export type LoginModel = {
  email: string
  password: string
}

export type RegisterModel = {
  confirm: boolean
  email: string
  password: string
  passwordConfirm: string
  lastName: string
  firstName: string
}

export type ForgotPasswordModel = {
  email: string
}

export type ResetPasswordModel = {
  password: string
  newPassword: string
  token: string
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  firstName: string
  lastName: string
  fullName?: string
  occupation?: string
  companyName?: string
  phone?: string
  roles?: Array<number>
  pic?: string
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  timeZone?: string
  website?: 'https://keenthemes.com'
  // emailSettings?: UserEmailSettingsModel
  auth?: AuthModel
  // communication?: UserCommunicationModel
  address?: UserAddressModel
  socialNetworks?: UserSocialNetworksModel
}
