/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateEmailRequest } from '../core/_models';
import { TextInput } from '../../forms/TextInput';
import { useIntl } from 'react-intl';
import Toastify from 'toastify-js';
import { updateEmailToUser } from '../api';
import { useAuth } from '../../auth';

const schema = yup.object().shape({
  newEmail: yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  passwordConfirm: yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const SignInMethodEmailForm: React.FC = () => {
  const intl = useIntl()
  const userItem = useAuth();
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const [showForm, setShowForm] = useState<boolean>(false)
  const { register, handleSubmit,
    formState: { errors, isValid }
  } = useForm<UpdateEmailRequest>({ resolver: yupResolver(schema), mode: "onChange" });


  const onSubmit = async (data: UpdateEmailRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload = { ...data }
    await updateEmailToUser(payload)
      .then((response) => {
        setHasErrors(false);
        setLoading(false)
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
      <div className='d-flex flex-wrap align-items-center'>
        <div id='kt_signin_email' className={' ' + (showForm && 'd-none')}>
          <div className='fs-6 fw-bolder mb-1'>Email Address</div>
          <div className='fw-bold text-gray-600'>{userItem?.email}</div>
        </div>

        <div
          id='kt_signin_email_edit'
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
            id='kt_signin_change_email'
            className='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='row mb-6'>
              <div className='col-lg-6 mb-4 mb-lg-0'>
                <div className='fv-row mb-0'>
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Enter New Email Address"
                    register={register}
                    errors={errors}
                    name="newEmail"
                    type="email"
                    autoComplete="off"
                    placeholder="Email Address"
                    validation={{ required: true }}
                    required="required"
                    isRequired={true}
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Confirm Password"
                    register={register}
                    errors={errors}
                    name="passwordConfirm"
                    type="password"
                    autoComplete="off"
                    placeholder={intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
                    validation={{ required: true }}
                    isRequired={true}
                    required="required"
                  />
                </div>
              </div>
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

        <div id='kt_signin_email_button' className={'ms-auto ' + (showForm && 'd-none')}>
          <button
            onClick={() => {
              setShowForm(true)
            }}
            className='btn btn-light btn-active-light-primary'
          >
            Change Email
          </button>
        </div>
      </div>
    </>
  )
}

export { SignInMethodEmailForm }
