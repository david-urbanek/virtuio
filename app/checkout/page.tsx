"use client";

import CheckoutForm from "@/components/checkout/checkout-form";
import { OrderItem, OrderSummary } from "@/components/checkout/order-summary";
import getStripe from "@/lib/checkout/get-stripejs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout"; // Pozor na správný import
import { useEffect, useState } from "react";

// Mock Data matching the API endpoint hardcoded values
const MOCK_ITEMS: OrderItem[] = [
  {
    id: "1",
    name: "Rezervace VR Headsetu",
    quantity: 1,
    price: 500,
    dateRange: "Zítra - Pozítří",
  },
];

export default function Page() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const stripe = getStripe();

  useEffect(() => {
    // Vytvoříme session hned po načtení stránky
    fetch("/api/checkout-sessions", {
      method: "POST", // Většinou se pro vytvoření session používá POST
    })
      .then((res) => res.json())
      .then((data) => {
        // Ujisti se, že tvé API vrací přesně tento klíč
        setClientSecret(data.checkoutSessionClientSecret);
      })
      .catch((err) => console.error("Chyba při načítání session:", err));
  }, []);

  // Pokud ještě nemáme secret, nemůžeme Stripe zobrazit
  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
        {/* Order Summary Column */}
        <div className="">
          <OrderSummary items={MOCK_ITEMS} totalPrice={500} />
        </div>

        {/* Checkout Form Column */}
        <div className="bg-background rounded-lg border shadow-sm p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
          <CheckoutProvider stripe={stripe} options={{ clientSecret }}>
            <CheckoutForm />
          </CheckoutProvider>
        </div>
      </div>
    </div>
  );
}
