/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import {
  TablesWidget5,
} from '../../../_metronic/partials/widgets'
import { ApplicationCreateOrUpdateFormModal } from './hook/ApplicationCreateOrUpdateFormModal'
import queryString from 'query-string';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../utility/commons/useDebounce';
import { getApplications } from './api/index';
import { EmptyTable } from '../../utility/commons/EmptyTable';
import { ApplicationTableList } from './hook/ApplicationTableList'
import { OneApplicationResponse } from './core/_moduls';
import { useAuth } from '../auth'
import { HelmetSite } from '../../utility/commons/helmet-site';


const ApplicationIndex: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const intl = useIntl()
  const userItem = useAuth();
  // eslint-disable-next-line no-restricted-globals
  const { page } = queryString.parse(location.search);
  const queryClient = useQueryClient()
  const [pageItem, setPageItem] = useState(Number(page) || 1)
  const [filter, setFilter] = useState<string>('')

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchUserOrg = async (pageItem = 1, debouncedFilter: string) => await
    getApplications({
      filterQuery: debouncedFilter,
      limit: 10,
      page: Number(pageItem || 1)
    })
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useQuery(['applications', pageItem, debouncedFilter], () => fetchUserOrg(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_pages !== pageItem) {
      queryClient.prefetchQuery
        (['applications', pageItem + 1], () =>
          fetchUserOrg(pageItem + 1, debouncedFilter)
        )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
  }

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><>Error: {error}</></tr>) :
      (data?.data?.count <= 0) ? (<EmptyTable />) :
        (
          data?.data?.data?.map((item: OneApplicationResponse, index: number) => (
            <ApplicationTableList item={item} key={index} />
          )))

  return (
    <>
      <HelmetSite title={`Application - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.APPS' })}</PageTitle>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Applications - {userItem?.organization?.name}</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>Over {userItem?.organizationTotal} organizations</span> */}
          </h3>
          <div className="d-flex align-items-center py-1">
            <button type='button'
              onClick={() => { setOpenModal(true) }}
              className='btn btn-sm btn-flex btn-light-primary fw-bolder'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Create Api Key
            </button>
          </div>
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
                  <th className='min-w-140px'>Name</th>
                  <th className='min-w-120px'>Date Creation</th>
                  <th className='min-w-120px'>Status</th>
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
          <div className="separator"></div>
          <br />
          {data?.data?.count > 0 && (
            <div className="d-flex flex-center mb-0">
              <ul className="pagination">
                <li className={`page-item previous ${(isPreviousData || pageItem <= 1) && ('disabled')}`}>
                  <button type="button"
                    onClick={() => {
                      setPageItem(old => Math.max(old - 1, 1))
                      paginate(pageItem - 1)
                    }}
                    className="page-link" >
                    <i className="previous"></i><span className="page-link">Previous</span>
                  </button>
                </li>
                <li className="page-item active">
                  <a href={void (0)} className="page-link">{pageItem}</a>
                </li>
                <li className={`page-item next ${(!isPreviousData && data?.data?.total_pages === pageItem) && ('disabled')}`}>
                  <button type="button"
                    onClick={() => {
                      if (!isPreviousData && data?.data?.total_pages !== pageItem) {
                        setPageItem(old => old + 1)
                        paginate(pageItem + 1)
                      }
                    }}
                    className="page-link" >
                    <span className="page-link">Next</span><i className="next"></i>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* begin::Body */}
      </div>
      {openModal && (<ApplicationCreateOrUpdateFormModal setOpenModal={setOpenModal} />)}
    </>
  )
}

export { ApplicationIndex }
