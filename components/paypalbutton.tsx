"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

interface PaypalButtonProps {
  title: string;
  price: number;
}

export default function PaypalButton({ title, price }: PaypalButtonProps) {
  const [error, setError] = useState<null | Record<string, unknown>>(null);
  const [success, setSuccess] = useState(false);

  const handleApprove = (data: Record<string, unknown>, actions: any) => {
    return actions.order.capture().then((details: Record<string, any>) => {
      setSuccess(true);
      console.log("Transaction completed by " + details.payer.name.given_name);
      console.log("Product: " + title);
    });
  };

  const initialOptions = {
    clientId: "AeJyU6ho9J7SuD381WrgygEaS-Q3Jr5EpESjQFS0dmf0DB3VtuMylwknyHBsZ5ZsQ0MVcsFZcXG8b2Wn",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
    <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        // description: title, // Product description (optional)
                        amount: {
                            currency_code: "USD",
                            value: price.toFixed(2), // Use the price prop for the transaction amount
                        },
                    },
                ],
                intent: "CAPTURE"
            });
          }}
          onApprove={handleApprove}
          onError={(err) => {
            setError(err);
            console.error("PayPal Checkout Error: ", err);
          }}
        />
    </PayPalScriptProvider>
  );
}
