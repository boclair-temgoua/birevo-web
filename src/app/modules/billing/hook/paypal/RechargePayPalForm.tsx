import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { createStripeBilling } from '../../api'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from '../../../forms/TextInput';
import { StripePayFormRequest } from '../../core/_moduls';
import Swal from 'sweetalert2';



const schema = yup
    .object({
        amount: yup.number().positive().required(),
    })
    .required();

const RechargePayPalForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
    const { register, handleSubmit, reset, setValue,
        formState: { errors }
    } = useForm<any>({ resolver: yupResolver(schema), mode: "onChange" });
    const [success, setSuccess] = useState(false)
    // const stripe = useStripe()
    // const elements: any = useElements()



    const onSubmit = async (data: any) => {
        setLoading(true);
        setHasErrors(true);
        // if (!stripe || !elements) { return }
        // const payload = stripe
        //     ? await stripe.createPaymentMethod({
        //         type: "card",
        //         card: elements.getElement(CardElement),
        //     })
        //     : null;
        // const infoPaymentMethod = payload?.paymentMethod;
        const item: StripePayFormRequest = {  ...data };
        setTimeout(async () => {
            await createStripeBilling(item)
                .then((response) => {
                    setHasErrors(false);
                    setLoading(false)
                    reset()
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Transaction save successfully',
                        confirmButtonText: 'Got It',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        showCancelButton: false,
                        showClass: {
                            popup: 'animate__animated animate__bounceIn',
                        },
                    })
                })
                .catch((error) => {
                    setHasErrors(true)
                    setLoading(false)
                    setHasErrors(error.response.data.message);
                });
        }, 1000)

    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-6">
                    <div className="col-md-8 fv-row fv-plugins-icon-container">
                        <label className="form-label fw-bolder text-dark fs-6 mb-2">
                            <span className={'required'}>{'Custom amount'}</span>
                            <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                        </label>
                        <input
                            className={`form-control`}
                            type="number"
                            pattern="[0-9]*"
                            min="1"
                            step="1"
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="Custom amount"
                            required
                            {...register("amount", { value: 5 })}
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
                            {...register("currency", { value: "EUR" })}
                            autoComplete="off"
                            disabled
                        />
                    </div>
                </div>


                {/* begin::Action */}
                <div className='text-center'>
                    <button
                        type='submit'
                        className='btn btn-lg btn-primary w-100 mb-5'
                        disabled={loading}>
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

export default RechargePayPalForm