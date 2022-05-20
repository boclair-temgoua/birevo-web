/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { HelmetSite } from '../../../utility/commons/helmet-site'
import { TextInput } from '../../forms/TextInput';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginApi } from '../api';
import jwt_decode from 'jwt-decode';
import { LoginModel } from '../core/_models';
import { useIntl } from 'react-intl';

const schema = yup
  .object({
    username: yup.string().min(3, 'Minimum 3 symbols').required(),
    password: yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
  })
  .required();

export function Login() {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<LoginModel>({ resolver: yupResolver(schema), mode: "onChange" });

  // Functions
  const onSubmit = async (data: LoginModel) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload = { ...data }
    await loginApi(payload)
      .then((response) => {
        setHasErrors(false);
        setLoading(false)
        dispatch({
          type: '/login',
          payload: response.data,
        });
        const user: any = jwt_decode(response.data)
        if (user?.noHashPassword) {
          // navigate(`/change_password/${user?.token}`);
        } else {
          localStorage.setItem(
            String(process.env.REACT_APP_BASE_NAME_TOKEN),
            JSON.stringify(response.data)
          );
          navigate(`/`,{ replace: true });
          window.location.reload();
        }

      })
      .catch((error) => {
        setHasErrors(true)
        setLoading(false)
        setHasErrors(error.response.data.message);
      });
  };

  return (
    <>
      <HelmetSite title={`Sign in to your account`} />
      <form
        className='form w-100'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Sign In to {process.env.REACT_APP_NAME}</h1>
          <div className='text-gray-400 fw-bold fs-4'>
            New Here?{' '}
            <Link to='/registration' className='link-primary fw-bolder'>
              Create an Account
            </Link>
          </div>
        </div>
        {/* begin::Heading */}

        {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Username"
            register={register}
            errors={errors}
            name="username"
            type="text"
            autoComplete="one"
            placeholder="Enter your username"
            validation={{ required: true }}
            required="required"
            isRequired={true}
          />
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Password"
            register={register}
            errors={errors}
            name="password"
            type="password"
            autoComplete="off"
            placeholder={intl.formatMessage({id: 'AUTH.INPUT.PASSWORD'})}
            validation={{ required: true }}
            isRequired={true}
            required="required"
          />
          <div className="d-flex flex-stack mb-2">
            <label className="form-label fw-bolder text-dark fs-6 mb-0"></label>
            <Link to={`/forgot-password/new`} className="link-primary fs-6 fw-bolder">Forgot Password ?</Link>
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={!isDirty || !isValid}
          >
            {!loading && <span className='indicator-label'>{intl.formatMessage({id: 'AUTH.LOGIN.BUTTON'})}</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>

          {/* begin::Separator */}
          <div className='text-center text-muted text-uppercase fw-bolder mb-5'>{intl.formatMessage({id: 'AUTH.GENERAL.OR'})}</div>
          {/* end::Separator */}

          {/* begin::Google link */}
          <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
              className='h-20px me-3'
            />
            Continue with Google
          </a>
          {/* end::Google link */}

          {/* begin::Google link */}
          <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
              className='h-20px me-3'
            />
            Continue with Facebook
          </a>
          {/* end::Google link */}
        </div>
        {/* end::Action */}
      </form>
    </>
  )
}
