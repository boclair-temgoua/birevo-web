import dyaxios from '../../../utility/commons/dyaxios'
import {UpdateOrganizationRequest} from '../core/_models'

export const getOneByUUIDOrganizationApi = (options: {organization_uuid: string}) => {
  const {organization_uuid} = options
  return dyaxios.get<{organization_uuid: string}>(
    `/organizations/show_by_uuid/${organization_uuid}`
  )
}

export const getOneByIdOrganizationApi = (options: {organization_uuid: string}) => {
  const {organization_uuid} = options
  return dyaxios.get<{organization_uuid: string}>(`/organizations/show_by_id/${organization_uuid}`)
}

export const createOrUpdateOneOrganizationApi = (payload: any) => {
  return dyaxios.post<any>(`/organizations/create-or-update`, payload)
}

export const updateOrganizationApi = (payload: UpdateOrganizationRequest) => {
  return dyaxios.put(`/organizations/update/${payload?.organization_uuid}`, payload)
}
