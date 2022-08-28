import { FC, useEffect, useState } from 'react'
import queryString from 'query-string';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getActivitiesVoucher } from '../activity/api/index';
import { useDebounce } from '../../utility/commons/useDebounce';
import { useAuth } from '../auth';
import { HelmetSite } from '../../utility/commons/helmet-site';
import { EmptyTable } from '../../utility/commons/EmptyTable';
import { OneActivityResponse } from '../activity/core/_moduls';
import { ActivityUserTableList } from './hook/ActivityUserTableList';

const ActivityUserPage: FC = () => {
  // eslint-disable-next-line no-restricted-globals
  const { page } = queryString.parse(location.search);
  const userItem = useAuth();

  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const [pageItem, setPageItem] = useState(Number(page) || 1)
  const [filter, setFilter] = useState<string>('')

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchUserOrg = async (pageItem = 1, debouncedFilter: string) => await
    getActivitiesVoucher({
      q: debouncedFilter,
      organizationId: `${userItem?.organization?.id}`,
      limit: 10,
      page: Number(pageItem || 1)
    })
  const {
    isLoading,
    isError,
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
    navigate(`/account/activity?${pageItem !== 1 ? `page=${pageItem}` : ''}`)
  }

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.count <= 0) ? (<EmptyTable />) :
        (
          data?.data?.data?.map((item: OneActivityResponse, index: number) => (
            <ActivityUserTableList activityItem={item} key={index} />
          )))

  return (
    <>
      <HelmetSite title={`Activities - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>{userItem?.id && (`Activities - ${userItem?.organization?.name}`)}</span>
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
                  <th className='min-w-150px'>Action</th>
                  <th className='min-w-120px'>IP Address</th>
                  <th className='min-w-120px'>Country Code</th>
                  <th className='min-w-120px'>City</th>
                  <th className='min-w-120px'>Creation Date</th>
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
                    <i className="previous"></i>
                  </button>
                </li>
                <li className="page-item active">
                  <button type="button" className="page-link">{pageItem}</button>
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
                    <i className="next"></i>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export { ActivityUserPage }
