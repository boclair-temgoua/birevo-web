import { FC, useEffect, useState } from 'react'
import { HelmetSite } from '../../../utility/commons/helmet-site'
import { useAuth } from '../../auth';
import { KTSVG } from '../../../../_metronic/helpers';
import queryString from 'query-string';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utility/commons/useDebounce';
// import { OrganizationSubscribeTable } from '../hook/OrganizationSubscribeTable';
import { EmptyTable } from '../../../utility/commons/EmptyTable';
import { getVouchers } from '../api';
import { OneVoucherResponse } from '../core/_moduls';
import { CouponVoucherTableList } from '../hook/CouponVoucherTableList';
import { SearchInput } from '../../forms/SearchInput';
import { CouponCreateFormModal } from '../hook/CouponCreateFormModal';
import { DownloadVoucherModal } from '../hook/DownloadVoucherModal';
import { PaginationItem } from '../../forms/PaginationItem';
import { BillingBalanceAlert } from '../../billing/hook/BillingBalanceAlert';

const CouponsTables: FC = () => {
  const navigate = useNavigate();
  const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
  const [openDownloadExcelModal, setOpenDownloadExcelModal] = useState<boolean>(false)
  // eslint-disable-next-line no-restricted-globals
  const { page } = queryString.parse(location.search);
  const queryClient = useQueryClient()
  const [pageItem, setPageItem] = useState(Number(page) || 1)
  const [filter, setFilter] = useState<string>('')
  const userItem = useAuth();

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchUserOrg = async (pageItem = 1, debouncedFilter: string) => await
    getVouchers({
      q: debouncedFilter,
      type: 'COUPON',
      limit: 13,
      page: Number(pageItem || 1),
      sort: 'DESC'
    })
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useQuery(['voucherCoupons', pageItem, debouncedFilter], () => fetchUserOrg(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_pages !== pageItem) {
      queryClient.prefetchQuery
        (['voucherCoupons', pageItem + 1], () =>
          fetchUserOrg(pageItem + 1, debouncedFilter)
        )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
    // navigate(`/vouchers/coupons?${pageItem !== 1 ? `page=${pageItem}` : ''}`)
  }

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.count <= 0) ? (<EmptyTable />) :
        (
          data?.data?.data?.map((item: OneVoucherResponse, index: number) => (
            <CouponVoucherTableList voucher={item} key={index} />
          )))

  return (
    <>
      <HelmetSite title={`Coupons - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <BillingBalanceAlert />

      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>{userItem?.id && (`Coupons - ${userItem?.organization?.name}`)}</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>Over {userItem?.organizationTotal} organizations</span> */}
          </h3>
          <div className="d-flex align-items-center py-1">
            <button type='button'
              onClick={() => { setOpenCreateOrUpdateModal(true) }}
              className="btn btn-sm btn-flex btn-light-primary fw-bolder me-3">
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Create coupon
            </button>
            <button type='button'
              onClick={() => { setOpenDownloadExcelModal(true) }}
              className="btn btn-sm btn-flex btn-light-primary fw-bolder">
              <KTSVG path='/media/icons/duotune/arrows/arr091.svg' className='svg-icon-3' />
              Download Excel
            </button>
          </div>
        </div>

        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <div className='w-100 position-relative'>
            <SearchInput className='form-control form-control-solid px-15'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)}
              placeholder='Search by code or amount...' />
          </div>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-140px'>Code</th>
                  <th className='min-w-120px'>Status</th>
                  <th className='min-w-120px'>Started</th>
                  <th className='min-w-120px'>Expired</th>
                  <th className='min-w-120px'>Amount</th>
                  <th className='min-w-120px'>Percent</th>
                  <th className='min-w-120px'>Date creation</th>
                  <th className='min-w-100px text-end'>Actions</th>
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
      {openCreateOrUpdateModal && (<CouponCreateFormModal setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
      {openDownloadExcelModal && (<DownloadVoucherModal setOpenDownloadExcelModal={setOpenDownloadExcelModal} userItem={userItem} voucherType={'COUPON'} />)}
    </>
  )
}

export { CouponsTables }
