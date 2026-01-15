import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("params", { id });
  const orderId = id;

  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: `Supabase error: ${error}` },
      { status: 500 }
    );
  }

  console.log("order the order is", order);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "czk",
            unit_amount: 50000, // Pozor: 500.00 CZK (v haléřích/setinách!)
            product_data: {
              name: "Vlastní název produktu",
              description: "Tady můžeš napsat cokoliv",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: "urbanek.david@email.cz",
      ui_mode: "custom",
      currency: "czk",
      metadata: {
        orderId: "13",
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      // The URL of your payment completion page
      return_url: "http://localhost:3000/checkout/success",
    });

    return NextResponse.json({
      checkoutSessionClientSecret: session.client_secret,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
