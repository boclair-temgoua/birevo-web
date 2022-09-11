import dyaxios from '../../../utility/commons/dyaxios'
import {CouponPayFormRequest, StripePayFormRequest, PayPalPayFormRequest} from '../core/_moduls'
import {SortType} from '../../../utility/index'

export const createCouponBilling = (data: CouponPayFormRequest) => {
  return dyaxios.post<CouponPayFormRequest>(`/billings/coupon/create`, data)
}

export const createStripeBilling = (payload: StripePayFormRequest) => {
  return dyaxios.post<StripePayFormRequest>(`/billings/stripe/create`, payload)
}

export const createPayPalBilling = (payload: PayPalPayFormRequest) => {
  return dyaxios.post<PayPalPayFormRequest>(`/billings/paypal/create`, payload)
}

export const getOneAmountBilling = (options: {token: string}) => {
  const {token} = options
  return dyaxios.get(`/billings/billing_success/${token}`)
}

export const getBillings = (options: {limit: number; sort: SortType; page: number}) => {
  const {limit, sort, page} = options
  return dyaxios.get(`/billings/billing_history?page=${page}&limit=${limit}&sort=${sort}`)
}
