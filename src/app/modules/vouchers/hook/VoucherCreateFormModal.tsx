import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { OneVoucherResponse, VoucherFormRequest, optionsStatusVouchers, CouponCreateMutation, VoucherCreateMutation } from '../core/_moduls';
import { TextInput } from '../../forms/TextInput';
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SelectCurrencyInput } from '../../forms/SelectCurrencyInput';
import { OneCurrencyResponse } from '../../currency/types/index';
import { loadAllCurrencies } from '../../../redux/actions/currencyAction';
import { TextareaInput } from '../../forms/TextareaInput';
import { SelectValueNameInput } from '../../forms/SelectValueNameInput';
import { createOrUpdateOneVoucher } from '../api/index';
import dayjs from 'dayjs';

interface Props {
  setOpenCreateOrUpdateModal: any,
  voucherItem?: OneVoucherResponse | any
}

const schema = yup
  .object({
    email: yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    code: yup.string().min(3, 'Minimum 3 symbols').max(200, 'Maximum 3 symbols').required(),
    status: yup.string().min(3, 'Minimum 3 symbols').required(),
    currency: yup.string().min(3, 'Minimum 3 symbols').required(),
    amount: yup.number().required(),
    percent: yup.number().min(1, 'Minimum 1 percent').max(100, 'Maximum 100 percent').required(),
  })
  .required();

export const VoucherCreateFormModal: React.FC<Props> = ({ setOpenCreateOrUpdateModal, voucherItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { control, register, handleSubmit, reset, setValue,
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
      const fields = ['code', 'email', 'status', 'currency', 'amount', 'percent', 'name', 'description', 'expiredAt'];
      fields?.forEach((field: any) => setValue(field, voucherItem[field]));
    }
  }, [voucherItem]);

  const saveMutation = VoucherCreateMutation({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false)
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    }
  });


  const onSubmit = (data: any) => {
    setLoading(true);
    setHasErrors(undefined)
    setTimeout(async () => {
      const payload: VoucherFormRequest = { voucherId: voucherItem?.id, ...data }
      saveMutation.mutateAsync(payload)
    }, 1000)
  };
  
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
        <div className='modal-dialog modal-dialog-centered mw-1000px modal-dialog-scrollable'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <div className="mb-13 text-center">
                <h1 className="mb-3">{voucherItem?.code ? `Update Voucher` : `Create New Voucher`}</h1>
                <div className="text-muted fw-bold fs-5">If you need more info, please check
                  <a href="#" className="link-primary fw-bolder"> documentation</a>.
                </div>
                {hasErrors && (
                  <div className="text-center alert alert-danger">
                    <div className="d-flex flex-column">
                      <h4 className="mb-1 text-danger">Error</h4>
                      <span>{hasErrors}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* <UserEditModalFormWrapper /> */}
              <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-6">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Code"
                      register={register}
                      errors={errors}
                      name="code"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter voucher code"
                      validation={{ required: true }}
                      isRequired={true}
                      required="required"
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
                      isRequired={true}
                      required="required"
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Amount"
                      register={register}
                      errors={errors}
                      name="amount"
                      type="number"
                      pattern="[0-9]*"
                      min="1"
                      step="1"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="Amount voucher"
                      validation={{ required: true }}
                      required="required"
                      isRequired={true}
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
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
                </div>
                <div className="row mb-6">
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <SelectValueNameInput
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
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Percent"
                      register={register}
                      errors={errors}
                      name="percent"
                      type="number"
                      autoComplete="off"
                      placeholder="Percent voucher"
                      validation={{ required: true }}
                      required="required"
                      isRequired={true}
                    />
                  </div>
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <label htmlFor='expiredAt' className='form-label fs-6 fw-bold mb-2'>
                      <strong>Expired date</strong>
                    </label>
                    <Controller
                      name={"expiredAt"}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            onChange={onChange}
                            className="form-control"
                            locale="it-IT"
                            minDate={new Date()}
                            isClearable={true}
                            // withPortal
                            selected={value ? dayjs(value).toDate() : null}
                            placeholderText="Enter expired date (optional)"
                          />
                        );
                      }}
                    />
                  </div>

                </div>
                <div className="d-flex flex-column mb-8">
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Name"
                    register={register}
                    errors={errors}
                    name="name"
                    type="text"
                    autoComplete="one"
                    placeholder="Enter name or title (optional)"
                    validation={{ required: false }}
                    isRequired={false}
                  />
                </div>
                <div className="d-flex flex-column mb-8">
                  <TextareaInput
                    label="Description"
                    className="form-control"
                    register={register}
                    errors={errors}
                    name="description"
                    placeholder="Description voucher (optional)"
                    validation={{ required: true }}
                  />
                </div>
                <div className="text-center">
                  <button type="button" onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-light me-3">Cancel</button>
                  <button type='submit' className='btn btn-lg btn-primary fw-bolder'
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