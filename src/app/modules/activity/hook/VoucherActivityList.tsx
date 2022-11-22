import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';
import { OneVoucherResponse } from '../../vouchers/core/_moduls';
import { toAbsoluteUrl } from '../../../../_metronic/helpers/AssetHelpers';
import { capitalizeName } from '../../../utility/commons/capitalized-name';
import { capitalizeOneFirstLetter } from '../../../utility/commons/capitalize-first-letter';


type Props = {
  activity?: any;
}


const VoucherActivityList: React.FC<Props> = ({ activity }) => {

  return (
    <>
      <tr key={activity?.voucher?.id}>
        <td>
          <div className='d-flex align-items-center'>
            {/* <div className='form-check form-check-solid fv-row'>
              <input
                className='form-check-input'
                type='checkbox'
              />
            </div> */}
            <div className='symbol symbol-35px me-2'>
              <img alt={`66`} src={toAbsoluteUrl(activity?.voucher?.qrCode)} />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <a href={void (0)} style={{ cursor: 'pointer' }} className='text-dark fw-bolder text-hover-primary fs-6'>
                {activity?.voucher?.code}
              </a>
            </div>
          </div>
        </td>
        {/* <td>
          {activity?.voucher?.status === 'ACTIVE' && (
            <span className='badge badge-light-success'>{activity?.voucher?.status}</span>
          )}
          {activity?.voucher?.status === 'PENDING' && (
            <span className='badge badge-light-danger'>{activity?.voucher?.status}</span>
          )}
          {activity?.voucher?.status === 'USED' && (
            <span className='badge badge-light-info'>{activity?.voucher?.status}</span>
          )}
          {activity?.voucher?.isExpired && (<>-<span className='badge badge-light-danger'>Expired</span></>)}
        </td> */}
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(activity?.voucher?.startedAt)}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(activity?.voucher?.expiredAt)}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {activity?.voucher?.amount && `${activity?.voucher?.amount} ${activity?.voucher?.currency}`}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {activity?.voucher?.percent && `${activity?.voucher?.percent}%`}
          </a>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(activity?.voucher?.createdAt)}
          </a>
        </td>
        {/* <td><span className={`badge badge-light-${activity?.color}`}> {activity?.action}</span></td> */}
        <td>
          {activity?.action === 'VOUCHER-VIEW' && (
            <span className='badge badge-light-primary'>{activity?.action}</span>
          )}
          {activity?.action === 'VOUCHER-USED' && (
            <span className='badge badge-light-success'>{activity?.action}</span>
          )}
          {activity?.action === 'VOUCHER-NEW' && (
            <span className='badge badge-light-info'>{activity?.action}</span>
          )}
        </td>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-35px symbol-circle me-2'>
              <span className={`symbol-label bg-light-${activity?.profileOwner?.color} text-${activity?.profileOwner?.color} fw-bold`}>
                {capitalizeOneFirstLetter(String(activity?.profileOwner?.fullName))}</span>
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <a href={void (0)} className='text-dark fw-bolder text-hover-primary fs-6'>
                {activity?.profileOwner?.fullName}
              </a>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                {activity?.profileOwner?.email}
              </span>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

export { VoucherActivityList }
