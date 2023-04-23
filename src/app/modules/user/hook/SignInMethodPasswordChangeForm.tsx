/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdatePasswordRequest } from '../core/_models';
import { TextInput } from '../../forms/TextInput';
import { useIntl } from 'react-intl';
import Toastify from 'toastify-js';
import { updatePasswordToUser } from '../api';

const schema = yup.object().shape({
  password: yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(100, 'Maximum 100 symbols')
    .required('Password is required'),
  newPassword: yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(100, 'Maximum 100 symbols')
    .required('Password is required'),
  passwordConfirm: yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(100, 'Maximum 100 symbols')
    .required('Password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

const SignInMethodPasswordChangeForm: React.FC = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const [showForm, setShowForm] = useState<boolean>(false)
  const { register, handleSubmit, reset,
    formState: { errors, isValid }
  } = useForm<UpdatePasswordRequest>({ resolver: yupResolver(schema), mode: "onChange" });


  const onSubmit = async (data: UpdatePasswordRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload = { ...data }
    await updatePasswordToUser(payload)
      .then((response) => {
        setHasErrors(false);
        setLoading(false)
        reset()
        setShowForm(false)
        Toastify({
          text: 'Information save successfully.',
          className: 'info',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            background: 'linear-gradient(to right, #3CB371, #3CB371)',
          },
        }).showToast()
      })
      .catch((error) => {
        setHasErrors(true)
        setLoading(false)
        setHasErrors(error.response.data.message);
        Toastify({
          text: 'An error has occurred.',
          className: 'info',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            background: 'linear-gradient(to right, #FF0000, #FF0000)',
          },
        }).showToast()
      });
  };



  return (
    <>
      <div className='d-flex flex-wrap align-items-center mb-10'>
        <div id='kt_signin_password' className={' ' + (showForm && 'd-none')}>
          <div className='fs-6 fw-bolder mb-1'>Password</div>
          <div className='fw-bold text-gray-600'>************</div>
        </div>

        <div
          id='kt_signin_password_edit'
          className={'flex-row-fluid ' + (!showForm && 'd-none')}
        >
          {hasErrors && (
            <div className="text-center alert alert-danger">
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-danger">Error</h4>
                <span>{hasErrors}</span>
              </div>
            </div>
          )}

          <form
            id='kt_signin_change_password'
            className='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='row mb-1'>
              <div className='col-lg-4'>
                <div className='fv-row mb-0'>
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Password"
                    register={register}
                    errors={errors}
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder={intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
                    validation={{ required: true }}
                    isRequired={true}
                    required="required"
                  />
                </div>
              </div>

              <div className='col-lg-4'>
                <div className='fv-row mb-0'>
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="New Password"
                    register={register}
                    errors={errors}
                    name="newPassword"
                    type="password"
                    autoComplete="off"
                    placeholder="New password"
                    validation={{ required: true }}
                    isRequired={true}
                    required="required"
                  />
                </div>
              </div>

              <div className='col-lg-4'>
                <div className='fv-row mb-0'>
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Confirm New Password"
                    register={register}
                    errors={errors}
                    name="passwordConfirm"
                    type="password"
                    autoComplete="off"
                    placeholder=" Confirm Password"
                    validation={{ required: true }}
                    isRequired={true}
                    required="required"
                  />
                </div>
              </div>
            </div>

            <div className='form-text mb-5'>
              Password must be at least 8 character and contain symbols
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button id='kt_password_cancel' type='button'
                className='btn btn-white btn-active-light-primary me-2'
                onClick={() => { setShowForm(false) }}>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary me-2' disabled={!isValid || loading}>
                {!loading && 'Save Changes'}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        <div
          id='kt_signin_password_button'
          className={'ms-auto ' + (showForm && 'd-none')}
        >
          <button
            onClick={() => {
              setShowForm(true)
            }}
            className='btn btn-light btn-active-light-primary'
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  )
}

export { SignInMethodPasswordChangeForm }
