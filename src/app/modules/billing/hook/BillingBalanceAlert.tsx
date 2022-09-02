/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../_metronic/helpers'
import { useAuth } from '../../auth';

const BillingBalanceAlert: React.FC = () => {
  const userItem = useAuth()
  const balanceAmount: number = userItem?.balance?.total;
  
  return (
    <>
      {balanceAmount < 0 && (
        <>
          <div className='notice d-flex bg-light-danger rounded border-danger border border-dashed p-6'>
            <KTSVG
              path='/media/icons/duotune/general/gen048.svg'
              className='svg-icon-2tx svg-icon-danger me-4'
            />
            <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
              <div className='mb-3 mb-md-0 fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>Payment Required</h4>
                <div className='fs-6 pe-7'>
                  Your account has a past due balance. Please submit a payment of <strong>{balanceAmount > 0 && '+'} {Number(((Math.abs(balanceAmount)) * (userItem?.currency?.amount)) || '0.00').toFixed(2).toLocaleString()} {userItem?.currency?.code}</strong> before Wednesday, Sep 21 to prevent account suspension.
                </div>
              </div>
              <Link to={`/account/billing`} className='btn btn-danger px-6 align-self-center text-nowrap'>Pay Now</Link>
            </div>
          </div>
          <br />
        </>
      )}
    </>
  )
}

export { BillingBalanceAlert }
