/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getBillings } from '../api';
import { useDebounce } from '../../../utility/commons/useDebounce';
import queryString from 'query-string';
import { EmptyTable } from '../../../utility/commons/EmptyTable';
import { BillingTableList } from '../hook/BillingTableList';
import { PaginationItem } from '../../forms/PaginationItem';

type Props = {
  className: string
}

const BillingTables: React.FC<Props> = ({ className }) => {
  // eslint-disable-next-line no-restricted-globals
  const { page } = queryString.parse(location.search);
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const [pageItem, setPageItem] = useState(Number(page) || 1)
  const [filter, setFilter] = useState<string>('')

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchDataItems = async (pageItem = 1, debouncedFilter: string) => await
    getBillings({
      limit: 13,
      sort: 'DESC',
      page: Number(pageItem || 1)
    })
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useQuery(['billings', pageItem, debouncedFilter], () => fetchDataItems(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_pages !== pageItem) {
      queryClient.prefetchQuery(['billings', pageItem + 1], () =>
        fetchDataItems(pageItem + 1, debouncedFilter)
      )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
    navigate(`/account/billing?${pageItem !== 1 ? `page=${pageItem}` : ''}`)
  }

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.count <= 0) ? (<EmptyTable />) :
        (
          data?.data?.data?.map((item: any, index: number) => (
            <BillingTableList billing={item} key={index} />
          )))

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Billing history</span>
          {/* <span className='text-muted mt-1 fw-bold fs-7'>Over 500 orders</span> */}
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
                <th className='min-w-140px'>Description</th>
                <th className='min-w-120px'>Amount</th>
                <th className='min-w-120px'>Date</th>
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

export { BillingTables }
