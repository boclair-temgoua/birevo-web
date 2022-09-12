import {useQueryClient, useMutation} from '@tanstack/react-query'
import {
  createCouponBilling,
  createStripeBilling,
  createPayPalBilling,
  createOrUpdateUserAddress,
} from '../api/index'
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

export type PayPalPayFormRequest = {
  currency: string
  amount: number
  paymentMethod: paymentMethodType
}

export type UserAddressFormRequest = {
  user_address_uuid: string
  company: string
  city: string
  phone: string
  region: string
  street1: string
  street2: string
  cap: string
  countryId: number
}

export type UserAddressResponse = UserAddressFormRequest & {
  id: number
  uuid: string
  country: {code: string; name: string}
  createdAt: Date
  updatedAt: Date
}

export type OneAmountResponse = {
  id: number
  token: string
  currency: string
  type: string
  description: string
  paymentMethod: paymentMethodType
  organizationId: number
  amount: number
  createdAt: Date
}

/** Stripe send request */
export const CreateStripeBillingMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (result: any) => void
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
      onMutate: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          onSuccess(result)
        }
      },
      onSuccess: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        Toastify({
          text: 'Your transaction has been save.',
          className: 'info',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            background: 'linear-gradient(to right, #3CB371, #3CB371)',
          },
        }).showToast()
        if (onSuccess) {
          onSuccess(result)
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
          Toastify({
            text: 'An error has occurred.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
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

/** Paypal send request */
export const CreatePaypalBillingMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['user']
  const queryClient = useQueryClient()
  const saveMutation = useMutation(
    async ({...payloadProperties}: PayPalPayFormRequest): Promise<PayPalPayFormRequest> => {
      const {data} = await createPayPalBilling({...payloadProperties})
      return data
    },
    {
      onMutate: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          onSuccess(result)
        }
      },
      onSuccess: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        Toastify({
          text: 'Your transaction has been save.',
          className: 'info',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            background: 'linear-gradient(to right, #3CB371, #3CB371)',
          },
        }).showToast()
        if (onSuccess) {
          onSuccess(result)
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
          Toastify({
            text: 'An error has occurred.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
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

/** Coupon send request */
export const CreateCouponBillingMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (result: any) => void
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
      onMutate: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          onSuccess(result)
        }
      },
      onSuccess: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          Toastify({
            text: 'Your transaction has been save.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #3CB371, #3CB371)',
            },
          }).showToast()
          onSuccess(result)
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
          Toastify({
            text: 'An error has occurred.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
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

/** userAddress send request */
export const UserAddressCreateMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['userAddress']
  const queryClient = useQueryClient()
  const saveMutation = useMutation(
    async ({...payloadProperties}: UserAddressFormRequest): Promise<UserAddressFormRequest> => {
      const {data} = await createOrUpdateUserAddress({...payloadProperties})
      return data
    },
    {
      onMutate: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          onSuccess(result)
        }
      },
      onSuccess: async (result) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onSuccess) {
          Toastify({
            text: 'Your address has been save.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #3CB371, #3CB371)',
            },
          }).showToast()
          onSuccess(result)
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
          Toastify({
            text: 'An error has occurred.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
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
