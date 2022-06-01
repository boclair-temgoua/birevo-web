/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useAuth } from '../auth';
import { HelmetSite } from '../../utility/commons/helmet-site';
import { KTSVG } from '../../../_metronic/helpers';
import { BillingTable } from '../billing/hook/BillingTable';
import queryString from 'query-string';
import { ActivityTable } from './hook/ActivityTable';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getOneVoucher } from '../vouchers/api';
import { OneVoucherResponse } from '../vouchers/core/_moduls';
import { AccountHeader } from '../accounts/AccountHeader';
import { Dropdown1 } from '../../../_metronic/partials/content/dropdown/Dropdown1';
import { toAbsoluteUrl } from '../../../_metronic/helpers/AssetHelpers';
import dayjs from 'dayjs';



const VoucherActivityShow: FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-restricted-globals
  const { type, code } = queryString.parse(location.search);
  const { voucher_uuid } = useParams<string>()
  const userItem = useAuth();
  const intl = useIntl()

  const fetchOneVoucher = async (code: any) => await getOneVoucher({ code })
  const { data } = useQuery(['voucher', code], () => fetchOneVoucher(code))
  const voucher: OneVoucherResponse = data?.data

  return (
    <>
      <HelmetSite title={`${type || ''} - ${voucher?.organization?.name || process.env.REACT_APP_NAME}`} />

      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={toAbsoluteUrl(voucher?.qrCode?.image)} alt={voucher?.code} />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a href={void (0)} className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {voucher?.code}
                    </a>
                    <a
                      href={void (0)}
                      className={`btn btn-sm btn-info fw-bolder ms-2 fs-8 py-1 px-3`}
                    >
                      {voucher?.amount} {voucher?.currencyItem?.name}
                    </a>
                    <a
                      href={void (0)}
                      className={`btn btn-sm btn-light-primary fw-bolder ms-2 fs-8 py-1 px-3`}
                    >
                      {voucher?.voucherType}
                    </a>
                    <a
                      href={void (0)}
                      className={`btn btn-sm btn-light-${voucher?.isExpired ? 'danger' : 'success'} fw-bolder ms-2 fs-8 py-1 px-3`}
                    >
                      {voucher?.isExpired ? 'Expired' : 'Valid'}
                    </a>
                    {/* <a href='#'>
                      <KTSVG
                        path='/media/icons/duotune/general/gen026.svg'
                        className='svg-icon-1 svg-icon-primary'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_upgrade_plan'
                    >
                      Upgrade to Pro
                    </a> */}
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a
                      href={void (0)}
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen001.svg'
                        className='svg-icon-4 me-1'
                      />
                      {voucher?.organization?.name}
                    </a>
                    <a
                      href={void (0)}
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com011.svg'
                        className='svg-icon-4 me-1'
                      />
                      {voucher?.email}
                    </a>
                  </div>
                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a
                      href={void (0)}
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen014.svg'
                        className='svg-icon-4 me-1'
                      />
                      <span className='badge badge-light-danger'>{dayjs(voucher?.startedAt).format('DD/MM/YYYY')}</span>
                    </a>
                    <a href={void (0)}
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen014.svg'
                        className='svg-icon-4 me-1'
                      />
                      <span className='badge badge-light-success'>{dayjs(voucher?.expiredAt).format('DD/MM/YYYY')}</span>

                    </a>
                    <a href={void (0)}
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen015.svg'
                        className='svg-icon-4 me-1'
                      />
                      {voucher?.status === 'ACTIVE' && (
                        <span className='badge badge-light-success'>{voucher?.status}</span>
                      )}
                      {voucher?.status === 'PENDING' && (
                        <span className='badge badge-light-danger'>{voucher?.status}</span>
                      )}
                      {voucher?.status === 'USED' && (
                        <span className='badge badge-light-info'>{voucher?.status}</span>
                      )}
                    </a>
                  </div>
                </div>

                <div className='d-flex my-4'>
                  <button
                    type='button'
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    onClick={() => { navigate(-1) }}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivityTable voucherUuid={voucher_uuid} className='mb-5 mb-xl-8' />
    </>
  )
}

export { VoucherActivityShow }
