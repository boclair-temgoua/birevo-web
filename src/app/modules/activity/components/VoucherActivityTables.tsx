import { FC, useEffect, useState } from 'react'
import { OneActivityResponse } from '../core/_moduls';
import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';
import { useAuth } from '../../auth';
import queryString from 'query-string';
import { useDebounce } from '../../../utility/commons/useDebounce';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getActivitiesVoucher } from '../api/index';
import { EmptyTable } from '../../../utility/commons/EmptyTable';
import { VoucherActivityList } from '../hook/VoucherActivityList';
import { PaginationItem } from '../../forms/PaginationItem';


type Props = {
  className: string
  userItem: any
}

const VoucherActivityTables: React.FC<Props> = ({ className, userItem }) => {
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
      organizationId: userItem?.auth?.organizationId,
      isVoucherFilter: 'true',
      limit: 10,
      page: Number(pageItem || 1),
    })
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useQuery(['voucherActivity', pageItem, debouncedFilter], () => fetchUserOrg(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_pages !== pageItem) {
      queryClient.prefetchQuery
        (['voucherActivity', pageItem + 1], () =>
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
          data?.data?.data?.map((item: any, index: number) => (
            <VoucherActivityList activity={item} key={index} />
          )))

  return (
    <>
      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Last activity voucher</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>Over {userItem?.organizationTotal} organizations</span> */}
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-140px'>Code</th>
                  {/* <th className='min-w-120px'>Status</th> */}
                  <th className='min-w-120px'>Started</th>
                  <th className='min-w-120px'>Expired</th>
                  <th className='min-w-120px'>Amount</th>
                  <th className='min-w-120px'>Percent</th>
                  <th className='min-w-120px'>Date</th>
                  <th className='min-w-120px'></th>
                  <th className='min-w-120px'></th>
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
    </>
  )
}

export { VoucherActivityTables }
