import {createOrUpdateOneApplication} from '../api/index'
import {useQueryClient, useMutation} from '@tanstack/react-query'
import {deleteOneApplication} from '../api/index'
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
          Swal.fire({
            title: 'Created!',
            icon: 'success',
            text: 'Your application has been created.',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
            showClass: {
              popup: 'animate__animated animate__bounceIn',
            },
          })
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
          Swal.fire({
            title: 'Deleted!',
            icon: 'success',
            text: 'Your application has been deleted.',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
            showClass: {
              popup: 'animate__animated animate__bounceIn',
            },
          })
          onSuccess()
        }
      },
    }
  )

  return saveUserMutation
}
