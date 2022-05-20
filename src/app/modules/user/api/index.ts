import dyaxios from '../../../utility/commons/dyaxios'

export const getOneApi = (options: {user_uuid: string}) => {
  const {user_uuid} = options
  return dyaxios.get(`/users/show/${user_uuid}`)
}

export const updateOrganizationToUser = (options: {organizationId: number}) => {
  const {organizationId} = options
  return dyaxios.get(`/users/update-organization-to-user?organizationId=${organizationId}`)
}
