"use client";
import { Button } from "@/components/ui/button";
import {
  BillingAddressElement,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js/checkout";

export default function CheckoutForm() {
  const checkoutState = useCheckout();

  const handleSubmit = (data: FormData) => {
    if (checkoutState.type === "success") {
      checkoutState.checkout.confirm().then((result) => {
        if (result.type === "error") {
          console.error(result.error);
        } else {
          console.log("success");
        }
      });
    }
  };

  switch (checkoutState.type) {
    case "loading":
      return <div>Loading ...</div>;
    case "error":
      return <div>Error: {checkoutState.error.message}</div>;
    case "success":
      return (
        <form action={handleSubmit} className="w-full">
          <div className="mb-6 w-full">
            <BillingAddressElement />
            <PaymentElement
              options={{
                layout: "tabs",
                fields: {
                  billingDetails: {
                    email: "auto",
                  },
                },
              }}
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Pay Now
          </Button>
        </form>
      );
  }
}
