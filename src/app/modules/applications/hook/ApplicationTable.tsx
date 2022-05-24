/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG } from '../../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { OneApplicationResponse } from '../core/_moduls';
import dayjs from 'dayjs';
import { useState } from 'react';
// import { VoucherShowModal } from './VoucherShowModal';
import { toAbsoluteUrl } from '../../../../_metronic/helpers/AssetHelpers';
import { ApplicationCreateOrUpdateFormModal } from './ApplicationCreateOrUpdateFormModal';

type Props = {
  item?: OneApplicationResponse;
}

const ApplicationTable: React.FC<Props> = ({ item }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [copied, setCopied] = useState(false);

  const handleCopiedClick = () => {
    setCopied(true);
    setTimeout(() => { setCopied(false) }, 1500);
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
          <button onClick={() => { setOpenModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
          </button>

          <button className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        </td>
      </tr>
      {openModal && (<ApplicationCreateOrUpdateFormModal applicationItem={item} setOpenModal={setOpenModal} />)}
    </>
  )
}

export { ApplicationTable }
