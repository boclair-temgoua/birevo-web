import dyaxios from '../../../utility/commons/dyaxios'

export const getActivitiesVoucher = (options: {
  filterQuery?: string
  voucher_uuid: string
  limit: number
  page: number
}) => {
  const {filterQuery, voucher_uuid, limit, page} = options
  return dyaxios.get(
    `/activities?limit=${limit}&is_paginate=${true}&voucher_uuid=${voucher_uuid}${
      filterQuery ? `&filterQuery=${filterQuery}&page=${1}` : `&page=${page}`
    }`
  )
}
