import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { TextInput } from '../../forms/TextInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CouponPayFormRequest } from '../core/_moduls';
import { createCouponBilling } from '../api';
import Swal from 'sweetalert2';

const schema = yup
  .object({
    code: yup.string().min(3, 'Minimum 3 symbols').required(),
  })
  .required();

export const CreateBillingCoupon: React.FC = ({ }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset, setValue,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<CouponPayFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });




  const onSubmit = (data: CouponPayFormRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload: CouponPayFormRequest = { ...data, paymentMethod: 'COUPON-PAY' }
    setTimeout(async () => {
      await createCouponBilling(payload)
        .then((response) => {
          setHasErrors(false);
          setLoading(false)
          reset()
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Transaction save successfully',
            confirmButtonText: 'Got It',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            showCancelButton: false,
            showClass: {
              popup: 'animate__animated animate__bounceIn',
            },
          })

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
      <div className="mb-10 fv-row" id="kt_ecommerce_add_product_discount_fixed">
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
