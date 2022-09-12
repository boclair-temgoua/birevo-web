/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../../utility/commons/useDebounce';
import queryString from 'query-string';
import { getActivitiesVoucher } from '../api/index';
import { EmptyTable } from '../../../utility/commons/EmptyTable';
import { ActivityTableList } from './ActivityTableList';
import { OneActivityResponse } from '../core/_moduls';
import { PaginationItem } from '../../forms/PaginationItem';

type Props = {
  voucherUuid: string | any;
  className: string
}

const ActivityTable: React.FC<Props> = ({ className, voucherUuid }) => {
  // eslint-disable-next-line no-restricted-globals
  const { page } = queryString.parse(location.search);
  const queryClient = useQueryClient()
  const [pageItem, setPageItem] = useState(Number(page) || 1)
  const [filter, setFilter] = useState<string>('')

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchUserOrg = async (pageItem = 1, debouncedFilter: string) => await
    getActivitiesVoucher({
      q: debouncedFilter,
      voucher_uuid: voucherUuid,
      limit: 10,
      page: Number(pageItem || 1)
    })
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useQuery(['activities', pageItem, debouncedFilter], () => fetchUserOrg(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_pages !== pageItem) {
      queryClient.prefetchQuery(['activities', pageItem + 1], () =>
        fetchUserOrg(pageItem + 1, debouncedFilter)
      )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
  }

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.count <= 0) ? (<EmptyTable />) :
        (
          data?.data?.data?.map((item: OneActivityResponse, index: number) => (
            <ActivityTableList item={item} key={index} />
          )))

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Activity history</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-150px'>Action</th>
                <th className='min-w-120px'>IP Address</th>
                <th className='min-w-120px'>Country Code</th>
                <th className='min-w-120px'>City</th>
                <th className='min-w-120px'>Creation Date</th>
                {/* <th className='min-w-120px'>Source</th> */}
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {dataTable}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
        <PaginationItem
            data={data}
            setPageItem={setPageItem}
            setPreviewPageItem={(old: number) => Math.max(old - 1, 1)}
            setNextPageItem={(old: number) => old + 1}
            paginate={paginate}
            isPreviousData={isPreviousData}
            pageItem={pageItem}
          />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export { ActivityTable }
