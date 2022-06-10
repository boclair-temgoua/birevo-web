export type paymentMethodType = 'COUPON-PAY' | 'PAYPAL-PAY' | 'CARD-PAY'

export type CouponPayFormRequest = {
  code: string
  paymentMethod: paymentMethodType
}

export type StripePayFormRequest = {
  currency: string
  amount: number
  email: string
  fullName: string
  infoPaymentMethod: any
}
