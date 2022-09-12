/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, Fragment, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getUserAddressApi } from '../../user/api';
import { KTSVG } from '../../../../_metronic/helpers';
import { UserAddressCreateFormModal } from '../hook/UserAddressCreateFormModal';
import { UserAddressResponse } from '../core/_moduls';
import { UserAddressList } from '../hook/UserAddressList';

type Props = {
  className: string
  userItem: any
}
const UserAddressCard: FC<Props> = ({ className, userItem }) => {
  const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

  const fetchOneUserAddress = async () => await getUserAddressApi({ organizationId: userItem?.organization?.id })
  const { isLoading,
    isError, data } = useQuery(['userAddress'], () => fetchOneUserAddress())

  const dataTable = isLoading ? (<strong>Loading...</strong>) :
    isError ? (<strong>Error find data please try again...</strong>) :
      (data?.data?.length >= 0) &&
      (
        data?.data?.map((item: UserAddressResponse, index: number) => (
          <UserAddressList userAddress={item} key={index} />
        )))

  return (
    <>
      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Billing Settings</span>
          </h3>
          {data?.data?.length <= 0 && (
            <div className="d-flex align-items-center py-1">
              <button type='button'
                onClick={() => { setOpenCreateOrUpdateModal(true) }}
                className="btn btn-sm btn-flex btn-light-primary fw-bolder me-3">
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                Create Address
              </button>
            </div>
          )}

        </div>

        <div id='kt_account_signin_method' className='collapse show'>
          <div className='card-body border-top p-9'>

            <div id='kt_signin_email'>
              <div className='fs-6 fw-bolder mb-2'>Address</div>
              <div className='fw-bold text-gray-600 mb-6'>This address appears on your monthly invoice and should be the legal address of your home or business</div>
            </div>


            {dataTable}

          </div>
        </div>


        {openCreateOrUpdateModal && (<UserAddressCreateFormModal setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
      </div>
    </>

  )
}

export { UserAddressCard }
