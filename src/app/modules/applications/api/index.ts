import dyaxios from '../../../utility/commons/dyaxios'
import {ApplicationFormRequest} from '../core/_moduls'

export const createOrUpdateOneApplication = (data: ApplicationFormRequest) => {
  return dyaxios.post(`/applications/create-or-update`, data)
}

// export const getOneVoucher = (options: {code: string}) => {
//   const {code} = options
//   return dyaxios.get(`/vouchers/show?code=${code}`)
// }

export const getApplications = (options: {filterQuery?: string; limit: number; page: number}) => {
  const {filterQuery, limit, page} = options
  return dyaxios.get(
    `/applications?limit=${limit}${
      filterQuery ? `&filterQuery=${filterQuery}&page=${1}` : `&page=${page}`
    }`
  )
}
