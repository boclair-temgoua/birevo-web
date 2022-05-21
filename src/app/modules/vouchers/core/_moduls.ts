export type VoucherFormRequest = {
  email: string
  name: string
  currency: string
  startedAt: Date
  expiredAt: Date
  amount: number
  description: Date
}

export type OneVoucherResponse = {
  createdAt: Date
  id: number
  usedAt: Date
  uuid: string
  code: string
  voucherType: string
  status: string
  name: string
  email: string
  description: null
  amount: number
  percent: number
  isExpired: boolean
  startedAt: Date
  expiredAt: Date
  userTransactionId: number
  userId: number
  organizationId: number
  userCreatedId: number
  applicationId: number
  currency: {
    code: string
    name: string
  }
  profileOwner: {
    uuid: string
    color: string
    image: string
    lastName: string
    firstName: string
    profileId: number
  }
  activity: {
    view: number
    usage: number
  }
  qrCode: {
    image: string
  }
  application: {
    id: number
    name: string
    userId: number
    createdAt: Date
  }
}
