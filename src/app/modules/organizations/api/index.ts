import dyaxios from '../../../utility/commons/dyaxios'

export const getOneOrganizationApi = (options: {organization_uuid: string}) => {
  const {organization_uuid} = options
  return dyaxios.get<{organization_uuid: string}>(`/organizations/show/${organization_uuid}`)
}

export const createOrUpdateOneOrganizationApi = (payload: any) => {
  return dyaxios.post<any>(`/organizations/create-or-update`, payload)
}
