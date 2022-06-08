import dyaxios from '../../../utility/commons/dyaxios'
import {CouponPayFormRequest} from '../core/_moduls'

export const createCouponBilling = (data: CouponPayFormRequest) => {
  return dyaxios.post<CouponPayFormRequest>(`/billings/coupon/create`, data)
}
