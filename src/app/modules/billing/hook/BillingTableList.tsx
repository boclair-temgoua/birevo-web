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
        <td>
          <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
            56037-XDER
          </a>
        </td>
        <td>
          <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            Brasil
          </a>
          <span className='text-muted fw-bold text-muted d-block fs-7'>Code: PH</span>
        </td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(billing?.createdAt)}
          </a>
        </td>
        <td>
          <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            Intertico
          </a>
          <span className='text-muted fw-bold text-muted d-block fs-7'>
            Web, UI/UX Design
          </span>
        </td>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>$3560</td>
        <td>
          <span className='badge badge-light-success'>Approved</span>
        </td>
        <td className='text-end'>
          <a
            href='#'
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
          </a>
          <a
            href='#'
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </a>
          <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </a>
        </td>
      </tr>
    </>
  )
}

export { BillingTableList }
