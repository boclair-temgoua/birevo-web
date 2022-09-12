/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, Fragment } from 'react';
import { UserAddressResponse } from '../core/_moduls';
import { UserAddressCreateFormModal } from './UserAddressCreateFormModal';

interface Props {
  userAddress?: UserAddressResponse | any
}

const UserAddressList: React.FC<Props> = ({ userAddress }) => {
  const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)


  return (
    <>
      <Fragment key={userAddress?.id}>
        <div className='d-flex flex-wrap align-items-center mb-3'>

          <div id='kt_signin_email'>
            <div className='fw-bold text-gray-600'>{userAddress?.street1}</div>
            <div className='fw-bold text-gray-600'>{userAddress?.street2}</div>
            <div className='fw-bold text-gray-600'>{userAddress?.city}, {userAddress?.region} {userAddress?.cap && (`- ${userAddress?.cap}`)}</div>
            <div className='fw-bold text-gray-600'>{userAddress?.country?.code} - {userAddress?.country?.name}</div>
          </div>

          <div id='kt_signin_email_button' className='ms-auto'>
            <button
              onClick={() => { setOpenCreateOrUpdateModal(true) }}
              className='btn btn-light btn-active-light-primary'>
              Edit Address
            </button>
          </div>
        </div>

        <div className='separator separator-dashed my-6'></div>
      </Fragment>
      {openCreateOrUpdateModal && (<UserAddressCreateFormModal userAddress={userAddress} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
    </>
  )
}

export { UserAddressList }
