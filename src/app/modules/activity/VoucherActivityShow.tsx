/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { useAuth } from '../auth';
import { HelmetSite } from '../../utility/commons/helmet-site';
import { KTSVG } from '../../../_metronic/helpers';
import queryString from 'query-string';
import { ActivityTable } from './hook/ActivityTable';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOneVoucher } from '../vouchers/api';
import { OneVoucherResponse } from '../vouchers/core/_moduls';
import { toAbsoluteUrl } from '../../../_metronic/helpers/AssetHelpers';
import dayjs from 'dayjs';
import { formateDateDayjs } from '../../utility/commons/formate-date-dayjs';
import ContentLoader from 'react-content-loader';
import { capitalizeName } from '../../utility/commons/capitalized-name';
import { capitalizeOneFirstLetter } from '../../utility/commons/capitalize-first-letter';



const VoucherActivityShow: FC = (props) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-restricted-globals
  const { type, code } = queryString.parse(location.search);
  const { voucher_uuid } = useParams<string>()
  const userItem = useAuth();
  const intl = useIntl()

  const fetchOneVoucher = async (code: string) => await getOneVoucher({ code })
  const { data } = useQuery(['voucher', code], () => fetchOneVoucher(String(code)), {
    refetchOnWindowFocus: false,
  })
  const voucher: OneVoucherResponse = data?.data

  return (
    <>
      <HelmetSite title={`${capitalizeName(String(type))} - ${voucher?.organization?.name || process.env.REACT_APP_NAME}`} />

      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>

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
            <div className='flex-grow-1'>

              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
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
                            <div className='fs-2 fw-bolder'>{voucher?.amount} {voucher?.currency?.code}</div>
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

                <div className='d-flex my-4'>
                  {voucher?.voucherType && (
                    <>
                      <div className='symbol symbol-35px symbol-circle me-2'>
                        <span className={`symbol-label bg-light-${voucher?.profileOwner?.color} text-${voucher?.profileOwner?.color} fw-bold`}>
                          {capitalizeOneFirstLetter(String(`${voucher?.profileOwner?.lastName} ${voucher?.profileOwner?.firstName}`))}</span>
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href={void (0)} className='text-dark fw-bolder text-hover-primary fs-6'>
                          {voucher?.profileOwner?.lastName} {voucher?.profileOwner?.firstName}
                        </a>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {voucher?.profileOwner?.email}
                        </span>
                      </div>

                      {/* <button
                        type='button'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                        onClick={() => { navigate(-1) }}>
                        <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
                      </button> */}
                    </>
                  )}
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
