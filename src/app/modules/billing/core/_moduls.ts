import {useQueryClient, useMutation} from 'react-query'
import Swal from 'sweetalert2'
import {createCouponBilling, createStripeBilling} from '../api/index'
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
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Transaction save successfully',
          confirmButtonText: 'Got It',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          showCancelButton: false,
          showClass: {
            popup: 'animate__animated animate__bounceIn',
          },
        })
        if (onSuccess) {
          onSuccess()
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
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
          onSuccess()
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey)
        await queryClient.removeQueries(queryKey)
        if (onError) {
          onError(error)
        }
      },
    }
  )

  return saveMutation
}
