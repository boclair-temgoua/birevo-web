import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { ApplicationIndex } from '../modules/applications/ApplicationIndex'
import { BillingIndex } from '../modules/billing/BillingIndex'
import { NotificationIndex } from '../modules/notification/NotificationIndex'
import { VoucherActivityShow } from '../modules/activity/VoucherActivityShow'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const OrganizationsPage = lazy(() => import('../modules/organizations/OrganizationsPage'))
  const VouchersPage = lazy(() => import('../modules/vouchers/VouchersPage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  type Props = {
    children?: React.ReactNode
  }

  const SuspensedView: FC<Props> = ({ children }) => {
    const baseColor = getCSSVariableValue('--bs-primary')
    TopBarProgress.config({
      barColors: {
        '0': baseColor,
      },
      barThickness: 1,
      shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
  }

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='applications' element={<ApplicationIndex />} />
        <Route path='activities/:voucher_uuid' element={<VoucherActivityShow />} />
        <Route path='account/billing' element={<BillingIndex />} />
        <Route path='notifications' element={<NotificationIndex />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='organizations/*'
          element={
            <SuspensedView>
              <OrganizationsPage />
            </SuspensedView>
          }
        />
        <Route
          path='vouchers/*'
          element={
            <SuspensedView>
              <VouchersPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export { PrivateRoutes }
