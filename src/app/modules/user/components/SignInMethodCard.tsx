/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { SignInMethodEmailForm } from '../hook/SignInMethodEmailForm';
import { SignInMethodPasswordChangeForm } from '../hook/SignInMethodPasswordChangeForm';

const SignInMethodCard: FC = () => {

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Sign-in Method</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>

          <SignInMethodEmailForm />

          <div className='separator separator-dashed my-6'></div>

          <SignInMethodPasswordChangeForm />


          <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed p-6'>
            <KTSVG
              path='/media/icons/duotune/general/gen048.svg'
              className='svg-icon-2tx svg-icon-primary me-4'
            />
            <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
              <div className='mb-3 mb-md-0 fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>Secure Your Account</h4>
                <div className='fs-6 text-gray-600 pe-7'>
                  Two-factor authentication adds an extra layer of security to your account. To log
                  in, in addition you'll need to provide a 6 digit code
                </div>
              </div>
              <a
                href='#'
                className='btn btn-primary px-6 align-self-center text-nowrap'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_two_factor_authentication'
              >
                Enable
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SignInMethodCard }
