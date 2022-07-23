import {createOrUpdateOneApplication} from './../api/index'
import {useQueryClient, useMutation} from '@tanstack/react-query'
import {deleteOneApplication} from '../api/index'
import Toastify from 'toastify-js'
import Swal from 'sweetalert2'
export type StatusOnline = 'ONLINE' | 'OFFLINE' | 'TEST'

export const optionsStatusOnline = [
  {id: 1, name: 'ONLINE'},
  {id: 2, name: 'OFFLINE'},
  {id: 3, name: 'TEST'},
]

export type ApplicationFormRequest = {
  name: string
}

export type OneApplicationResponse = {
  id: number
  uuid: string
  name: string
  color: string
  statusOnline: StatusOnline
  userId: number
  userCreatedId: number
  createdAt: Date
  updatedAt: Date
}

export type OneApplicationTokenResponse = {
  id: number
  uuid: string
  token: string
  applicationId: number
  organizationId: number
  userId: number
  userCreatedId: number
  createdAt: Date
  updatedAt: Date
}

export const ApplicationMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
} = {}) => {
  const queryKey = ['applications']
  const queryClient = useQueryClient()
  const saveUserMutation = useMutation(
    async ({...restUserProperties}: any): Promise<ApplicationFormRequest> => {
      const {data} = await createOrUpdateOneApplication({
        ...restUserProperties,
      })
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
            text: 'Your application has been created.',
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
    }
  )

  return saveUserMutation
}

export const ApplicationDeleteMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
} = {}) => {
  const queryKey = ['applications']
  const queryClient = useQueryClient()
  const saveUserMutation = useMutation(
    async ({...application_uuid}: any): Promise<{application_uuid: string}> => {
      const {data} = await deleteOneApplication({...application_uuid})
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
            text: 'Your application has been deleted.',
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
      onError: async () => {},
    }
  )

  return saveUserMutation
}
