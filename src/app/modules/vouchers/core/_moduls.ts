export const optionsStatusVouchers = [
  {id: 1, name: 'ACTIVE'},
  {id: 2, name: 'PENDING'},
  {id: 3, name: 'USED'},
]

export type typeVoucher = 'COUPON' | 'VOUCHER'

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
  id: number
  usedAt: Date
  uuid: string
  code: string
  voucherType: typeVoucher
  status: string
  name: string
  email: string
  currency: string
  description: null
  amount: number
  percent: number
  isExpired: boolean
  startedAt: Date
  expiredAt: Date
  createdAt: Date
  updatedAt: Date
  userTransactionId: number
  userId: number
  organizationId: number
  userCreatedId: number
  applicationId: number
  currencyItem: {
    code: string
    name: string
  }
  organization: {
    name: string
    slug: string
    uuid: string
    color: string
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
