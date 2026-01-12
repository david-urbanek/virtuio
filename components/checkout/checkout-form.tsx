"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { useState } from "react";

import { AlertCircle, Loader2 } from "lucide-react";

export default function CheckoutForm() {
  const checkoutState = useCheckout();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkoutState.type === "success") {
      setIsLoading(true);
      console.log("loading");
      console.log(isLoading);
      setErrorMessage(undefined);

      try {
        const result = await checkoutState.checkout.confirm();

        if (result.type === "error") {
          const message = result.error.message;
          setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage(undefined);
          }, 10000);
        } else {
          console.log("success");
          // Stripe redirects automatically on success
        }
      } catch (e) {
        setErrorMessage("An unexpected error occurred");
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 10000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  switch (checkoutState.type) {
    case "loading":
      return (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    case "error":
      return <div>Error: {checkoutState.error.message}</div>;
    case "success":
      return (
        <form onSubmit={handleSubmit} className="w-full relative">
          {errorMessage && (
            <div className="fixed top-4 right-4 z-[100] w-full max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Chyba platby</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="mb-6 w-full gap-4 flex flex-col">
            {/* <BillingAddressElement /> */}
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
          <Button
            type="submit"
            className="w-full text-lg"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Platba se zpracovává...
              </>
            ) : (
              "Zaplatit"
            )}
          </Button>
        </form>
      );
  }
}
