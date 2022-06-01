/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import { useAuth } from '../auth'
import { HelmetSite } from '../../utility/commons/helmet-site'
import { BillingTable } from './hook/BillingTable'


const BillingIndex: FC = () => {
  const userItem = useAuth();
  const intl = useIntl()
  
  return (
    <>
      <HelmetSite title={`Billing - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <PageTitle breadcrumbs={[]}>Billing</PageTitle>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Billing - {userItem?.organization?.name}</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>Over {userItem?.organizationTotal} organizations</span> */}
          </h3>
          <div className="d-flex align-items-center py-1">
            <button type='button'
              className='btn btn-sm btn-flex btn-light-primary fw-bolder'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Make a payment
            </button>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          
        </div>
        {/* begin::Body */}
      </div>
      <BillingTable className='mb-5 mb-xl-8' />
    </>
  )
}

export { BillingIndex }
