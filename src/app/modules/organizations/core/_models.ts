import {useQueryClient, useMutation} from 'react-query'
import {crateOneContributor, deleteOneSubscribe} from '../../subscribes/api/index'
import Swal from 'sweetalert2'
export type OneOrganizationResponse = {
  id: number
  uuid: string
  name: string
  slug: string
  color: string
  userId: number
  contributorTotal: number
}

export const ContributorCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
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
          onSuccess()
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

  return result
}
