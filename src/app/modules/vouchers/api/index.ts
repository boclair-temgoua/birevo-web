import dyaxios from '../../../utility/commons/dyaxios'
type typeVoucher = 'COUPON' | 'VOUCHER'
// export const createOrUpdateOneCoupon = (data: VoucherFormRequest) => {
//     return dyaxios.post(`/vouchers/c/create-or-update`, data);
// };

export const getVouchers = (options: {
  filterQuery?: string
  type: typeVoucher
  limit: number
  page: number
}) => {
  const {filterQuery, type, limit, page} = options
  return dyaxios.get(
    `/vouchers?is_paginate=${true}&type=${type}&limit=${limit}&page=${page}${
      filterQuery ? `&filterQuery=${filterQuery}` : ''
    }`
  )
}
