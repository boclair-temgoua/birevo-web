import { FC, useEffect, useState } from 'react'
import { HelmetSite } from '../../../utility/commons/helmet-site'
import { useAuth } from '../../auth';
import { ContributorSubscribeTableList } from '../hook/ContributorSubscribeTableList'
import { KTSVG } from '../../../../_metronic/helpers';
import queryString from 'query-string';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getContributorsPaginateSubscribes } from '../../subscribes/api/index';
import { useDebounce } from '../../../utility/commons/useDebounce';
import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
import { EmptyTable } from '../../../utility/commons/EmptyTable';
import { pluralName } from '../../../utility/commons/plural-name';
import { InviteContributorModalForm } from '../hook/InviteContributorModalForm';
import { getOneOrganizationApi } from '../api';
import { PaginationItem } from '../../forms/PaginationItem';
import { BillingBalanceAlert } from '../../billing/hook/BillingBalanceAlert';

const ContributorsTables: FC = () => {
  // eslint-disable-next-line no-restricted-globals
  const { page } = queryString.parse(location.search);
  const userItem = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false)
  const fetchOneOrganization = async () => await getOneOrganizationApi({ organization_uuid: userItem?.organization?.uuid })
  const { data: itemOrganization } = useQuery(['organization'], () => fetchOneOrganization())
  const organization: any = itemOrganization?.data


  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const [pageItem, setPageItem] = useState(Number(page) || 1)
  const [filter, setFilter] = useState<string>('')

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchUserOrg = async (pageItem = 1, debouncedFilter: string) => await
    getContributorsPaginateSubscribes({
      q: debouncedFilter,
      is_paginate: true,
      limit: 10,
      page: Number(pageItem || 1)
    })
  const {
    isLoading,
    isError,
    data,
    isPreviousData,
  } = useQuery(['contributorsOrganizations', pageItem, debouncedFilter], () => fetchUserOrg(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_pages !== pageItem) {
      queryClient.prefetchQuery(['contributorsOrganizations', pageItem + 1], () =>
        fetchUserOrg(pageItem + 1, debouncedFilter)
      )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
    navigate(`/organizations/contributors?${pageItem !== 1 ? `page=${pageItem}` : ''}`)
  }

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.count <= 0) ? (<EmptyTable />) :
        (
          data?.data?.data?.map((item: OneContributorSubscribeResponse, index: number) => (
            <ContributorSubscribeTableList subscribeUserItem={item} key={index} />
          )))

  return (
    <>
      <HelmetSite title={`Contributors - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <BillingBalanceAlert />
      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>{userItem?.id && (`Contributors - ${userItem?.organization?.name}`)}</span>
            <span className='text-muted mt-1 fw-bold fs-7'>Over {organization?.contributorTotal} {pluralName({ lengthItem: organization?.contributorTotal, word: 'members' })} </span>
          </h3>
          {userItem?.role?.name === 'ADMIN' && (
            <div className="d-flex align-items-center py-1">
              <button type='button'
                onClick={() => { setOpenModal(true) }}
                className='btn btn-sm btn-flex btn-light-primary fw-bolder'
              >
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                New Contributor
              </button>
            </div>
          )}
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>

          {/* <div className="alert alert-dismissible bg-success d-flex flex-column flex-sm-row p-5 mb-10">
            <div className="d-flex flex-column text-light pe-0 pe-sm-10">
              <span>The alert component can be used to highlight certain parts of your page for higher content visibility.</span>
            </div>
          </div> */}

          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-150px'>Contributors</th>
                  <th className='min-w-120px'>Role</th>
                  {userItem?.role?.name === 'ADMIN' && (
                    <th className='min-w-100px text-end'>Actions</th>
                  )}
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
      {openModal && (<InviteContributorModalForm organization={organization} setOpenModal={setOpenModal} />)}
    </>
  )
}

export { ContributorsTables }
