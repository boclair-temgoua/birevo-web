import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { RechargeStripeForm } from './RechargeStripeForm';

const PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export const CreateBillingStripe: React.FC<{ userItem: any }> = ({ userItem }) => {

  return (
    <>
      <Elements stripe={stripeTestPromise}>
        <RechargeStripeForm userItem={userItem} />
      </Elements>

    </>
  )
}
