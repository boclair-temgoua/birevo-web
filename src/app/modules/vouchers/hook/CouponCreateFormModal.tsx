import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { OneVoucherResponse, VoucherFormRequest, optionsStatusVouchers } from '../core/_moduls';
import { TextInput } from '../../forms/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SelectCurrencyInput } from '../../forms/SelectCurrencyInput';
import { OneCurrencyResponse } from '../../currency/types/index';
import { loadAllCurrencies } from '../../../redux/actions/currencyAction';
import { TextareaInput } from '../../forms/TextareaInput';
import { createOrUpdateOneCoupon } from '../api/index';
import { SelectStatusInput } from '../../forms/SelectStatusInput';

interface Props {
  setOpenModal: any,
  voucherItem?: OneVoucherResponse | any
}

const schema = yup
  .object({
    email: yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    name: yup.string().min(3, 'Minimum 3 symbols').required(),
    currency: yup.string().min(3, 'Minimum 3 symbols').required(),
    amount: yup.number().required(),
    startedAt: yup.date().min(new Date()).required(),
    expiredAt: yup.date().min(yup.ref('startedAt')).required(),
  })
  .required();

export const CouponCreateFormModal: React.FC<Props> = ({ setOpenModal, voucherItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset, setValue,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<VoucherFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });

  const currencies: OneCurrencyResponse = useSelector((state: any) => state?.currencies?.currencies)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    const loadItems = async () => {
      await dispatch(loadAllCurrencies())
    }
    loadItems()
  }, [])

  useEffect(() => {
    if (voucherItem) {
      const fields = ['name', 'description', 'email', 'amount', 'currency', 'status', 'startedAt', 'expiredAt'];
      fields?.forEach((field: any) => setValue(field, voucherItem[field]));
    }
  }, [voucherItem]);

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
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-750px modal-dialog-scrollable'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div onClick={() => { setOpenModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <div className="mb-13 text-center">
                <h1 className="mb-3">Create New Coupon {voucherItem?.code}</h1>
              </div>
              {/* <UserEditModalFormWrapper /> */}
              <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-6">
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
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
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
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
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Expired date"
                      register={register}
                      errors={errors}
                      name="expiredAt"
                      type="date"
                      autoComplete="one"
                      placeholder=""
                      validation={{ required: false }}
                      isRequired={false}
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
                  <button type="button" className="btn btn-light me-3">Cancel</button>
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
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}
