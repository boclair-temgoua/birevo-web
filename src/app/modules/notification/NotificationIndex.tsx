/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import { useAuth } from '../auth'
import { HelmetSite } from '../../utility/commons/helmet-site'
import { NotificationTableList } from './hook/NotificationTableList'


const NotificationIndex: FC = () => {
  const userItem = useAuth();
  const intl = useIntl()

  return (
    <>
      <HelmetSite title={`Notifications - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Notifications - {userItem?.organization?.name}</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>Over {userItem?.organizationTotal} organizations</span> */}
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
                  <th className='min-w-150px'>Subject</th>
                  <th className='min-w-140px'>Date</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <td>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href={void (0)} className='text-dark fw-bolder text-hover-primary fs-6'>
                        By default, jest tries to parse css imports
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        By default, jest tries to parse css imports as JavaScript. In order to ignore all things css, some extra...
                      </span>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                      05/28/2020
                    </a>
                  </td>
                  <td className='text-end'>
                    <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                      <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                    </a>
                  </td>
                </tr>
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export { NotificationIndex }
