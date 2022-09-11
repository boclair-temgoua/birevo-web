import { useState } from 'react'
import { TextInput } from '../../../forms/TextInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CouponPayFormRequest, CreateCouponBillingMutation } from '../../core/_moduls';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    code: yup.string().min(3, 'Minimum 3 symbols').required(),
  })
  .required();

export const CreateBillingCoupon: React.FC = ({ }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset, setValue,
    formState: { errors, isDirty, isValid }
  } = useForm<CouponPayFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });


  const saveMutation = CreateCouponBillingMutation({
    onSuccess: (result: any) => {
      setHasErrors(false);
      setLoading(false)
      if (result?.token) { navigate(`/account/billing/success?token=${result?.token}`, { replace: true }) }
      reset()
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
    }
  });


  const onSubmit = (data: any) => {
    setLoading(true);
    setHasErrors(undefined)
    setTimeout(async () => {
      const payload: CouponPayFormRequest = { ...data, paymentMethod: 'COUPON-PAY' }
      saveMutation.mutateAsync(payload)
    }, 1000)
  };

  return (
    <>
      <div className="mb-10 fv-row" id="kt_ecommerce_add_product_discount_fixed">
        {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )}
        <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Coupon code"
            register={register}
            errors={errors}
            name="code"
            type="text"
            autoComplete="off"
            placeholder="Enter code coupon"
            validation={{ required: true }}
            required="required"
            isRequired={true}
          />
          <div className="text-muted fs-7">Set the discounted product price. The product will be reduced at the determined fixed price</div>

          {/* begin::Action */}
          <div className='text-center'>
            <button
              type='submit'
              className='btn btn-lg btn-primary w-100 mb-5'
              disabled={!isDirty || !isValid || loading}
            >
              {!loading && <span className='indicator-label'>Submit Payment</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            {/* end::Google link */}
          </div>
          {/* end::Action */}
        </form>

      </div>

    </>
  )
}
