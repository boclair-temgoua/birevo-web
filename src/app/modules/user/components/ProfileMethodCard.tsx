/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { ProfileMethodForm } from '../hook/ProfileMethodForm';
import { OneUserContextProps } from '../../auth/core/Auth';

type Props = {
  userItem: OneUserContextProps
}

const ProfileMethodCard: FC<Props> = ({ userItem }) => {

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>

          <ProfileMethodForm userItem={userItem} />

          <div className='separator separator-dashed my-6'></div>

        </div>
      </div>
    </div>
  )
}

export { ProfileMethodCard }
