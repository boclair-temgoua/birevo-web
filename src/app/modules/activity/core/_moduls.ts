import {typeVoucher} from './../../vouchers/core/_moduls'

export type OneActivityResponse = {
  createdAt: Date
  id: number
  uuid: string
  activityAbleType: typeVoucher
  activityAbleId: number
  action: string
  ipLocation: string
  browser: string
  countryCode: string
  city: string
  os: string
  platform: string
  source: string
}
