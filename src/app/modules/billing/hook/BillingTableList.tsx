/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../../_metronic/helpers';
import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';

type Props = {
  billing: any
}

const BillingTableList: React.FC<Props> = ({ billing }) => {
  return (
    <>
      <tr key={billing?.id}>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{billing?.description}</td>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{billing?.amount} {billing?.currency}</td>
        <td>
          <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {formateDateDayjs(billing?.createdAt)}
          </a>
        </td>

        <td className='text-end'>
          <a href={`${billing?.urlPdf}`} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/svg/files/pdf.svg' className='svg-icon-1' />
          </a>

          {billing?.type === 'BALANCE' && (
            <a href={`${billing?.urlXml}`} className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
              <KTSVG path='/media/svg/files/xml.svg' className='svg-icon-1' />
            </a>
          )}
        </td>
      </tr>
    </>
  )
}

export { BillingTableList }
