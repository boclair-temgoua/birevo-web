import {useQueryClient, useMutation} from '@tanstack/react-query'
import {createCouponBilling, createStripeBilling} from '../api/index'
import Toastify from 'toastify-js'
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

export const CreateStripeBillingMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['user']
  const queryClient = useQueryClient()
  const saveMutation = useMutation(
    async ({...payloadProperties}: StripePayFormRequest): Promise<StripePayFormRequest> => {
      const {data} = await createStripeBilling({...payloadProperties})
      return data
    },
    {
      onMutate: async () => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          onSuccess()
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        Toastify({
          text: 'Your transaction has been save.',
          className: 'info',
          gravity: 'bottom', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            background: 'linear-gradient(to right, #4169E1, #4169E1)',
          },
        }).showToast()
        if (onSuccess) {
          onSuccess()
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
          Toastify({
            text: 'An error has occurred.',
            className: 'info',
            gravity: 'bottom', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #FF0000, #FF0000)',
            },
          }).showToast()
          onError(error)
        }
      },
    }
  )

  return saveMutation
}

export const CreateCouponBillingMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['user']
  const queryClient = useQueryClient()
  const saveMutation = useMutation(
    async ({...payloadProperties}: CouponPayFormRequest): Promise<CouponPayFormRequest> => {
      const {data} = await createCouponBilling({...payloadProperties})
      return data
    },
    {
      onMutate: async () => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          onSuccess()
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          Toastify({
            text: 'Your transaction has been save.',
            className: 'info',
            gravity: 'bottom', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #4169E1, #4169E1)',
            },
          }).showToast()
          onSuccess()
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
          Toastify({
            text: 'An error has occurred.',
            className: 'info',
            gravity: 'bottom', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #FF0000, #FF0000)',
            },
          }).showToast()
          onError(error)
        }
      },
    }
  )

  return saveMutation
}
