import dyaxios from '../../../utility/commons/dyaxios'

export const getOneOrganizationApi = (options: {organization_slug: string}) => {
  const {organization_slug} = options
  return dyaxios.get(`/organizations/show/${organization_slug}`)
}

export const createOrUpdateOneOrganizationApi = (payload: any) => {
  return dyaxios.post<any>(`/organizations/create-or-update`, payload)
}
