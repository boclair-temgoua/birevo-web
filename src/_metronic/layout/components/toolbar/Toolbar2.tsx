import React, { FC, useEffect } from 'react'
import clsx from 'clsx'
import { DefaultTitle } from '../header/page-title/DefaultTitle'
import { useLayout } from '../../core/LayoutProvider';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserNavContributorsSubscribes } from '../../../../app/redux/actions/subscribeAction';
import { useAuth } from '../../../../app/modules/auth';
import { useNavigate } from 'react-router-dom';
import { OneContributorSubscribeResponse } from '../../../../app/modules/subscribes/core/_models';
import { capitalizeFirstLetter } from '../../../../app/utility/commons/capitalize-first-letter';

const Toolbar2: FC = () => {
  const userItem = useAuth();
  const navigate = useNavigate();
  const { classes } = useLayout()

  const userContributors = useSelector((state: any) => state?.subscribes?.contributorSubscribes)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    const loadItems = async () => {
      await dispatch(loadUserNavContributorsSubscribes({ is_paginate: false, limit: 6, page: 1 }))
    }
    loadItems()
  }, [userItem?.organization?.slug])

  const dataItem = userContributors?.length >= 0 ? (
    userContributors?.map((item: OneContributorSubscribeResponse) => (
      <div key={item.id} className="symbol symbol-circle symbol-35px" title={item?.profile?.firstName} data-bs-original-title={item?.profile?.firstName}>
        {item?.profile?.image ? (<img alt={`${item.profile.lastName} ${item?.profile?.firstName}`} src={item?.profile?.image} />) :
          (<div className={`symbol-label bg-light-${item?.profile?.color} text-${item?.profile?.color} fw-bold`}>
            {capitalizeFirstLetter(item?.profile?.firstName, item.profile.lastName)}</div>)}
      </div>
    ))
  ) : (
    <></>
  )

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        <div className="d-flex align-items-center flex-shrink-0 py-3">
          {/* <span className="fs-7 fw-bolder text-gray-700 pe-4">Team:</span> */}
          <div className="symbol-group symbol-hover flex-shrink-0 me-2">
            {dataItem}
              <button onClick={() => navigate(`/organizations/contributors`)} className="btn btn-sm btn-icon">
                <span className="svg-icon svg-icon-2hx svg-icon-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                    <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"></rect>
                    <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                  </svg>
                </span>
              </button>
          </div>
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export { Toolbar2 }
