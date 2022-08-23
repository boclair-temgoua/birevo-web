import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { HelmetSite } from '../../../utility/commons/helmet-site'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPasswordApi } from '../api';
import { TextInput } from '../../forms/TextInput';
import { ResetPasswordModel } from '../core/_models';


const schema = yup
  .object({
    password: yup.string().required().min(8).max(200),
    passwordConfirm: yup.string()
      .required('Password confirmation is required')
      .min(8)
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref('password')], "Password and Confirm Password didn't match"),
      }),
  })
  .required();

export function ResetPassword() {
  const { token } = useParams<string>()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<ResetPasswordModel>({ resolver: yupResolver(schema), mode: "onChange" });


  const onSubmit = async (data: ResetPasswordModel) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload: any = { ...data, token }
    setTimeout(async () => {
      await resetPasswordApi(payload)
        .then((response) => {
          setHasErrors(false);
          setLoading(false)
          navigate(`/login`)

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
      <HelmetSite title={`Reset password`} />
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Reset Password</h1>
          {/* end::Title */}
        </div>

        {/* begin::Title */}
        {hasErrors && (
          <div className='mb-lg-15 alert alert-danger text-center'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Password reset.</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="New Password"
            register={register}
            errors={errors}
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Enter your password"
            validation={{ required: true }}
            isRequired={true}
            required="required"
          />
        </div>
        <div className='fv-row mb-10'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Confirm Password"
            register={register}
            errors={errors}
            name="passwordConfirm"
            type="password"
            autoComplete="off"
            placeholder="Confirm your password"
            validation={{ required: true }}
            isRequired={true}
            required="required"
          />
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            className='btn btn-lg btn-primary fw-bolder'
            disabled={!isDirty || !isValid || loading}
          >
            {!loading && <span className='indicator-label'>Reset password</span>}
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
