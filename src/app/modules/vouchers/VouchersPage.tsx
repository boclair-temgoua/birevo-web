import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { CouponCreateOrUpdate } from './components/CouponCreateOrUpdate'
import { CouponsTables } from './components/CouponsTables'
import { VouchersTables } from './components/VouchersTables'
// import { ContributorsTables } from './components/ContributorsTables'
// import { OrganizationsTables } from './components/OrganizationsTables'

const vouchersBreadCrumbs: Array<PageLink> = [
  {
    title: 'Vouchers',
    path: '/vouchers/coupons',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const VouchersPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path='coupons'
        element={
          <>
            <PageTitle breadcrumbs={vouchersBreadCrumbs}>Coupons</PageTitle>
            <CouponsTables />
          </>
        }
      />

      <Route
        path='vouchers'
        element={
          <>
            <PageTitle breadcrumbs={vouchersBreadCrumbs}>Vouchers</PageTitle>
            <VouchersTables />
          </>
        }
      />
      <Route
        path='coupons/create'
        element={
          <>
            <PageTitle breadcrumbs={vouchersBreadCrumbs}>Coupon create</PageTitle>
            <CouponCreateOrUpdate />
          </>
        }
      />
      <Route
        path='coupons/:voucher_code/edit'
        element={
          <>
            <PageTitle breadcrumbs={vouchersBreadCrumbs}>Coupon edit</PageTitle>
            <CouponCreateOrUpdate />
          </>
        }
      />
      {/* <Route
        path='horizontal'
        element={
          <>
            <PageTitle breadcrumbs={wizardsBreadCrumbs}>Horizontal</PageTitle>
            <Horizontal />
          </>
        }
      />
      <Route
        path='vertical'
        element={
          <>
            <PageTitle breadcrumbs={wizardsBreadCrumbs}>Vertical</PageTitle>
            <Vertical />
          </>
        }
      /> */}
      <Route index element={<Navigate to='/vouchers/coupons' />} />
    </Route>
  </Routes>
)

export default VouchersPage
