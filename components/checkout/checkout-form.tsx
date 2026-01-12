"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutForm() {
  const checkoutState = useCheckout();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    if (checkoutState.type === "success") {
      setIsLoading(true);
      setErrorMessage(undefined);

      try {
        const result = await checkoutState.checkout.confirm();

        if (result.type === "error") {
          const message = result.error.message;
          setErrorMessage(message);
          toast.error(message, {
            duration: 10000,
          });
          setTimeout(() => {
            setErrorMessage(undefined);
          }, 10000);
        } else {
          console.log("success");
          // Stripe redirects automatically on success
        }
      } catch (e) {
        toast.error("An unexpected error occurred");
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
        <form action={handleSubmit} className="w-full relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center gap-2 p-4 bg-background rounded-lg shadow-lg border">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium">Processing Payment...</p>
              </div>
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

            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      );
  }
}
