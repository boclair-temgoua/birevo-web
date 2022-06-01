/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG } from '../../../../_metronic/helpers'
import { OneSubscribeResponse } from '../../subscribes/core/_models';
import { capitalizeOneFirstLetter } from '../../../utility/commons/capitalize-first-letter';

type Props = {
  subscribeUserItem?: OneSubscribeResponse;
}

const OrganizationSubscribeTable: React.FC<Props> = ({ subscribeUserItem }) => {

  return (
    <tr key={subscribeUserItem?.id}>
      <td>
        <div className='d-flex align-items-center'>
        <div className='symbol symbol-35px symbol-circle me-2'>
        <span className={`symbol-label bg-light-${subscribeUserItem?.organization?.color} text-${subscribeUserItem?.organization?.color} fw-bold`}>
                {capitalizeOneFirstLetter(String(subscribeUserItem?.organization?.name))}</span>
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <a href={void (0)} className='text-dark fw-bolder text-hover-primary fs-6'>
              {subscribeUserItem?.organization?.name}
            </a>
            <span className='text-muted fw-bold text-muted d-block fs-7'>
             {subscribeUserItem?.organization?.email}
            </span>
          </div>
        </div>
      </td>
      {/* <td className='text-end'>
        <div className='d-flex flex-column w-100 me-2'>
          <div className='d-flex flex-stack mb-2'>
            <span className='text-muted me-2 fs-7 fw-bold'>50%</span>
          </div>
          <div className='progress h-6px w-100'>
            <div
              className='progress-bar bg-primary'
              role='progressbar'
              style={{ width: '50%' }}
            ></div>
          </div>
        </div>
      </td> */}
      <td>
        <div className='d-flex justify-content-end flex-shrink-0'>
          <a
            href='#'
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
          </a>
          <a
            href='#'
            className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen027.svg'
              className='svg-icon-3'
            />
          </a>
        </div>
      </td>
    </tr>
  )
}

export { OrganizationSubscribeTable }
