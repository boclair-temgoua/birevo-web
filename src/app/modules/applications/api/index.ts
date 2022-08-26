import dyaxios from '../../../utility/commons/dyaxios'
import {ApplicationFormRequest} from '../core/_moduls'
import {SortType} from '../../../utility/index'

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

export const getApplications = (options: {
  q?: string
  limit: number
  page: number
  sort: SortType
}) => {
  const {q, limit, page, sort} = options
  return dyaxios.get(
    `/applications?limit=${limit}${q ? `&q=${q}&page=${1}` : `&page=${page}&sort=${sort}`}`
  )
}

export const getTokenWithApplications = (options: {applicationId: number}) => {
  const {applicationId} = options
  return dyaxios.get(`/applications/tokens?applicationId=${applicationId}`)
}
