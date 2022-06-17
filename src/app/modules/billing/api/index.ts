import dyaxios from '../../../utility/commons/dyaxios'
import {CouponPayFormRequest, StripePayFormRequest} from '../core/_moduls'

export const createCouponBilling = (data: CouponPayFormRequest) => {
  return dyaxios.post<CouponPayFormRequest>(`/billings/coupon/create`, data)
}

export const createStripeBilling = (payload: StripePayFormRequest) => {
  return dyaxios.post<StripePayFormRequest>(`/billings/stripe/create`, payload)
}

export const getBillings = (options: {limit: number; page: number}) => {
  const {limit, page} = options
  return dyaxios.get(`/billings?page=${page}&limit=${limit}`)
}
