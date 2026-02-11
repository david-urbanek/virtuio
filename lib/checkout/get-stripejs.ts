"use client";

import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      {
        betas: ["custom_checkout_tax_id_1"],
      }
    );
  }

  return stripePromise;
};

export default getStripe;
