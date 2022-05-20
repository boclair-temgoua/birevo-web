/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
import { capitalizeFirstLetter } from '../../../utility/commons/capitalize-first-letter';

type Props = {
  subscribeUserItem?: OneContributorSubscribeResponse;
}

const ContributorSubscribeTable: React.FC<Props> = ({ subscribeUserItem }) => {

  const lastNameItem = String(subscribeUserItem?.profile?.lastName)
  const firstNameItem = String(subscribeUserItem?.profile?.firstName)
  return (
    <tr key={subscribeUserItem?.id}>
      <td>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-35px symbol-circle me-2'>
            {subscribeUserItem?.profile?.image ? (<img alt={`${lastNameItem} ${firstNameItem}`} src={toAbsoluteUrl(subscribeUserItem?.profile?.image)} />) :
              (<span className={`symbol-label bg-light-${subscribeUserItem?.profile?.color} text-${subscribeUserItem?.profile?.color} fw-bold`}>
                {capitalizeFirstLetter(firstNameItem, lastNameItem)}</span>)}
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <a href={void (0)} className='text-dark fw-bolder text-hover-primary fs-6'>
              {firstNameItem} {lastNameItem}
            </a>
            <span className='text-muted fw-bold text-muted d-block fs-7'>
              {subscribeUserItem?.profile?.email}
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

export { ContributorSubscribeTable }
