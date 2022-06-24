import {useQueryClient, useMutation} from 'react-query'
import {createOrUpdateOneCoupon, createOrUpdateOneVoucher} from '../api/index'
import Swal from 'sweetalert2'
export const optionsStatusVouchers = [
  {id: 1, name: 'ACTIVE'},
  {id: 2, name: 'PENDING'},
  // {id: 3, name: 'USED'},
]

export type typeVoucher = 'COUPON' | 'VOUCHER'
export type statusOnline = 'ONLINE' | 'OFFLINE' | 'TEST'
export type statusVoucher = 'ACTIVE' | 'PENDING' | 'USED'

export type VoucherFormRequest = {
  voucherId?: number
  email: string
  name: string
  currency: string
  status?: statusVoucher
  expiredAt: Date
  amount: number
  description: Date
}

export type OneVoucherResponse = {
  id: number
  usedAt: Date
  uuid: string
  code: string
  voucherType: typeVoucher
  statusOnline: statusOnline
  status: string
  name: string
  email: string
  currency: string
  description: null
  amount: number
  percent: number
  isExpired: boolean
  expiredAt: Date
  createdAt: Date
  updatedAt: Date
  userTransactionId: number
  userId: number
  organizationId: number
  userCreatedId: number
  applicationId: number
  currencyItem: {
    code: string
    name: string
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
    lastName: string
    firstName: string
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
