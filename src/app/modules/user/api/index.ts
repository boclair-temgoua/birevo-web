import dyaxios from '../../../utility/commons/dyaxios'
import {UpdateEmailRequest, UpdatePasswordRequest, UpdateProfileRequest} from '../core/_models'

export const getOneApi = (options: {user_uuid: string}) => {
  const {user_uuid} = options
  return dyaxios.get(`/users/show/${user_uuid}`)
}

export const updateOrganizationToUser = (options: {organizationId: number}) => {
  const {organizationId} = options
  return dyaxios.get(`/users/update-organization-to-user?organizationId=${organizationId}`)
}

export const getUsers = (options: {q?: string; limit: number; page: number}) => {
  const {q, limit, page} = options
  return dyaxios.get(`/users?limit=${limit}&page=${page}${q ? `&q=${q}` : ''}`)
}

export const updateEmailToUser = (payload: UpdateEmailRequest) => {
  return dyaxios.put<UpdateEmailRequest>(`/users/update-email`, payload)
}

export const updatePasswordToUser = (payload: UpdatePasswordRequest) => {
  return dyaxios.put<UpdatePasswordRequest>(`/users/update-password`, payload)
}

export const updateProfileToUser = (payload: UpdateProfileRequest) => {
  return dyaxios.put<UpdateProfileRequest>(`/users/update-profile/${payload?.profileId}`, payload)
}
