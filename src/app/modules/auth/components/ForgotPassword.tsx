import { useState } from 'react'
import { Link } from 'react-router-dom';
import { HelmetSite } from '../../../utility/commons/helmet-site'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { forgotPasswordApi } from '../api';
import { TextInput } from '../../forms/TextInput';
import { ForgotPasswordModel } from '../core/_models';


const schema = yup
  .object({
    email: yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
  })
  .required();

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<ForgotPasswordModel>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = async (data: ForgotPasswordModel) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload = { ...data }
    setTimeout(async () => {
      await forgotPasswordApi(payload)
        .then((response) => {
          setHasErrors(false);
          setLoading(false)
          reset()

        })
        .catch((error) => {
          setHasErrors(true)
          setLoading(false)
          setHasErrors(error.response.data.message);
        });
    }, 1000)

  };

  return (
    <>
      <HelmetSite title={`Forgot password`} />
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Forgot Password ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>Enter your email to reset your password.</div>
          {/* end::Link */}
        </div>

        {hasErrors && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try again.
            </div>
          </div>
        )}


        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Sent password reset. Please check your email</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Email"
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

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <Link to='/login'>
            <button
              type='button'
              className='btn btn-lg btn-light-primary fw-bolder me-4'
            >
              <span className='indicator-label'>Cancel</span>
            </button>
          </Link>
          <button
            type='submit'
            className='btn btn-lg btn-primary fw-bolder'
            disabled={!isDirty || !isValid || loading}
          >
            {!loading && <span className='indicator-label'>Submit</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
