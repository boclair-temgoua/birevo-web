/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { useAuth } from '../auth'
import { HelmetSite } from '../../utility/commons/helmet-site'
import { BillingBalanceAlert } from './hook/BillingBalanceAlert'
import { useQuery } from '@tanstack/react-query';
import { getOneAmountBilling } from './api/index';
import queryString from 'query-string';
import { OneAmountResponse } from './core/_moduls'
import { KTSVG } from '../../../_metronic/helpers'
import { formateDaysMonthYearFormatDays } from '../../utility/commons/formate-date-dayjs';
import { Link } from 'react-router-dom';


const BillingSuccessShow: FC = () => {
  // eslint-disable-next-line no-restricted-globals
  const { token } = queryString.parse(location.search);
  const userItem = useAuth();
  const intl = useIntl()

  const fetchOneAmount = async () => await getOneAmountBilling({ token: String(token) })
  const { data } = useQuery(['amount', token], () => fetchOneAmount(), {
    refetchOnWindowFocus: false,
  })
  const amount: OneAmountResponse = data?.data
  return (
    <>
      <HelmetSite title={`Billing success- ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />

      <BillingBalanceAlert />

      {/* <PageTitle breadcrumbs={[]}>Billing</PageTitle> */}
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>{userItem?.id && (`Billing success - ${userItem?.organization?.name}`)}</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>Over {userItem?.organizationTotal} organizations</span> */}
          </h3>
          {/* <div className="d-flex align-items-center py-1">
            <button type='button'
              className='btn btn-sm btn-flex btn-light-primary fw-bolder'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Make a payment
            </button>
          </div> */}
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>

          <div className="d-flex flex-column flex-xl-row">
            <div className="flex-lg-row-fluid me-xl-18 mb-10 mb-xl-0">
              <div className="mt-n1">
                <div className="d-flex flex-stack pb-10">
                  <div className="fw-bold fs-3 text-gray-800">{amount?.paymentMethod}</div>
                  {/* <a href="#" className="btn btn-sm btn-primary">Back</a> */}
                </div>
                <div className="m-0">
                  {/* <div className="fw-bold fs-3 text-gray-800 mb-8">Invoice #34782</div> */}
                  <div className="row g-5 mb-11">

                    <div className="col-sm-6">
                      <div className="fw-semibold fs-7 text-gray-600 mb-1">Issue Date:</div>
                      <div className="fw-bold fs-6 text-gray-800">{formateDaysMonthYearFormatDays(amount?.createdAt)}</div>

                    </div>
                    <div className="col-sm-6">
                      <div className="fw-semibold fs-7 text-gray-600 mb-1">Due Date:</div>
                      <div className="fw-bold fs-6 text-gray-800 d-flex align-items-center flex-wrap">
                        <span className="pe-2">{formateDaysMonthYearFormatDays(amount?.createdAt)}</span>
                        {/* <span className="fs-7 text-danger d-flex align-items-center">
                          <span className="bullet bullet-dot bg-danger me-2"></span>Due in 7 days</span> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="row g-5 mb-12">
                    <div className="col-sm-6">
                      <div className="fw-semibold fs-7 text-gray-600 mb-1">Issue For:</div>
                      <div className="fw-bold fs-6 text-gray-800">KeenThemes Inc.</div>
                      <div className="fw-semibold fs-7 text-gray-600">8692 Wild Rose Drive
                        <br />Livonia, MI 48150</div>
                    </div>
                    <div className="col-sm-6">
                      <div className="fw-semibold fs-7 text-gray-600 mb-1">Issued By:</div>
                      <div className="fw-bold fs-6 text-gray-800">CodeLab Inc.</div>
                      <div className="fw-semibold fs-7 text-gray-600">9858 South 53rd Ave.
                        <br />Matthews, NC 28104</div>
                    </div>
                  </div> */}
                  <div className="flex-grow-1">
                    <div className="table-responsive border-bottom mb-9">
                      <table className="table mb-3">
                        <thead>
                          <tr className="border-bottom fs-6 fw-bold text-muted">
                            <th className="min-w-175px pb-2">Description</th>
                            <th className="min-w-80px text-end pb-2">Rate</th>
                            <th className="min-w-100px text-end pb-2">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="fw-bold text-gray-700 fs-5 text-end">
                            <td className="d-flex align-items-center pt-6">
                              <i className="fa fa-genderless text-primary fs-2 me-2"></i>{amount?.description}</td>
                            <td className="pt-6">{amount?.amount && `${amount?.amount} ${amount?.currency}`}</td>
                            <td className="pt-6 text-dark fw-bolder">{amount?.amount && `${amount?.amount} ${amount?.currency}`}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="mw-300px">
                        <div className="d-flex flex-stack mb-3">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">Subtotal:</div>
                          <div className="text-end fw-bold fs-6 text-gray-800">{amount?.amount && `${amount?.amount} ${amount?.currency}`}</div>
                        </div>
                        <div className="d-flex flex-stack mb-3">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">VAT 0%</div>
                          <div className="text-end fw-bold fs-6 text-gray-800">0.00</div>
                        </div>
                        <div className="d-flex flex-stack mb-3">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">Subtotal + VAT</div>
                          <div className="text-end fw-bold fs-6 text-gray-800">{amount?.amount && `${amount?.amount} ${amount?.currency}`}</div>
                        </div>
                        <div className="d-flex flex-stack">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">Total</div>
                          <div className="text-end fw-bold fs-6 text-gray-800">{amount?.amount && `${amount?.amount} ${amount?.currency}`}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="m-0">
              <div className="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px p-9 bg-lighten">
                <div className="mb-8">
                  <span className="badge badge-light-success me-2">Approved</span>
                  <span className="badge badge-light-warning">Pending Payment</span>
                </div>
                <h6 className="mb-8 fw-bolder text-gray-600 text-hover-primary">PAYMENT DETAILS</h6>

                <div className="mb-6">
                  <div className="fw-semibold text-gray-600 fs-7">Paypal:</div>
                  <div className="fw-bold text-gray-800 fs-6">codelabpay@codelab.co</div>
                </div>
                <div className="mb-6">
                  <div className="fw-semibold text-gray-600 fs-7">Account:</div>
                  <div className="fw-bold text-gray-800 fs-6">Nl24IBAN34553477847370033
                    <br />AMB NLANBZTC</div>
                </div>
                <h6 className="mb-8 fw-bolder text-gray-600 text-hover-primary">PROJECT OVERVIEW</h6>
                <div className="mb-6">
                  <div className="fw-semibold text-gray-600 fs-7">Project Name</div>
                  <div className="fw-bold fs-6 text-gray-800">SaaS App Quickstarter
                    <a href="#" className="link-primary ps-1">View Project</a></div>
                </div>
              </div>
            </div> */}

          </div>



          <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
            <Link to={`/account/billing`} className='btn-flex btn-light-primary fw-bolder'>
              Back to billing
            </Link>
          </div>
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export { BillingSuccessShow }
