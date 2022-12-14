import dyaxios from '../../../utility/commons/dyaxios'
import {ApplicationFormRequest} from '../core/_moduls'

export const createOrUpdateOneApplication = (data: ApplicationFormRequest) => {
  return dyaxios.post(`/applications/create-or-update`, data)
}

// export const getOneVoucher = (options: {code: string}) => {
//   const {code} = options
//   return dyaxios.get(`/vouchers/show?code=${code}`)
// }

export const deleteOneApplication = (options: {application_uuid: string}) => {
  const {application_uuid} = options
  return dyaxios.delete(`/applications/delete/${application_uuid}`)
}

export const getApplications = (options: {q?: string; limit: number; page: number}) => {
  const {q, limit, page} = options
  return dyaxios.get(`/applications?limit=${limit}${q ? `&q=${q}&page=${1}` : `&page=${page}`}`)
}

export const getTokenWithApplications = (options: {applicationId: number}) => {
  const {applicationId} = options
  return dyaxios.get(`/applications/tokens?applicationId=${applicationId}`)
}
