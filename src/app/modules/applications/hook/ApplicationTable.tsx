/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG } from '../../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { OneApplicationResponse, ApplicationDeleteMutation } from '../core/_moduls';
import dayjs from 'dayjs';
import { useState } from 'react';
// import { VoucherShowModal } from './VoucherShowModal';
import { ApplicationCreateOrUpdateFormModal } from './ApplicationCreateOrUpdateFormModal';
import Swal from 'sweetalert2';
import { ApplicationShowModal } from './ApplicationShowModal';

type Props = {
  item?: OneApplicationResponse;
}

const ApplicationTable: React.FC<Props> = ({ item }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openShowModal, setOpenShowModal] = useState<boolean>(false)

  const actionDeleteMutation = ApplicationDeleteMutation({ onSuccess: () => { } });

  const deleteItem = async (item: any) => {
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
        const payloadSave = { application_uuid: item?.uuid }
        actionDeleteMutation.mutateAsync(payloadSave)
      }
    });

  }

  return (
    <>
      <tr key={item?.id}>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{item?.name}</td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {dayjs(item?.createdAt).format('DD/MM/YYYY')}
          </a>
        </td>
        <td>
          {item?.statusOnline === 'ONLINE' && (
            <span className='badge badge-light-success'>{item?.statusOnline}</span>
          )}
          {item?.statusOnline === 'OFFLINE' && (
            <span className='badge badge-light-danger'>{item?.statusOnline}</span>
          )}
          {item?.statusOnline === 'TEST' && (
            <span className='badge badge-light-info'>{item?.statusOnline}</span>
          )}
        </td>
        <td className='text-end'>
          <button onClick={() => { setOpenShowModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/arrows/arr095.svg' className='svg-icon-3' />
          </button>
          <button onClick={() => { setOpenModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
          </button>

          <button onClick={() => { deleteItem(item) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        </td>
      </tr>
      {openModal && (<ApplicationCreateOrUpdateFormModal applicationItem={item} setOpenModal={setOpenModal} />)}
      {openShowModal && (<ApplicationShowModal applicationItem={item} setOpenModal={setOpenShowModal} />)}
    </>
  )
}

export { ApplicationTable }
