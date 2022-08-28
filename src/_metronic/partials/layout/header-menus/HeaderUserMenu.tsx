// /* eslint-disable jsx-a11y/anchor-is-valid */
// import {FC} from 'react'
// import {Link} from 'react-router-dom'
// import {useAuth} from '../../../../app/modules/auth'
// import {Languages} from './Languages'
// import {toAbsoluteUrl} from '../../../helpers'
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Languages } from './Languages'
import { useAuth } from '../../../../app/modules/auth'
import { capitalizeOneFirstLetter } from '../../../../app/utility/commons/capitalize-first-letter'
import { useSelector, useDispatch } from 'react-redux';
import { loadOrganizationsUserSubscribes } from '../../../../app/redux/actions/subscribeAction'
import { OneSubscribeResponse } from '../../../../app/modules/subscribes/core/_models'
import { updateOrganizationToUser } from '../../../../app/modules/user/api';
import { toAbsoluteUrl } from '../../../helpers';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getOrganizationsUserSubscribe } from '../../../../app/modules/subscribes/api/index';

const HeaderUserMenu: FC = () => {
  const userItem = useAuth();
  const navigate = useNavigate();
  const fetchUserOrg = async () => await
    getOrganizationsUserSubscribe({ limit: 10, page: 1 })
  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery(['organizations'], () => fetchUserOrg(), {
    refetchOnWindowFocus: false
  })

  const joinOrganization = async (subscribe: OneSubscribeResponse) => {
    try {
      const { data } = await updateOrganizationToUser({ organizationId: subscribe?.organization?.id });
      if (data) { navigate(`/dashboard`, { replace: true }); }
      window.location.reload();
      return data;
    } catch (error) {
      throw error;
    } finally {
      console.log('--release ---');
    }
  }

  const signOut = () => {
    localStorage.removeItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))
    navigate(`/login`, { replace: true });
    window.location.reload();
  }

  const dataTable = isLoading ? (<>Loading ...</>) :
    isError ? (<strong>Error find data please try again...</strong>) :
      (data?.data?.count <= 0) ? ('') :
        (
          data?.data?.data?.map((subscribe: OneSubscribeResponse, index: number) => (
            <a key={index} href={void (0)} style={{ cursor: 'pointer' }} onClick={() => { joinOrganization(subscribe) }} className='menu-link px-5'>
              {subscribe?.organization?.name}
            </a>
          )))

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <div className="cursor-pointer symbol symbol-40px symbol-md-40px">
              <span className={`symbol-label bg-light-${userItem?.organization?.color} text-${userItem?.organization?.color} fw-bold`}>
                {capitalizeOneFirstLetter(userItem?.organization?.name)}</span>
            </div>
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {userItem?.profile?.firstName} {userItem?.profile?.lastName}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {userItem?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          Profile
        </Link>
      </div>

      {/* <div className='menu-item px-5'>
      <a href='#' className='menu-link px-5'>
        <span className='menu-text'>My Projects</span>
        <span className='menu-badge'>
          <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>3</span>
        </span>
      </a>
    </div> */}

      <div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom'
      >

        <a href='#' className='menu-link px-5'>
          <span className='menu-title'>Organizations</span>
          <span className='menu-badge'>
            <span className='badge badge-light-primary badge-circle fw-bolder fs-7'>{data?.data?.count}</span>
          </span>
          <span className='menu-arrow'></span>

        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>

            {dataTable}

          </div>

          {/* <div className='menu-item px-3'>
          <a href='#' className='menu-link d-flex flex-stack px-5'>
            Statements
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='View your statements'
            ></i>
          </a>
        </div> */}

          {/* <div className='separator my-2'></div>

        <div className='menu-item px-3'>
          <div className='menu-content px-3'>
            <label className='form-check form-switch form-check-custom form-check-solid'>
              <input
                className='form-check-input w-30px h-20px'
                type='checkbox'
                value='1'
                defaultChecked={true}
                name='notifications'
              />
              <span className='form-check-label text-muted fs-7'>Notifications</span>
            </label>
          </div>
        </div> */}
        </div>
      </div>

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <Link to='/account/profile' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a href={void (0)} onClick={() => { signOut() }} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
