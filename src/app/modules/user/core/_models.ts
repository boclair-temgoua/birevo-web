export type OneUserResponse = {
  uuid: string
  email: string
  username: string
  id: number
  profileId: number
  confirmedAt: Date
  organization: {
    name: string
    slug: string
    uuid: string
    color: string
  }
  profile: {
    uuid: string
    color: string
    image: string
    fullName: string
    userId: number
  }
}
export interface UpdateEmailRequest {
  newEmail: string
  passwordConfirm: string
}

export interface UpdatePasswordRequest {
  password: string
  newPassword: string
  passwordConfirm: string
}
export interface DeactivateAccountRequest {
  user_uuid?: string
  confirm: boolean
}
export interface UpdateProfileRequest {
  profileId: number
  fullName: string
  currencyId: number
  url: string
}
