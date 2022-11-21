/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  MixedWidget2,
  MixedWidget10,
  MixedWidget11,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
} from '../../../_metronic/partials/widgets'
import { useAuth } from '../../modules/auth'
import { BillingBalanceAlert } from '../../modules/billing/hook/BillingBalanceAlert'
import { HelmetSite } from '../../utility/commons/helmet-site';

const DashboardPage: FC = () => (
  
  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      {/* <div className='col-xxl-6'>
        <MixedWidget2
          className='card-xl-stretch mb-xl-8'
          chartColor='danger'
          chartHeight='200px'
          strokeColor='#cb1e46'
        />
      </div>
      <div className='col-xxl-6'>
        <ListsWidget5 className='card-xxl-stretch' />
      </div> */}
      {/* <div className='col-xxl-4'>
        <MixedWidget10
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='150px'
        />
        <MixedWidget11
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='175px'
        />
      </div> */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8'>
      {/* <div className='col-xxl-4'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div> */}
      {/* <div className='col-xl-8'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div> */}
      {/* <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' /> */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    {/* <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div> */}
    {/* end::Row */}

    {/* <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-8'>
        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div> */}
  </>
)

const DashboardWrapper: FC = () => {
  const userItem = useAuth()
  const intl = useIntl()
  return (
    <>
      <HelmetSite title={`${intl.formatMessage({id: 'MENU.DASHBOARD'})} - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />

      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      
      <BillingBalanceAlert/>

      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
