import { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { OneVoucherResponse, VoucherFormRequest } from '../core/_moduls';
import { toAbsoluteUrl } from '../../../../_metronic/helpers/AssetHelpers';
import { useQuery } from 'react-query';
import { getOneVoucher } from '../api';
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";
import ContentLoader from 'react-content-loader';
import { createOrUpdateOneCoupon } from '../api/index';
interface Props {
  setOpenModal: any,
  voucherItem: OneVoucherResponse
}

export const VoucherShowModal: React.FC<Props> = ({ setOpenModal, voucherItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<VoucherFormRequest>({ mode: "onChange" });

  const fetchOneVoucher = async () => await getOneVoucher({ code: voucherItem?.code })
  const { data } = useQuery(['voucher', voucherItem?.code], () => fetchOneVoucher(), {
    refetchOnWindowFocus: false,
  })
  const voucher: OneVoucherResponse = data?.data


  const onSubmit = async (data: VoucherFormRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    const payload = {
      ...data,
      voucherId: voucherItem?.id,
      currency: voucherItem?.currency,
      amount: voucherItem?.amount
    }
    setTimeout(async () => {
      await createOrUpdateOneCoupon(payload)
        .then((response) => {
          setHasErrors(false);
          setLoading(false)

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
            <div className="modal-body scroll-y pt-0 pb-15">
              <div className="mw-lg-600px mx-auto">
                <div className="mb-13 text-center">
                  <h1 className="mb-3">{voucher?.voucherType}</h1>
                </div>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>

                  <div className='me-7 mb-4'>
                    <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                      {voucher?.code ? <img src={toAbsoluteUrl(voucher?.qrCode?.image)} alt={voucher?.code} /> :
                        <ContentLoader height="200" width="200" viewBox="0 0 265 300">
                          <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
                        </ContentLoader>}
                    </div>
                  </div>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <div className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        {voucher?.code}
                      </div>
                      <div className={`btn btn-sm btn-light-${voucher?.isExpired ? 'danger' : 'success'} fw-bolder ms-2 fs-8 py-1 px-1`}>
                        {voucher?.isExpired ? 'Expired' : 'Valid'}
                      </div>



                      {voucher?.status === 'ACTIVE' && (
                        <div className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-1'>
                          {voucher?.status === 'ACTIVE' && (voucher?.status)}
                        </div>
                      )}
                      {voucher?.status === 'PENDING' && (
                        <div className='btn btn-sm btn-light-danger fw-bolder ms-2 fs-8 py-1 px-1'>
                          {voucher?.status === 'PENDING' && (voucher?.status)}
                        </div>
                      )}
                      {voucher?.status === 'USED' && (
                        <div className='btn btn-sm btn-light-info fw-bolder ms-2 fs-8 py-1 px-1'>
                          {voucher?.status === 'USED' && (voucher?.status)}
                        </div>
                      )}

                      {voucher?.statusOnline === 'ONLINE' && (
                        <div className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-1'>
                          {voucher?.statusOnline === 'ONLINE' && (voucher?.statusOnline)}
                        </div>
                      )}
                      {voucher?.statusOnline === 'OFFLINE' && (
                        <div className='btn btn-sm btn-light-danger fw-bolder ms-2 fs-8 py-1 px-1'>
                          {voucher?.statusOnline === 'OFFLINE' && (voucher?.statusOnline)}
                        </div>
                      )}
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      {voucher?.expiredAt && (
                        <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
                            className='svg-icon-4 me-1'
                          />
                          Expired date: <span className='badge badge-light-success'>{dayjs(voucher?.expiredAt).format('DD/MM/YYYY')}</span>
                        </div>
                      )}
                      {voucher?.usedAt && (
                        <div className='d-flex align-items-center text-gray-400 text-hover-danger me-5 mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
                            className='svg-icon-4 me-1'
                          />
                          <span className='badge badge-light-danger'> {dayjs(voucher?.usedAt).format('DD/MM/YYYY')}</span>
                        </div>
                      )}
                    </div>

                    <div className='d-flex flex-column flex-grow-1 pe-8'>
                      <div className='d-flex flex-wrap'>
                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                          <div className='d-flex align-items-center'>
                            <div className='fs-2 fw-bolder'>{voucher?.amount} {voucher?.currencyItem?.code}</div>
                          </div>

                          <div className='fw-bold fs-6 text-gray-400'>Amount</div>
                        </div>

                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                          <div className='d-flex align-items-center'>
                            <div className='fs-2 fw-bolder'>{voucher?.activity?.view}</div>
                          </div>

                          <div className='fw-bold fs-6 text-gray-400'>Views</div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                        {voucher?.organization?.name} - {voucher?.email}
                      </div>
                    </div>

                  </div>
                </div>

                {(voucher?.status !== 'USED' && voucher?.status !== 'PENDING') && voucher?.voucherType === 'COUPON'  && !voucher?.isExpired && (
                  <form id="kt_account_deactivate_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden"  {...register("status", { value: "USED" })} />
                    <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                      <button onClick={() => { setOpenModal(false) }} type='button' className='btn btn-lg btn-light-primary fw-bolder me-4'>
                        <span className='indicator-label'>Cancel</span>
                      </button>
                      <button type='submit' className={`btn btn-lg btn-primary fw-bolder`}
                        disabled={isSubmitted}
                      >
                        {!loading && <span className='indicator-label'>Confirm Use COUPON</span>}
                        {loading && (
                          <span className='indicator-progress' style={{ display: 'block' }}>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}


              </div>
            </div>

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
