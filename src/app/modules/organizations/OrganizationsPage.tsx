import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { ContributorsTables } from './components/ContributorsTables'
import { OrganizationsTables } from './components/OrganizationsTables'

const organizationsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Organizations',
    path: '/organizations/user',
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

const OrganizationsPage = () => (
  <Routes>
    <Route element={<Outlet />}>
    <Route
          path='user'
          element={
            <>
              <PageTitle breadcrumbs={organizationsBreadCrumbs}>Organizations</PageTitle>
              <OrganizationsTables />
            </>
          }
        />
         <Route
          path='contributors'
          element={
            <>
              <PageTitle breadcrumbs={organizationsBreadCrumbs}>Contributors</PageTitle>
              <ContributorsTables />
            </>
          }
        />
      <Route index element={<Navigate to='/organizations/user' />} />
    </Route>
  </Routes>
)

export default OrganizationsPage
