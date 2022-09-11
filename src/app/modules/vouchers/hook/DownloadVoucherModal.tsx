import { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { VoucherDownloadFormRequest } from '../core/_moduls';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { TextRadioInput } from '../../forms';
import { OneUserContextProps } from '../../auth/core/Auth';

interface Props {
  setOpenDownloadExcelModal: any,
  userItem: OneUserContextProps | any
  voucherType: 'COUPON' | 'VOUCHER'
}

const schema = yup
  .object({
    statusVoucher: yup.string().required(),
    initiationAt: yup.date()
      .max(new Date(), 'Please choose passe date')
      .required(),
    endAt: yup.date()
      .min(yup.ref("initiationAt"), "End date has to be more than initiation date")
      .max(new Date(), 'Please choose passe date')
      .required(),
  })
  .required();

export const DownloadVoucherModal: React.FC<Props> = ({ setOpenDownloadExcelModal, voucherType, userItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { control, register, handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<VoucherDownloadFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = async (data: VoucherDownloadFormRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload: VoucherDownloadFormRequest = {
      ...data,
      type: voucherType,
      organizationId: userItem?.organizationInUtilizationId
    }
    setTimeout(async () => {
      setHasErrors(false);
      setLoading(false)
      window.location.href = `${process.env.REACT_APP_SERVER_URL}/vouchers/download-xlsx?statusVoucher=${payload?.statusVoucher}&organizationId=${Number(payload?.organizationId)}&type=${payload?.type}&initiationAt=${payload?.initiationAt}&endAt=${payload?.endAt}`
      setOpenDownloadExcelModal(false)
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
              <div onClick={() => { setOpenDownloadExcelModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <div className="mb-13 text-center">
                <h1 className="mb-3">Download Excel</h1>
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
                  <label className="form-label fw-bolder text-dark fs-6 mb-2">
                    <span className='required'>Choice status</span>
                    <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                  </label>

                  <div className="col-md-3 col-lg-3 col-xxl-3">
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
                          name="statusVoucher"
                          type="radio"
                          validation={{ required: true }}
                          value={'ALL'}
                        />

                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">
                          ALL
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="col-md-3 col-lg-3 col-xxl-3">
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
                          name="statusVoucher"
                          type="radio"
                          validation={{ required: true }}
                          value={'ACTIVE'}
                        />

                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">
                          ACTIVE
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="col-md-3 col-lg-3 col-xxl-3">
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
                          name="statusVoucher"
                          type="radio"
                          validation={{ required: true }}
                          value={'PENDING'}
                        />

                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">
                          PENDING
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="col-md-3 col-lg-3 col-xxl-3">
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
                          name="statusVoucher"
                          type="radio"
                          validation={{ required: true }}
                          value={'USED'}
                        />

                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">
                          USED
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="row mb-6">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="form-label fw-bolder text-dark fs-6 mb-2">
                      <span className='required'>Initiation date</span>
                      <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                    </label>
                    {/* <label htmlFor='expiredAt' className='form-label fs-6 fw-bold mb-2'>
                      <strong>Started date</strong>
                    </label> */}
                    <Controller
                      name={"initiationAt"}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            onChange={onChange}
                            className="form-control"
                            locale="it-IT"
                            maxDate={new Date()}
                            isClearable={true}
                            selected={value ? dayjs(value).toDate() : null}
                            placeholderText="Initiation date"
                          />
                        );
                      }}
                    />
                    {errors?.initiationAt && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors?.initiationAt?.message}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="form-label fw-bolder text-dark fs-6 mb-2">
                      <span className='required'>End date</span>
                      <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                    </label>
                    <Controller
                      name={"endAt"}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            onChange={onChange}
                            className="form-control"
                            locale="it-IT"
                            maxDate={new Date()}
                            isClearable={true}
                            selected={value ? dayjs(value).toDate() : null}
                            placeholderText="End date"
                          />
                        );
                      }}
                    />
                    {errors?.endAt && (
                      <strong className='fv-plugins-message-container text-danger'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors?.endAt?.message}</span>
                        </div>
                      </strong>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <button type="button" onClick={() => { setOpenDownloadExcelModal(false) }} className="btn btn-light me-3">Cancel</button>
                  <button type='submit' className='btn btn-lg btn-primary fw-bolder'
                    disabled={!isDirty || !isValid || loading}
                  >
                    {!loading && <span className='indicator-label'>Download</span>}
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
