/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
import { capitalizeFirstLetter } from '../../../utility/commons/capitalize-first-letter';
import Swal from 'sweetalert2';
import { DeleteContributorMutation } from '../core/_models';

type Props = {
  subscribeUserItem?: OneContributorSubscribeResponse;
}

const ContributorSubscribeTableList: React.FC<Props> = ({ subscribeUserItem }) => {

  const lastNameItem = String(subscribeUserItem?.profile?.lastName)
  const firstNameItem = String(subscribeUserItem?.profile?.firstName)

  const actionDeleteMutation = DeleteContributorMutation({ onSuccess: () => { } });

  const deleteItem = async (subscribeUserItem: any) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to perform this action?',
      confirmButtonText: 'Yes, Deleted',
      cancelButtonText: 'No, Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-default',
      },
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        const payloadSave = { subscribe_uuid: subscribeUserItem?.uuid }
        actionDeleteMutation.mutateAsync(payloadSave)
      }
    });

  }
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
          <button onClick={() => { deleteItem(subscribeUserItem) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export { ContributorSubscribeTableList }
