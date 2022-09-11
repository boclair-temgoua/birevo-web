import { useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { CreatePaypalBillingMutation, PayPalPayFormRequest } from '../../core/_moduls';
import { useNavigate } from 'react-router-dom';

const currency = 'EUR'
export const CreateBillingPayPal: React.FC = () => {
  const navigate = useNavigate();
  const [hasErrors, setHasErrors] = useState<any>(undefined)
  const [amount, setAmount] = useState<string>('5');

  const selectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const saveMutation = CreatePaypalBillingMutation({
    onSuccess: (result: any) => {
      setHasErrors(false);
      if (result?.token) { navigate(`/account/billing/success?token=${result?.token}`, { replace: true }) }
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    }
  });

  const handleApprove = (order: any) => {
    const amountPalpal = order?.purchase_units[0]?.amount
    setHasErrors(undefined)
    const data = { amount: Number(amountPalpal?.value), currency: amountPalpal?.currency_code }
    const payload: PayPalPayFormRequest = { ...data, paymentMethod: 'PAYPAL-PAY' }
    saveMutation.mutateAsync(payload)
  }

  const createOrder = (data: any, actions: any) => {
    return actions?.order?.create({
      purchase_units: [
        {
          description: 'Payment amount balance',
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
    })
  }

  return (
    <>
      <div className="mb-10 fv-row" id="kt_ecommerce_add_product_discount_fixed">
        {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )}
        <div className="row mb-6">
          <div className="col-md-8 fv-row fv-plugins-icon-container">
            <label className="form-label fw-bolder text-dark fs-6 mb-2">
              <span className={'required'}>{'Custom amount'}</span>
              <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
            </label>
            <input
              onChange={selectChange}
              className={`form-control`}
              type="text"
              placeholder="Custom amount"
              value={amount}
              name="amount"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-md-4 fv-row fv-plugins-icon-container">
            <label className="form-label fw-bolder text-dark fs-6 mb-2">
              <span className={'required'}>{'Currency'}</span>
              <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
            </label>
            <input
              className={`form-control`}
              type="text"
              placeholder="Currency"
              value={currency}
              name="currency"
              autoComplete="off"
              disabled
            />
          </div>
        </div>
        <div className="row mb-6">
          <PayPalScriptProvider
            options={{
              "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
              components: "buttons",
              currency: currency
            }}
          >
            <div className='text-center'>
              <PayPalButtons
                onClick={(data, actions) => {
                  const hasAllReadyExecuteTransaction: boolean = false
                  return hasAllReadyExecuteTransaction ? actions.reject() : actions?.resolve()
                }}
                disabled={false}
                style={{ layout: "horizontal" }}
                forceReRender={[amount, currency]}
                fundingSource={undefined}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={async (data, action) => {
                  const details = await action?.order?.capture()
                  const name = details?.payer?.name?.given_name;
                  return handleApprove(details)
                }}
                onCancel={() => { }}
                onError={(error) => {
                  setHasErrors(error)
                  console.log(`PayPal Checkout onError ====>`, error)
                }}
              />
            </div>
          </PayPalScriptProvider>
        </div>
        
      </div>
    </>
  );
}
