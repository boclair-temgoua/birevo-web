/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG } from '../../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { OneVoucherResponse } from '../core/_moduls';
import dayjs from 'dayjs';
import { useState } from 'react';
import { VoucherShowModal } from './VoucherShowModal';
import { toAbsoluteUrl } from '../../../../_metronic/helpers/AssetHelpers';

type Props = {
  voucher?: OneVoucherResponse | any;
}

const CouponVoucherTable: React.FC<Props> = ({ voucher }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [copied, setCopied] = useState(false);


  return (
    <>
      <tr key={voucher?.id}>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-35px me-2'>
            <img alt={`66`} src={toAbsoluteUrl(voucher?.qrCode?.image)} />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <CopyToClipboard text={`${voucher?.code}`}>
                <a href={void (0)} onClick={() => setCopied(true)} style={{ cursor: 'pointer' }} className='text-dark fw-bolder text-hover-primary fs-6'>
                  {voucher?.code}
                </a>
              </CopyToClipboard>
              <span className='text-muted fw-bold text-muted d-block fs-7'>Coupon: <span className={`fw-bolder text-${voucher?.isExpired ? 'danger' : 'success'} my-6`}>{voucher?.isExpired ? 'expired' : 'valid'}</span></span>
            </div>
          </div>
        </td>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{voucher?.amount} {voucher?.currency?.code}</td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {dayjs(voucher?.startedAt).format('DD/MM/YYYY')}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {dayjs(voucher?.expiredAt).format('DD/MM/YYYY')}
          </a>
        </td>
        <td>
          {voucher?.status === 'ACTIVE' && (
            <span className='badge badge-light-success'>{voucher?.status}</span>
          )}
          {voucher?.status === 'PENDING' && (
            <span className='badge badge-light-danger'>{voucher?.status}</span>
          )}
          {voucher?.status === 'USED' && (
            <span className='badge badge-light-info'>{voucher?.status}</span>
          )}
        </td>
        <td className='text-end'>
          <CopyToClipboard text={`${voucher?.code}`}>
            <button
              onClick={() => setCopied(true)}
              //gen054
              className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
            >
              <KTSVG path={`/media/icons/duotune/general/${copied ? 'gen043' : 'gen054'}.svg`} className='svg-icon-3' />
            </button>
          </CopyToClipboard>
          <button onClick={() => { setOpenModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen032.svg' className='svg-icon-3' />
          </button>

          <button className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        </td>
      </tr>
      {openModal && (<VoucherShowModal voucherItem={voucher} setOpenModal={setOpenModal} />)}
    </>
  )
}

export { CouponVoucherTable }
