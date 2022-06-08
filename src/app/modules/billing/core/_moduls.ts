export type paymentMethodType = 'COUPON-PAY' | 'PAYPAL-PAY' | 'CARD-PAY'

export type CouponPayFormRequest = {
  code: string
  paymentMethod: paymentMethodType
}
