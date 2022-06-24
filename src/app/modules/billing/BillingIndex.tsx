/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { useAuth } from '../auth'
import { HelmetSite } from '../../utility/commons/helmet-site'
import { BillingTables } from './components/BillingTables'
import { CreateBillingCoupon } from './hook/coupon/CreateBillingCoupon'
import { CreateBillingStripe } from './hook/stripe/CreateBillingStripe'
import { CreateBillingPayPal } from './hook/paypal/CreateBillingPayPal';


const BillingIndex: FC = () => {
  const [paymentMake, setPaymentMake] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('card')
  const userItem = useAuth();
  const intl = useIntl()

  const handlePaymentMake = () => {
    setPaymentMake(!paymentMake)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPaymentMethod(e.target.value)
  }
  const billingAmount: number = userItem?.billing?.total;

  return (
    <>
      <HelmetSite title={`Billing - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <PageTitle breadcrumbs={[]}>Billing</PageTitle>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Billing - {userItem?.organization?.name}</span>
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

          <span className="fs-5 fw-bold text-gray-600 pb-5 d-block">Last 30 day earnings calculated. Apart from arranging the order of topics.</span>
          <div className="d-flex flex-wrap justify-content-between pb-6">
            <div className="d-flex flex-wrap">
              <span className="fs-1x fw-bolder text-gray-800 lh-1">
                <h1 data-kt-countup="true" data-kt-countup-value={Math.abs(billingAmount) || '0'} data-kt-countup-prefix={userItem?.currency?.code} className="counted">{billingAmount > 0 && '+'} {Number(((Math.abs(billingAmount)) * (userItem?.currency?.amount)) || '0.00').toFixed(2).toLocaleString()} {userItem?.currency?.code}</h1>
              </span>
            </div>
            <button onClick={() => handlePaymentMake()} className="btn btn-primary px-6 flex-shrink-0 align-self-center">Make a payment</button>
          </div>

          {paymentMake && (
            <>
              {/* begin::Table container */}
              <h5 className='fw-bolder d-flex align-items-center text-dark'>
                Choose Payments Methods
                <i className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Billing is issued based on your selected account type'></i>
              </h5>

              <div className='text-gray-400 fw-bold fs-6'>
                If you need more info, please check out
                <a href='/dashboard' className='link-primary fw-bolder'>
                  {' '}
                  Help Page
                </a>
              </div>

              <div className="fv-row mb-10">

                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9 mb-6">
                  <div className="col">
                    <label className="btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-6" data-kt-button="true">
                      <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={handleChange}
                        />
                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">Card</span>
                      </span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-6" data-kt-button="true">
                      <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={handleChange}
                        />
                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">PayPal</span>
                      </span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-6" data-kt-button="true">
                      <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          value="coupon"
                          checked={paymentMethod === 'coupon'}
                          onChange={handleChange} />
                      </span>
                      <span className="ms-5">
                        <span className="fs-4 fw-bolder text-gray-800 d-block">Coupon</span>
                      </span>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'card' && <CreateBillingStripe userItem={userItem} />}

                {paymentMethod === 'paypal' && <CreateBillingPayPal />}

                {paymentMethod === 'coupon' && <CreateBillingCoupon />}

              </div>
            </>
          )}
        </div>
        {/* begin::Body */}
      </div>
      <BillingTables className='mb-5 mb-xl-8' />
    </>
  )
}

export { BillingIndex }
