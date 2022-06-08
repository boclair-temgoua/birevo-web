import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import axios from "axios"

const CARD_OPTIONS: any = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#7367f0",
            fontWeight: 600,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "red",
            color: "red"
        }
    }
}

const RechargeStripeForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
    // const history = useHistory()
    // const [inputs, setInputs] = useState<any>({ total: '', currency: 'EUR', name: 'Stripe recharge' })
    const [billingDetails, setBillingDetails] = useState<{
        amount: string;
        email: string;
        phone: string;
        fullName: string;
        currency: string;
        isCardsPay: boolean;
    }>({
        amount: '',
        email: "",
        phone: "",
        fullName: "",
        currency: "EUR",
        isCardsPay: true,
    });
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements: any = useElements()



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setHasErrors(false);

        // if (!stripe || !elements) {
        //   // Stripe.js has not loaded yet. Make sure to disable
        //   // form submission until Stripe.js has loaded.
        //   return ;
        // }

        // if (error) {
        //   elements.getElement("card").focus();
        //   return;
        // }

        // if (cardComplete) {
        //   setProcessing(true);
        // }

        const payload = stripe
            ? await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            })
            : null;

        // setProcessing(false);

        try {
            const infoPaymentMethod = payload?.paymentMethod;
            const item = { infoPaymentMethod, billingDetails };
            console.log("item =====>", item);
            const response = await axios.post(
                `http://localhost:5000/api/v1/subscribes-users/create`,
                item
            );

            console.log("payload =====>", payload);
        } catch (error) {
            console.log("Error", error);
        }

        // if (payload.error) {
        //   setError(payload.error);
        // } else {
        //   setPaymentMethod(payload.paymentMethod);
        // }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setBillingDetails({ ...billingDetails, [name]: value })
    }

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault()
    //     // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     //     type: "card",
    //     //     card: elements.getElement(CardElement)
    //     // })
    // }

    return (
        <>
            {!success && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-6">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="form-label fw-bolder text-dark fs-6 mb-2">
                                    <span className={'required'}>{'Full name'}</span>
                                    <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                                </label>
                                <input
                                    className={`form-control`}
                                    type="text" id="fullName" name="fullName"
                                    autoComplete="one"
                                    value={billingDetails.fullName} onChange={handleChange}
                                    placeholder="Full name" required />
                            </div>
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="form-label fw-bolder text-dark fs-6 mb-2">
                                    <span>{'Email address'}</span>
                                </label>
                                <input
                                    className={`form-control`}
                                    type="email" id="email" name="email"
                                    autoComplete="one"
                                    value={billingDetails.email} onChange={handleChange}
                                    placeholder="Email address" />
                            </div>
                        </div>

                        <div className="row mb-6">
                            <CardElement options={CARD_OPTIONS} />
                        </div>

                        {/* begin::Action */}
                        <div className='text-center'>
                            <button
                                type='submit'
                                className='btn btn-lg btn-primary w-100 mb-5'
                                disabled={loading}
                            >
                                {!loading && <span className='indicator-label'>Submit Payment</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Please wait...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>
                            {/* end::Google link */}
                        </div>
                        {/* end::Action */}
                    </form>
                </>
            )}
        </>
    )
}

export default RechargeStripeForm