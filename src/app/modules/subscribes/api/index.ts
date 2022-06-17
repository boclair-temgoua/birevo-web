import dyaxios from '../../../utility/commons/dyaxios'
import {UpdateContributorRequest} from '../../organizations/core/_models'

export const crateOneContributor = (options: {contributorId: number}) => {
  const {contributorId} = {...options}
  return dyaxios.post(
    `/subscribes/contributor-create?${contributorId ? `contributorId=${contributorId}` : ''}`
  )
}

export const updateOneRoleContributor = (payload: UpdateContributorRequest) => {
  return dyaxios.put(`/subscribes/contributor-update`, payload)
}

export const getContributorsPaginateSubscribes = (options: {
  filterQuery?: string
  is_paginate: boolean
  limit: number
  page: number
}) => {
  const {filterQuery, is_paginate, limit, page} = {
    ...options,
  }
  return dyaxios.get(
    `/subscribes/contributors?is_paginate=${is_paginate}&limit=${limit}${
      filterQuery ? `&filterQuery=${filterQuery}&page=${page}` : `&page=${page}`
    }`
  )
}

export const deleteOneSubscribe = (options: {subscribe_uuid: string}) => {
  const {subscribe_uuid} = options
  return dyaxios.delete(`/subscribes/delete/${subscribe_uuid}`)
}

export const getOne = (options: {userId: number; subscribableId: number}) => {
  const {userId, subscribableId} = options
  return dyaxios.get(`/subscribes/show?userId=${userId}&subscribableId=${subscribableId}`)
}

export const getOrganizationsUserSubscribe = (options: {
  filterQuery?: string
  limit: number
  page: number
}) => {
  const {filterQuery, limit, page} = options
  return dyaxios.get(
    `/subscribes?is_paginate=${true}&type=${'ORGANIZATION'}&limit=${limit}${
      filterQuery ? `&filterQuery=${filterQuery}&page=${page}` : `&page=${page}`
    }`
  )
}
