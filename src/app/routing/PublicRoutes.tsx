import { useEffect } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { Login } from '../modules/auth/components/Login'
import { Registration } from '../modules/auth/components/Registration'
import { ForgotPassword } from '../modules/auth/components/ForgotPassword'
import { ResetPassword } from '../modules/auth/components/ResetPassword'
import { toAbsoluteUrl } from '../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        {/* <a href='#' className='mb-12'>
          <img alt='Logo' src="" className='h-45px' />
        </a> */}
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}

const PublicRoutes = () => {

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/*' element={<Navigate to='/login' />} />
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='forgot-password/new' element={<ForgotPassword />} />
          <Route path='reset-password/:token' element={<ResetPassword />} />
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export { PublicRoutes }
