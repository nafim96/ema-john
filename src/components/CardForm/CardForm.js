import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CardForm = ({addPaymentSuccess}) => {
  const stripe = useStripe();
  const elements = useElements();
  const[paymentError, setPaymentError]=useState(null)
  const[paymentSuccess, setPaymentSuccess]=useState('')

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
        setPaymentError(error.message)
      console.log("[error]", error);
      setPaymentSuccess(null)

    } else {
        setPaymentSuccess(paymentMethod.id)
        addPaymentSuccess(paymentMethod.id)
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentError(null)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
          paymentError && <p style={{color:"red"}}>{paymentError}</p>
      }
      {
          paymentSuccess && <p style={{color:"green"}}>Payment Successful</p>
      }
    </form>
  );
};

export default CardForm;
