import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("id", id);

  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("v_order_checkout_details")
    .select("*")
    .eq("order_id", id);

  if (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: `Supabase error: ${error}` },
      { status: 500 }
    );
  }

  console.log("order the order is", order);

  const email = order[0].customer_email;

  const items = order.map((item) => ({
    price_data: {
      currency: "czk",
      unit_amount: item.daily_rate * 100,
      product_data: {
        name: item.headset_name,
        description: item.headset_name,
      },
    },
    quantity: item.total_days,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      customer_email: email,
      ui_mode: "custom",
      currency: "czk",
      metadata: {
        orderId: id,
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      return_url: `http://localhost:3000/checkout/${id}/success`,
    });

    return NextResponse.json({
      checkoutSessionClientSecret: session.client_secret,
    });
  } catch (error) {
    console.error("Stripe error creating checkout session:", error);
    return NextResponse.json(
      { error: `Stripe error: ${error}` },
      { status: 500 }
    );
  }
}
