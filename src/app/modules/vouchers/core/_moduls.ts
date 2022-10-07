import {useQueryClient, useMutation} from '@tanstack/react-query'
import {
  createOrUpdateOneCoupon,
  createOrUpdateOneVoucher,
  updateUseOneCoupon,
  deleteOneVoucher,
} from '../api/index'
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
export const optionsStatusVouchers = [
  {id: 1, name: 'ACTIVE'},
  {id: 2, name: 'PENDING'},
  // {id: 3, name: 'USED'},
]

export type typeVoucher = 'COUPON' | 'VOUCHER'
export type statusOnline = 'ONLINE' | 'OFFLINE' | 'TEST'
export type statusVoucher = 'ACTIVE' | 'PENDING' | 'USED'

export type deliveryType = 'AMOUNT' | 'PERCENT'

export type VoucherFormRequest = {
  voucherId?: number
  code: string
  email: string
  name: string
  currencyId: number
  codeGenerate: boolean
  status?: statusVoucher
  deliveryType: deliveryType
  expiredAt: Date
  startedAt: Date
  amount: number
  percent: number
  description: string
}

export type VoucherDownloadFormRequest = {
  organizationId: number
  type: typeVoucher
  statusVoucher?: statusVoucher
  initiationAt: Date
  endAt: Date
}

export type OneVoucherResponse = {
  id: number
  usedAt: Date
  uuid: string
  code: string
  voucherType: typeVoucher
  statusOnline: statusOnline
  status: string
  deliveryType: deliveryType
  name: string
  email: string
  description: null
  amount: number
  percent: number
  isExpired: boolean
  startedAt: Date
  expiredAt: Date
  createdAt: Date
  updatedAt: Date
  userTransactionId: number
  userId: number
  currencyId: number
  organizationId: number
  userCreatedId: number
  applicationId: number
  currency: {
    code: string
    name: string
    amount: number
  }
  organization: {
    name: string
    slug: string
    uuid: string
    color: string
  }
  profileOwner: {
    uuid: string
    color: string
    image: string
    email: string
    fullName: string
    profileId: number
  }
  activity: {
    view: number
    usage: number
  }
  qrCode: {
    image: string
  }
  application: {
    id: number
    name: string
    userId: number
    createdAt: Date
  }
}

export const CouponCreateMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['voucherCoupons']
  const queryClient = useQueryClient()
  const saveMutation = useMutation(
    async ({...payloadProperties}: VoucherFormRequest): Promise<VoucherFormRequest> => {
      const {data} = await createOrUpdateOneCoupon(payloadProperties)
      return data.results
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
            text: 'Coupon has been saved successfully.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #3CB371, #3CB371)',
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

export const UseCouponMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['voucherCoupons']
  const queryClient = useQueryClient()
  const saveMutation = useMutation(
    async ({...payloadProperties}: VoucherFormRequest): Promise<VoucherFormRequest> => {
      const {data} = await updateUseOneCoupon({...payloadProperties})
      return data.results
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
            text: 'Status coupon has been updated.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #3CB371, #3CB371)',
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

export const VoucherCreateMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['voucherVouchers']
  const queryClient = useQueryClient()
  const saveMutation = useMutation(
    async ({...payloadProperties}: VoucherFormRequest): Promise<VoucherFormRequest> => {
      const {data} = await createOrUpdateOneVoucher({...payloadProperties})
      return data.results
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
            text: 'Voucher has been save.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #3CB371, #3CB371)',
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

export const DeleteCouponMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['voucherCoupons']
  const queryClient = useQueryClient()
  const result = useMutation(
    async ({...code}: any): Promise<{code: string}> => {
      const {data} = await deleteOneVoucher({...code})
      return data.results
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
            text: 'Voucher has been deleted.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #3CB371, #3CB371)',
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

  return result
}

export const DeleteVoucherMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['voucherVouchers']
  const queryClient = useQueryClient()
  const result = useMutation(
    async ({...code}: any): Promise<{code: string}> => {
      const {data} = await deleteOneVoucher({...code})
      return data.results
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
            text: 'Voucher has been deleted.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              background: 'linear-gradient(to right, #3CB371, #3CB371)',
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

  return result
}
