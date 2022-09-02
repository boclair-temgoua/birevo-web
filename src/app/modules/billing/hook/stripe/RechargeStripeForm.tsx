import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { createStripeBilling } from '../../api'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from '../../../forms/TextInput';
import { CreateStripeBillingMutation, StripePayFormRequest } from '../../core/_moduls';
import Swal from 'sweetalert2';


const containerStyles = {
    border: '1px solid #d3d3d3',
    padding: '12px 17px 12px 17px',
    borderRadius: '10px',
    width: '100%',
};

const CARD_OPTIONS: any = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#424770",
            // lineHeight: '24px',
            fontWeight: 600,
            fontFamily: "Roboto, Source Code Pro, monospace, Open Sans, Segoe UI, sans-serif",
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

const schema = yup
    .object({
        amount: yup.number().min(5).positive().required(),
    })
    .required();

export const RechargeStripeForm: React.FC<{ userItem: any }> = ({ userItem }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
    const [hasStripeErrors, setHasStripeErrors] = useState<boolean | string | undefined>(undefined)
    const { register, handleSubmit, reset, setValue,
        formState: { errors }
    } = useForm<StripePayFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements: any = useElements()

    const saveMutation = CreateStripeBillingMutation({
        onSuccess: () => {
            setHasErrors(false);
            setLoading(false)
        },
        onError: (error?: any) => {
            setHasErrors(true);
            setLoading(false);
            setHasErrors(error.response.data.message);
        }
    });


    const onSubmit = (data: any) => {
        setLoading(true);
        setHasErrors(true);
        setTimeout(async () => {
            if (!stripe || !elements) { return }
            const item = stripe
                ? await stripe.createPaymentMethod({
                    type: "card",
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: data?.fullName,
                        email: data?.email,
                    },
                })
                : null;

            if (item?.error) { setHasStripeErrors(item?.error.message); }
            const infoPaymentMethod = item?.paymentMethod;
            const payload: StripePayFormRequest = { infoPaymentMethod, ...data };
            saveMutation.mutateAsync(payload)
        }, 1000)
    };

    return (
        <>
            {hasStripeErrors && (
                <div className="text-center alert alert-danger">
                    <div className="d-flex flex-column">
                        <h4 className="mb-1 text-danger">Error</h4>
                        <span>{hasStripeErrors}</span>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-6">
                    <div className="col-md-8 fv-row fv-plugins-icon-container">
                        <label className="form-label fw-bolder text-dark fs-6 mb-2">
                            <span className={'required'}>{'Custom amount'}</span>
                            <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                        </label>
                        <input
                            className={`form-control ${errors?.amount ? "is-invalid" : ""}`}
                            type="number"
                            pattern="[0-9]*"
                            min="1"
                            step="1"
                            id="amount"
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="Custom amount"
                            required
                            {...register("amount", { value: userItem?.balance?.total > 0 ? 5 : -(userItem?.balance?.total) })}
                        />
                        {errors?.amount && (
                            <span className='invalid-feedback'>
                                <strong>{errors?.amount.message}</strong>
                            </span>
                        )}
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
                            id="currency"
                            {...register("currency", { value: "EUR" })}
                            autoComplete="off"
                            disabled
                        />
                    </div>
                </div>
                <div className="row mb-6">
                    <div className="col-md-6 fv-row fv-plugins-icon-container">
                        <TextInput
                            className="form-control form-control-lg"
                            labelFlex="Full Name"
                            register={register}
                            errors={errors}
                            name="fullName"
                            type="text"
                            autoComplete="one"
                            placeholder="Enter your name"
                            validation={{ required: true }}
                            isRequired={true}
                            required="required"
                        />
                    </div>
                    <div className="col-md-6 fv-row fv-plugins-icon-container">
                        <TextInput
                            className="form-control form-control-lg"
                            labelFlex="Email address"
                            register={register}
                            errors={errors}
                            name="email"
                            type="email"
                            autoComplete="one"
                            placeholder="Enter your email address"
                            validation={{ required: true }}
                            isRequired={true}
                            required="required"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="mb-6">
                        <div style={containerStyles}>
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </div>
                </div>

                {/* begin::Action */}
                <div className='text-center'>
                    <button
                        type='submit'
                        className='btn btn-lg btn-primary w-100 mb-5'
                        disabled={loading || !stripe || !elements}>
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
    )
}

// export default RechargeStripeForm