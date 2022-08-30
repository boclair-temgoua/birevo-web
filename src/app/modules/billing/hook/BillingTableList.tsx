/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';

type Props = {
  billing: any
}

const BillingTableList: React.FC<Props> = ({ billing }) => {
  return (
    <>
      <tr key={billing?.id}>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{billing?.paymentMethod}</td>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{billing?.amount} {billing?.currency}</td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(billing?.createdAt)}
          </a>
        </td>
      </tr>
    </>
  )
}

export { BillingTableList }
