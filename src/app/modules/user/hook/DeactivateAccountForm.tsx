/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as yup from 'yup'
import { KTSVG } from '../../../../_metronic/helpers'
import { DeactivateAccountRequest } from '../core/_models'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../auth'
import Toastify from 'toastify-js';
import { deactivateProfileToUser } from '../api'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  confirm: yup.boolean().oneOf([true], 'Please check the box to deactivate your account').required(),
})

const DeactivateAccountForm: React.FC = () => {
  const navigate = useNavigate();
  const userItem = useAuth();
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit,
    formState: { errors, isValid }
  } = useForm<DeactivateAccountRequest>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = async (data: DeactivateAccountRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    Swal.fire({
      title: 'Delete ?',
      text: 'Are you sure you want to perform this action?',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-default',
      },
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        const payload = { ...data, user_uuid: userItem?.uuid }
        await deactivateProfileToUser(payload)
          .then(() => {
            setHasErrors(false);
            setLoading(false)
            Toastify({
              text: 'Account deactivate successfully.',
              className: 'info',
              gravity: 'top', // `top` or `bottom`
              position: 'center', // `left`, `center` or `right`
              style: {
                background: 'linear-gradient(to right, #3CB371, #3CB371)',
              },
            }).showToast()
            localStorage.removeItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))
            navigate(`/login`, { replace: true });
            window.location.reload();
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

      }
    });

  };
  return (
    <div className='card'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_deactivate'
        aria-expanded='true'
        aria-controls='kt_account_deactivate'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Delete Account</h3>
        </div>
      </div>

      <div id='kt_account_deactivate' className='collapse show'>
        <form onSubmit={handleSubmit(onSubmit)} id='kt_account_deactivate_form' className='form'>
          <div className='card-body border-top p-9'>
            <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6'>
              <KTSVG
                path='/media/icons/duotune/general/gen044.svg'
                className='svg-icon-2tx svg-icon-warning me-4'
              />

              <div className='d-flex flex-stack flex-grow-1'>
                <div className='fw-bold'>
                  <h4 className='text-gray-800 fw-bolder'>You Are Deleted Your Account</h4>
                  <div className='fs-6 text-gray-600'>
                    Permanently remove your Personal Account and all of its contents from the Vercel platform.
                    This action is not reversible, so please continue with caution.
                  </div>
                </div>
              </div>
            </div>

            <div className='form-check form-check-solid fv-row'>
              <input
                className='form-check-input'
                type='checkbox'
                id='confirm'
                {...register('confirm')}
              />
              <label className='form-check-label fw-bold ps-2 fs-6' htmlFor='deactivate'>
                I confirm my account delete
              </label>
            </div>
            {errors?.confirm && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{errors.confirm?.message}</div>
              </div>
            )}
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              id='kt_account_deactivate_account_submit'
              type='submit'
              className='btn btn-danger fw-bold'
              disabled={!isValid}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { DeactivateAccountForm }
