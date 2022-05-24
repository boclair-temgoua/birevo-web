import { useEffect, useState, FC } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom';
import { OneVoucherResponse, VoucherFormRequest, optionsStatusVouchers } from '../core/_moduls';
import { TextInput } from '../../forms/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SelectCurrencyInput, SelectStatusInput } from '../../forms';
import { OneCurrencyResponse } from '../../currency/types/index';
import { loadAllCurrencies } from '../../../redux/actions/currencyAction';
import { TextareaInput } from '../../forms/TextareaInput';
import { createOrUpdateOneCoupon } from '../api/index';


const schemaCreate = yup
  .object({
    email: yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    name: yup.string().min(3, 'Minimum 3 symbols').required(),
    status: yup.string().min(3, 'Minimum 3 symbols').required(),
    currency: yup.string().min(3, 'Minimum 3 symbols').required(),
    amount: yup.number().required(),
    startedAt: yup.date().min(new Date()).required(),
    expiredAt: yup.date().min(yup.ref('startedAt')).required(),
  })
  .required();

const schemaUpdate = yup
  .object({
    email: yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    name: yup.string().min(3, 'Minimum 3 symbols').required(),
    status: yup.string().min(3, 'Minimum 3 symbols').required(),
    currency: yup.string().min(3, 'Minimum 3 symbols').required(),
    amount: yup.number().required(),
  })
  .required();

export const CouponCreateForm: FC<{ voucher: OneVoucherResponse | any }> = ({ voucher }) => {
  const isAddMode = !voucher;
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset,
    setValue,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<VoucherFormRequest>({ resolver: isAddMode ? yupResolver(schemaCreate) : yupResolver(schemaUpdate), mode: "onChange" });

  const currencies: OneCurrencyResponse = useSelector((state: any) => state?.currencies?.currencies)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    const loadItems = async () => {
      await dispatch(loadAllCurrencies())
    }
    loadItems()
  }, [])

  useEffect(() => {
    if (voucher) {
      const fields = ['name', 'description', 'email', 'amount', 'currency', 'status', 'startedAt', 'expiredAt'];
      fields?.forEach((field: any) => setValue(field, voucher[field]));
    }
  }, [voucher]);

  const onSubmit = async (data: VoucherFormRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload = { ...data }
    setTimeout(async () => {
      await createOrUpdateOneCoupon(payload)
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
  }

  return (
    <>
      <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-6">
          <div className="col-md-6 fv-row fv-plugins-icon-container">
            <TextInput
              className="form-control form-control-lg"
              labelFlex="Name"
              register={register}
              errors={errors}
              name="name"
              type="text"
              autoComplete="one"
              placeholder="Enter name"
              validation={{ required: true }}
              required="required"
              isRequired={true}
            />
          </div>
          <div className="col-md-6 fv-row fv-plugins-icon-container">
            <TextInput
              className="form-control form-control-lg"
              labelFlex="Email"
              register={register}
              errors={errors}
              name="email"
              type="email"
              autoComplete="one"
              placeholder="Enter email"
              validation={{ required: true }}
              required="required"
              isRequired={true}
            />
          </div>
        </div>
        <div className="row mb-6">
          <div className="col-md-4 fv-row fv-plugins-icon-container">
            <TextInput
              className="form-control form-control-lg"
              labelFlex="Amount"
              register={register}
              errors={errors}
              name="amount"
              type="number"
              autoComplete="off"
              placeholder="Amount coupon"
              validation={{ required: true }}
              required="required"
              isRequired={true}
            />
          </div>
          <div className="col-md-4 fv-row fv-plugins-icon-container">
            <SelectCurrencyInput
              dataItem={currencies}
              className="form-control form-select select2-hidden-accessible"
              labelFlex="Currency"
              register={register}
              errors={errors}
              name="currency"
              validation={{ required: true }}
              isRequired={true}
              required="required"
            />
          </div>
          <div className="col-md-4 fv-row fv-plugins-icon-container">
            <SelectStatusInput
              dataItem={optionsStatusVouchers}
              className="form-control form-select select2-hidden-accessible"
              labelFlex="Status"
              register={register}
              errors={errors}
              name="status"
              validation={{ required: true }}
              isRequired={true}
              required="required"
            />
          </div>
        </div>
        {isAddMode && (
        <div className="row mb-5">
          <div className="col-md-6 fv-row fv-plugins-icon-container">
            <TextInput
              className="form-control form-control-lg"
              labelFlex="Started date"
              register={register}
              errors={errors}
              name="startedAt"
              type="date"
              autoComplete="one"
              placeholder=""
              validation={{ required: true }}
              required="required"
              isRequired={true}
            />
          </div>
          <div className="col-md-6 fv-row fv-plugins-icon-container">
            <TextInput
              className="form-control form-control-lg"
              labelFlex="Expired date"
              register={register}
              errors={errors}
              name="expiredAt"
              type="date"
              autoComplete="one"
              placeholder=""
              validation={{ required: true }}
              required="required"
              isRequired={true}
            />
          </div>
        </div>)}
        <div className="d-flex flex-column mb-8">
          <TextareaInput
            label="Description"
            className="form-control"
            register={register}
            errors={errors}
            name="description"
            placeholder="Description coupon"
            validation={{ required: true }}
          />
        </div>
        <div className="text-center">
          <button type="button" onClick={() => { navigate('/vouchers/coupons') }} className="btn btn-light me-3">Cancel</button>
          <button type='submit' className='btn btn-lg btn-primary fw-bolder'
            disabled={!isDirty || !isValid || isSubmitted}
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
        <div>
        </div>
      </form>
    </>
  )
}
