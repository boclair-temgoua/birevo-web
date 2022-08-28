import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { ActivityUserPage } from './ActivityUserPage';
import { ProfileSettingsPage } from './ProfileSettingsPage';


const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/account/profile',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Account',
    path: '/account/activity',
    isSeparator: true,
    isActive: false,
  },
]

const AccountUserPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            {/* <AccountHeader /> */}
            <Outlet />
          </>
        }
      >
        <Route
          path='profile'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Account</PageTitle>
              <ProfileSettingsPage />
            </>
          }
        />
        <Route
          path='activity'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Activity</PageTitle>
              <ActivityUserPage />
            </>
          }
        />
        <Route index element={<Navigate to='/account/profile' />} />
      </Route>
    </Routes>
  )
}

export default AccountUserPage
