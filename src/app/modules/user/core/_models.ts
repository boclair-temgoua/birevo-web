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
    lastName: string
    firstName: string
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
export interface UpdateProfileRequest {
  profileId: number
  firstName: string
  currencyId: number
  lastName: string
  url: string
}
