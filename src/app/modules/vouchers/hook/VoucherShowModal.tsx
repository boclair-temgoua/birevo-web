import { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { OneVoucherResponse, VoucherFormRequest, UseCouponMutation } from '../core/_moduls';
import { toAbsoluteUrl } from '../../../../_metronic/helpers/AssetHelpers';
import { useQuery } from '@tanstack/react-query';
import { getOneVoucher } from '../api';
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";
import ContentLoader from 'react-content-loader';
import Skeleton from 'react-loading-skeleton'
import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';
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

  const saveMutation = UseCouponMutation({
    onSuccess: () => {
      setOpenModal(false);
      setHasErrors(false);
      setLoading(false)
    },
  });


  const onSubmit = (data: any) => {
    setLoading(true);
    setHasErrors(undefined)
    setTimeout(async () => {
      const payload = {
        ...data,
        voucherId: voucherItem?.id,
        code: voucherItem?.code,
      }
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
              <div onClick={() => { setOpenModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <div className="modal-body scroll-y pt-0 pb-15">
              <div className="mw-lg-800px mx-auto">
                <div className="mb-13 text-center">
                  <h1 className="mb-3">{voucher?.voucherType}</h1>
                </div>

                {voucher?.id ? '' : <ContentLoader viewBox="0 0 700 200" height={200} width={700}>
                  <rect x="20" y="15" rx="20" ry="20" width="150" height="150" />
                  <rect x="180" y="17" rx="10" ry="10" width="420" height="15" />
                  <rect x="180" y="45" rx="10" ry="10" width="315" height="15" />
                  <rect x="180" y="70" rx="10" ry="10" width="233" height="15" />

                  <rect x="180" y="100" rx="8" ry="8" width="130" height="40" />
                  <rect x="320" y="100" rx="8" ry="8" width="130" height="40" />
                  <rect x="460" y="100" rx="8" ry="8" width="130" height="40" />

                  <rect x="250" y="160" rx="8" ry="8" width="130" height="38" />
                  <rect x="415" y="160" rx="8" ry="8" width="130" height="38" />
                </ContentLoader>}


                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>

                  <div className='me-7 mb-4'>
                    <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                      {voucher?.code && <img src={toAbsoluteUrl(voucher?.qrCode?.image)} alt={voucher?.code} />}
                    </div>
                  </div>
                  <div className='d-flex flex-column'>

                    <div className='d-flex align-items-center mb-2'>
                      <div className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        {voucher?.code}
                      </div>
                      {voucher?.id && (
                        <div className={`btn btn-sm btn-light-${!voucher?.isExpired && voucher?.status === 'ACTIVE' ? 'success' : 'danger'} fw-bolder ms-2 fs-8 py-1 px-1`}>
                          {!voucher?.isExpired && voucher?.status === 'ACTIVE' ? 'Valid' : 'Invalid'}
                        </div>
                      )}
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
                      {voucher?.createdAt && (
                        <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
                            className='svg-icon-4 me-1'
                          />
                          Created: <span className='badge badge-light-primary'>{formateDateDayjs(voucher?.createdAt)}</span>
                        </div>
                      )}
                      {voucher?.startedAt && (
                        <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
                            className='svg-icon-4 me-1'
                          />
                          Stated: <span className='badge badge-light-primary'>{formateDateDayjs(voucher?.startedAt)}</span>
                        </div>
                      )}
                      {voucher?.expiredAt && (
                        <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
                            className='svg-icon-4 me-1'
                          />
                          Expired: <span className='badge badge-light-primary'>{formateDateDayjs(voucher?.expiredAt)}</span>
                        </div>
                      )}
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      {voucher?.usedAt && (
                        <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
                            className='svg-icon-4 me-1'
                          />
                          Used: <span className='badge badge-light-primary'>{formateDateDayjs(voucher?.usedAt)}</span>
                        </div>
                      )}
                    </div>

                    <div className='d-flex flex-column flex-grow-1 pe-8'>
                      <div className='d-flex flex-wrap'>

                        {voucher?.amount && (
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-4 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{voucher?.amount} {voucher?.currencyItem?.code}</div>
                            </div>
                            <div className='fw-bold fs-6 text-gray-400'>Amount</div>
                          </div>
                        )}


                        {/* <ContentLoader height="150" width="150" viewBox="0 0 265 300">
                          <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
                        </ContentLoader> */}
                        {voucher?.activity?.view > 0 && (
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-4 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{voucher?.activity?.view}</div>
                            </div>
                            <div className='fw-bold fs-6 text-gray-400'>Views</div>
                          </div>
                        )}

                        {voucher?.activity?.usage > 0 && voucher?.voucherType === 'VOUCHER' && (
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-4 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{voucher?.activity?.usage}</div>
                            </div>
                            <div className='fw-bold fs-6 text-gray-400'>Usages</div>
                          </div>
                        )}

                        {voucher?.percent && (
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-4 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{voucher?.percent} %</div>
                            </div>
                            <div className='fw-bold fs-6 text-gray-400'>Percents</div>
                          </div>
                        )}
                      </div>
                    </div>


                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                        {voucher?.voucherType && `${voucher?.organization?.name} - ${voucher?.email}`}
                      </div>
                    </div>

                  </div>
                </div>

                {(voucher?.status !== 'USED' && voucher?.status !== 'PENDING') && voucher?.voucherType === 'COUPON' && (
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
