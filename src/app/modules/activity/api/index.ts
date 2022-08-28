import dyaxios from '../../../utility/commons/dyaxios'

export const getActivitiesVoucher = (options: {
  q?: string
  organizationId?: string
  voucher_uuid?: string
  limit: number
  page: number
}) => {
  const {q, voucher_uuid, organizationId, limit, page} = options
  return dyaxios.get(
    `/activities?limit=${limit}&is_paginate=${true}${
      organizationId ? `&organizationId=${organizationId}` : ``
    }${voucher_uuid ? `&voucher_uuid=${voucher_uuid}` : ``}${
      q ? `&q=${q}&page=${1}` : `&page=${page}`
    }`
  )
}
