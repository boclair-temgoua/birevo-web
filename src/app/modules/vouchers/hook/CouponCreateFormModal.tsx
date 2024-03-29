import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { OneVoucherResponse, VoucherFormRequest, optionsStatusVouchers, CouponCreateMutation, optionsNumberGenerateCoupons } from '../core/_moduls';
import { TextInput } from '../../forms/TextInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SelectCurrencyInput } from '../../forms/SelectCurrencyInput';
import { TextareaInput } from '../../forms/TextareaInput';
import { SelectValueNameInput } from '../../forms/SelectValueNameInput';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { TextRadioInput } from '../../forms';
import { getCurrencies } from '../../currency/api/index';
import { useQuery } from '@tanstack/react-query';
import { SelectValueIdInput } from '../../forms/SelectValueIdInput';

interface Props {
  setOpenCreateOrUpdateModal: any,
  voucherItem?: OneVoucherResponse | any
}

const schema = yup
  .object().shape({
    deliveryType: yup.string().required(),
    numberGenerate: yup.string().required(),
    status: yup.string().min(3, 'Minimum 3 symbols').required(),
    startedAt: yup.date().min(new Date(), 'Please choose future date').required(),
    expiredAt: yup.date().min(yup.ref("startedAt"), "End date has to be more than start date").required(),
  });

export const CouponCreateFormModal: React.FC<Props> = ({ setOpenCreateOrUpdateModal, voucherItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { control, watch, register, handleSubmit, setValue,
    formState: { errors, isDirty, isValid }
  } = useForm<VoucherFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });
  const watchAmount = watch('deliveryType', 'AMOUNT');
  const watchPercent = watch('deliveryType', 'PERCENT');

  const {
    data: dataCurrencies,
  } = useQuery(['currencies'], () => getCurrencies())
  const currencies = dataCurrencies?.data

  useEffect(() => {
    if (voucherItem) {
      const fields = ['name', 'description', 'email', 'amount', 'currencyId', 'status', 'percent', 'maxUse', 'deliveryType', 'startedAt', 'expiredAt'];
      fields?.forEach((field: any) => setValue(field, voucherItem[field]));
    }
  }, [voucherItem, setValue]);

  const saveMutation = CouponCreateMutation({
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
      const voucherId = voucherItem?.id
      const payloadSave: VoucherFormRequest = { ...data }
      const payloadUpdate: VoucherFormRequest = { voucherId, ...data }
      !voucherId ?
        saveMutation.mutateAsync(payloadSave)
        : saveMutation.mutateAsync(payloadUpdate)
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
                <h1 className="mb-3">{voucherItem?.uuid ? 'Update' : 'Create New'} Coupon</h1>
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
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Email"
                      register={register}
                      errors={errors}
                      name="email"
                      type="email"
                      autoComplete="one"
                      placeholder="Enter email (optional)"
                      validation={{ required: false }}
                      isRequired={false}
                    />
                  </div>
                </div>
                <div className="row mb-6">

                  <div className="col-md-6 col-lg-6 col-xxl-6">
                    <label
                      className={`btn btn-outline btn-outline-dashed d-flex text-start p-6`}
                    >
                      <span
                        className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1"
                      >
                        <TextRadioInput
                          className="form-check-input"
                          register={register}
                          errors={errors}
                          name="deliveryType"
                          type="radio"
                          validation={{ required: true }}
                          value={'AMOUNT'}
                        />

                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">
                          Coupon based on the price
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xxl-6">
                    <label
                      className={`btn btn-outline btn-outline-dashed d-flex text-start p-6`}
                    >
                      <span
                        className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1"
                      >
                        <TextRadioInput
                          className="form-check-input"
                          register={register}
                          errors={errors}
                          name="deliveryType"
                          type="radio"
                          validation={{ required: true }}
                          value={'PERCENT'}
                        />

                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">
                          Coupon based on the percentage
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {watchPercent === 'PERCENT' && watchAmount !== 'AMOUNT' && (
                  <div className="row mb-6">
                    <div className="col-md-12 fv-row fv-plugins-icon-container">
                      <TextInput
                        className="form-control form-control-lg"
                        labelFlex="Percent %"
                        register={register}
                        errors={errors}
                        name="percent"
                        type="number"
                        pattern="[0-9]*"
                        min="1"
                        step="1"
                        isNumber={true}
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="Percent coupon %"
                        validation={{ required: false }}
                        isRequired={false}
                      />
                    </div>
                  </div>
                )}

                {watchAmount === 'AMOUNT' && watchPercent !== 'PERCENT' && (
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
                        isNumber={true}
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="Amount coupon"
                        validation={{ required: false }}
                        isRequired={false}
                      />
                    </div>
                    <div className="col-md-6 fv-row fv-plugins-icon-container">
                      <SelectCurrencyInput
                        dataItem={currencies}
                        isValueInt={true}
                        firstOptionName="Choose currency"
                        className="form-control form-select select2-hidden-accessible"
                        labelFlex="Currency"
                        register={register}
                        errors={errors}
                        name="currencyId"
                        validation={{ required: false }}
                        isRequired={false}
                      />
                    </div>
                  </div>
                )}

                <div className="row mb-6">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label htmlFor='startedAt' className="form-label fw-bolder text-dark fs-6 mb-2">
                      <span className={'required'}>Started date</span>
                    </label>
                    <Controller
                      name={"startedAt"}
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
                            placeholderText="Enter started date"
                          />
                        );
                      }}
                    />
                    {errors?.startedAt && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors?.startedAt?.message}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label htmlFor='expiredAt' className="form-label fw-bolder text-dark fs-6 mb-2">
                      <span className={'required'}>Expired date</span>
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
                            placeholderText="Enter expired date"
                          />
                        );
                      }}
                    />
                    {errors?.expiredAt && (
                      <strong className='fv-plugins-message-container text-danger'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors?.expiredAt?.message}</span>
                        </div>
                      </strong>
                    )}
                  </div>
                </div>

                {/* <div className="d-flex flex-column mb-8">
                  <div className='form-check form-check-solid fv-row'>
                    <input
                      className='form-check-input'
                      type='checkbox' {...register('isGenerate')}
                    />
                    <label className='form-check-label fw-bold ps-2 fs-6' htmlFor='deactivate'>
                      Auto generate multiple coupon
                    </label>
                  </div>
                  {errors?.isGenerate && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.isGenerate?.message}</div>
                    </div>
                  )}
                </div> */}

                <div className="row mb-6">
                  <div className="col-md-12 fv-row fv-plugins-icon-container">
                    <SelectValueIdInput
                      firstOptionName="Choose value"
                      dataItem={optionsNumberGenerateCoupons}
                      isValueInt={true}
                      className="form-control form-select select2-hidden-accessible"
                      labelFlex="Coupon autogenerate"
                      register={register}
                      errors={errors}
                      name="numberGenerate"
                      validation={{ required: true }}
                      isRequired={true}
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
                    placeholder="Description coupon (optional)"
                    validation={{ required: false }}
                  />
                </div>
                <div className="text-center">
                  <button type="button" onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-light me-3">Close</button>
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
