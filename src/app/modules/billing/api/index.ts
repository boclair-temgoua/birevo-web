import dyaxios from '../../../utility/commons/dyaxios'
import {CouponPayFormRequest, StripePayFormRequest} from '../core/_moduls'

export const createCouponBilling = (data: CouponPayFormRequest) => {
  return dyaxios.post<CouponPayFormRequest>(`/billings/coupon/create`, data)
}

export const createStripeBilling = (payload: any) => {
  return dyaxios.post<any>(`/billings/stripe/create`, payload)
}
