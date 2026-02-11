"use client";

import { CheckoutError } from "@/components/checkout/checkout-error";
import CheckoutForm from "@/components/checkout/checkout-form";
import { OrderItem, OrderSummary } from "@/components/checkout/order-summary";
import getStripe from "@/lib/checkout/get-stripejs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout"; // Pozor na správný import
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const stripe = getStripe();

  useEffect(() => {
    // Vytvoříme session hned po načtení stránky
    fetch(`/api/checkout-sessions/${id}`, {
      method: "POST", // Většinou se pro vytvoření session používá POST
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        // Ujisti se, že tvé API vrací přesně tento klíč
        setClientSecret(data.checkoutSessionClientSecret);
        if (data.orderItems) setOrderItems(data.orderItems);
        if (data.totalPrice) setTotalPrice(data.totalPrice);
      })
      .catch(() => {
        setError(
          "Omlouváme se, ale nastala chyba při vytváření platební brány. Prosíme o kontaktování supportu."
        );
      });
  }, [id]);

  // Pokud ještě nemáme secret, nemůžeme Stripe zobrazit
  if (!clientSecret && !error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <CheckoutError error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
        {/* Order Summary Column */}
        <div className="">
          <OrderSummary items={orderItems} totalPrice={totalPrice} />
        </div>

        {/* Checkout Form Column */}
        <div className="bg-background rounded-lg border shadow-sm p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
          <CheckoutProvider
            stripe={stripe}
            options={{ clientSecret: clientSecret! }}
          >
            <CheckoutForm />
          </CheckoutProvider>
        </div>
      </div>
    </div>
  );
}
