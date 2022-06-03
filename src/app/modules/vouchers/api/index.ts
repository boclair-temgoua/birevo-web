import dyaxios from '../../../utility/commons/dyaxios'
import {typeVoucher, VoucherFormRequest} from '../core/_moduls'

export const createOrUpdateOneCoupon = (payload: VoucherFormRequest) => {
  return dyaxios.post(`/vouchers/c/create-or-update`, payload)
}

export const getOneVoucher = (options: {code: string}) => {
  const {code} = options
  return dyaxios.get(`/vouchers/show?code=${code}`)
}

export const getOneByUuidVoucher = (options: {uuid: string}) => {
  const {uuid} = options
  return dyaxios.get(`/vouchers/view?uuid=${uuid}`)
}

export const getVouchers = (options: {
  filterQuery?: string
  type: typeVoucher
  limit: number
  page: number
}) => {
  const {filterQuery, type, limit, page} = options
  return dyaxios.get(
    `/vouchers?is_paginate=${true}&type=${type}&limit=${limit}${
      filterQuery ? `&filterQuery=${filterQuery}&page=${1}` : `&page=${page}`
    }`
  )
}
