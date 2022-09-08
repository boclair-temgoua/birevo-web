/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HelmetSite } from '../../../utility/commons/helmet-site'
import { TextInput } from '../../forms/TextInput';
import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerApi } from '../api';
import { RegisterModel } from '../core/_models';
import { useIntl } from 'react-intl';
import Toastify from 'toastify-js'
import { toAbsoluteUrl } from '../../../../_metronic/helpers/AssetHelpers';


const schema = yup.object().shape({
  fullName: yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirm: yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  confirm: yup.boolean().oneOf([true], 'Please check the box to deactivate your account').required(),
})


export function Registration() {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const navigate = useNavigate();
  const { register, handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<RegisterModel>({ resolver: yupResolver(schema), mode: "onChange" });

  // Functions
  const onSubmit = async (data: RegisterModel) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload = { ...data }
    await registerApi(payload)
      .then((response) => {
        setHasErrors(false);
        setLoading(false)
        navigate(`/`, { replace: true });

      })
      .catch((error) => {
        setHasErrors(true)
        setLoading(false)
        setHasErrors(error.response.data.message);
        Toastify({
          text: 'An error has occurred.',
          className: 'info',
          gravity: 'bottom', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          style: {
            background: 'linear-gradient(to right, #FF0000, #FF0000)',
          },
        }).showToast()
      });
  };


  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_signup_form'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* begin::Heading */}
        <div className='mb-10 text-center'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Create an Account</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>
            Already have an account?
            <Link to='/forgot-password/new' className='link-primary fw-bolder' style={{ marginLeft: '5px' }}>
              Forgot Password ?
            </Link>
          </div>
          {/* end::Link */}
        </div>
        {/* end::Heading */}

        {/* begin::Action */}
        {/* <button type='button' className='btn btn-light-primary fw-bolder w-100 mb-10'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Sign in with Google
        </button> */}
        {/* end::Action */}

        {/* <div className='d-flex align-items-center mb-10'>
          <div className='border-bottom border-gray-300 mw-50 w-100'></div>
          <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>
          <div className='border-bottom border-gray-300 mw-50 w-100'></div>
        </div> */}

        {/* <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>message</div>
        </div> */}

        {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )}

        {/* begin::Form group Firstname */}
        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="First name"
            register={register}
            errors={errors}
            name="fullName"
            type="text"
            autoComplete="one"
            placeholder="Enter full name"
            validation={{ required: true }}
            required="required"
            isRequired={true}
          />
        </div>
        {/* end::Form group */}

        {/* begin::Form group Email */}
        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Email address"
            register={register}
            errors={errors}
            name="email"
            type="email"
            autoComplete="one"
            placeholder="Enter your email address"
            validation={{ required: true }}
            required="required"
            isRequired={true}
          />
        </div>
        {/* end::Form group */}
        <div className='fv-row mb-5'>
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

        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Confirm password"
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

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='form-check form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              id='confirm'
              {...register('confirm')}
            />
            <label
              className='form-check-label fw-bold text-gray-700 fs-6'
              htmlFor='kt_login_toc_agree'
            >
              I Agree the{' '}
              <Link to='/auth/terms' className='ms-1 link-primary'>
                terms and conditions
              </Link>
              .
            </label>
          </div>
          {errors?.confirm && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{errors.confirm?.message}</div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={!isDirty || !isValid || loading}
          >
            {!loading && <span className='indicator-label'>{intl.formatMessage({ id: 'AUTH.LOGIN.BUTTON' })}</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/login'>
            <button
              type='button'
              id='kt_login_signup_form_cancel_button'
              className='btn btn-lg btn-light-primary w-100 mb-5'
            >
              Login
            </button>
          </Link>
        </div>
        {/* end::Form group */}
      </form>
    </>

  )
}
