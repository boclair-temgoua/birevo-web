import {createOrUpdateOneApplication} from './../api/index'
import {useQueryClient, useMutation} from 'react-query'
export type StatusOnline = 'ONLINE' | 'OFFLINE' | 'TEST'

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
          onSuccess()
        }
      },
    }
  )

  return saveUserMutation
}
