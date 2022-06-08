import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import RechargeStripeForm from "./RechargeStripeForm"

const PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
const stripeTestPromise = loadStripe(PUBLIC_KEY)
const StripeContainer = () => {

    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };
    return (
        <Elements stripe={stripeTestPromise} options={options}>
            <RechargeStripeForm />
        </Elements>
    )
}
export default StripeContainer