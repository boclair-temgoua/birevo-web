/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG } from '../../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { OneVoucherResponse } from '../core/_moduls';
import dayjs from 'dayjs';
import { useState } from 'react';
import { VoucherShowModal } from './VoucherShowModal';
import { toAbsoluteUrl } from '../../../../_metronic/helpers/AssetHelpers';
import { Link, useNavigate } from 'react-router-dom';
import { CouponCreateFormModal } from './CouponCreateFormModal';
import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';
import { VoucherCreateFormModal } from './VoucherCreateFormModal';
import { capitalizeOneFirstLetter } from '../../../utility/commons/capitalize-first-letter';
import { capitalizeName } from '../../../utility/commons/capitalized-name';

type Props = {
  voucher?: OneVoucherResponse | any;
}

const CouponVoucherTableList: React.FC<Props> = ({ voucher }) => {
  const navigate = useNavigate();
  const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [copied, setCopied] = useState(false);

  const handleCopiedClick = () => {
    setCopied(true);
    setTimeout(() => { setCopied(false) }, 1500);
  }

  return (
    <>
      <tr key={voucher?.id}>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-35px me-2'>
              <img alt={`66`} src={toAbsoluteUrl(voucher?.qrCode?.image)} />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <a href={void (0)} onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }} className='text-dark fw-bolder text-hover-primary fs-6'>
                {voucher?.code}
              </a>
              <span className='text-muted fw-bold text-muted d-block fs-7'>{capitalizeName(voucher?.voucherType)}: <span className={`fw-bolder text-${!voucher?.isExpired && voucher?.status === 'ACTIVE' ? 'success' : 'danger'} my-6`}>{!voucher?.isExpired && voucher?.status === 'ACTIVE' ? 'Valid' : 'Invalid'}</span></span>
            </div>
          </div>
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
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(voucher?.startedAt)}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(voucher?.expiredAt)}
          </a>
        </td>
        {/* <td>
          {voucher?.statusOnline === 'ONLINE' && (
            <span className='badge badge-light-success'>{voucher?.statusOnline}</span>
          )}
          {voucher?.statusOnline === 'OFFLINE' && (
            <span className='badge badge-light-danger'>{voucher?.statusOnline}</span>
          )}
          {voucher?.statusOnline === 'TEST' && (
            <span className='badge badge-light-info'>{voucher?.statusOnline}</span>
          )}
        </td> */}
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {voucher?.amount && `${voucher?.amount} ${voucher?.currencyItem?.code}`}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {voucher?.percent && `${voucher?.percent}%`}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(voucher?.createdAt)}
          </a>
        </td>
        <td className='text-end'>
          <CopyToClipboard text={`${voucher?.code}`}>
            <button
              onClick={() => handleCopiedClick()}
              className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
            >
              <KTSVG path={`/media/icons/duotune/${copied ? 'arrows/arr012' : 'general/gen054'}.svg`} className='svg-icon-3' />
            </button>
          </CopyToClipboard>

          {/* <button onClick={() => { navigate(`/activities/${voucher?.uuid}?type=${(voucher?.voucherType).toLowerCase()}&code=${voucher?.code}`, { replace: true }) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen032.svg' className='svg-icon-3' />
          </button> */}
          <Link to={`/activities/${voucher?.uuid}?type=${(voucher?.voucherType).toLowerCase()}&code=${voucher?.code}`} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen032.svg' className='svg-icon-3' />
          </Link>

          {voucher?.status !== 'USED' && (
            <>
              <button onClick={() => { setOpenCreateOrUpdateModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
              </button>
              <button className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
              </button>
            </>
          )}

        </td>
      </tr>
      {openModal && (<VoucherShowModal voucherItem={voucher} setOpenModal={setOpenModal} />)}
      {openCreateOrUpdateModal && (voucher?.voucherType === 'COUPON' ?
        <CouponCreateFormModal voucherItem={voucher} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} /> :
        <VoucherCreateFormModal voucherItem={voucher} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />
      )}
    </>
  )
}

export { CouponVoucherTableList }
