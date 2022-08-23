import {useQueryClient, useMutation} from '@tanstack/react-query'
import {
  crateOneContributor,
  deleteOneSubscribe,
  updateOneRoleContributor,
} from '../../subscribes/api/index'
import Toastify from 'toastify-js'

export const optionsRoles = [
  {id: 1, name: 'ADMIN'},
  {id: 2, name: 'MODERATOR'},
]

export type OneOrganizationResponse = {
  id: number
  uuid: string
  name: string
  slug: string
  color: string
  userId: number
  contributorTotal: number
}

export type UpdateContributorRequest = {
  roleId: number
  contributorId: number
  subscribe_uuid: string
}

export const ContributorCreateMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contributorsOrganizations']
  const queryClient = useQueryClient()
  const result = useMutation(
    async ({...contributorId}: any): Promise<{contributorId: number}> => {
      const {data} = await crateOneContributor({...contributorId})
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
            text: 'Invitation has been successfully.',
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

export const ContributorUpdateMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contributorsOrganizations']
  const queryClient = useQueryClient()
  const result = useMutation(
    async ({...payload}: any): Promise<UpdateContributorRequest> => {
      const {data} = await updateOneRoleContributor({...payload})
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
            text: 'Information has been successfully.',
            className: 'info',
            gravity: 'top', // `top` or `bottom`
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

export const DeleteContributorMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
} = {}) => {
  const queryKey = ['contributorsOrganizations']
  const queryClient = useQueryClient()
  const result = useMutation(
    async ({...subscribe_uuid}: any): Promise<{subscribe_uuid: string}> => {
      const {data} = await deleteOneSubscribe({...subscribe_uuid})
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
            text: 'Contributor has been deleted.',
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
    }
  )

  return result
}
