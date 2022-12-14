import { useState } from 'react';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
import { capitalizeOneFirstLetter } from '../../../utility/commons/capitalize-first-letter';
import Swal from 'sweetalert2';
import { DeleteContributorMutation } from '../core/_models';
import { ContributorUpdateFormModal } from './ContributorUpdateFormModal';
import { useAuth } from '../../auth';


type Props = {
  subscribeUserItem?: OneContributorSubscribeResponse;
}

const ContributorSubscribeTableList: React.FC<Props> = ({ subscribeUserItem }) => {
  const userItem = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false)

  const fullNameItem = String(subscribeUserItem?.profile?.fullName)

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
    <>
      <tr key={subscribeUserItem?.id}>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-35px symbol-circle me-2'>
              {subscribeUserItem?.profile?.image ? (<img alt={`${fullNameItem}`} src={toAbsoluteUrl(subscribeUserItem?.profile?.image)} />) :
                (<span className={`symbol-label bg-light-${subscribeUserItem?.profile?.color} text-${subscribeUserItem?.profile?.color} fw-bold`}>
                  {capitalizeOneFirstLetter(fullNameItem)}</span>)}
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <a href={void (0)} className='text-dark fw-bolder text-hover-primary fs-6'>
                {fullNameItem}
              </a>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                {subscribeUserItem?.profile?.email}
              </span>
            </div>
          </div>
        </td>
        <td>
          {subscribeUserItem?.role?.name === 'ADMIN' && (
            <span className='badge badge-light-success'>{subscribeUserItem?.role?.name}</span>
          )}
          {subscribeUserItem?.role?.name === 'MODERATOR' && (
            <span className='badge badge-light-primary'>{subscribeUserItem?.role?.name}</span>
          )}
        </td>
        {userItem?.role?.name === 'ADMIN' && (
          <td>
            <div className='d-flex justify-content-end flex-shrink-0'>
                <>
                  <button onClick={() => { setOpenModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
                    <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                  </button>
                  <button onClick={() => { deleteItem(subscribeUserItem) }} className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </button>
                </>
            </div>
          </td>
        )}
      </tr>
      {openModal && (<ContributorUpdateFormModal subscribeUserItem={subscribeUserItem} setOpenModal={setOpenModal} />)}
    </>
  )
}

export { ContributorSubscribeTableList }
