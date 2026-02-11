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

  const email = order[0].customer_email;

  const name = order[0].customer_name + " " + order[0].customer_surname;

  const phone = order[0].customer_phone;

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
      customer_creation: "always",
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      return_url: `http://localhost:3000/checkout/${id}/success`,
    });

    const orderItems = order.map((item) => ({
      id: item.headset_id || item.id, // Fallback if headset_id isn't explicitly there, though it should be
      name: item.headset_name,
      quantity: item.total_days, // Assuming quantity logic is day-based as per user request
      price: item.daily_rate,
      dateRange: `${new Date(item.rental_period_start).toLocaleDateString(
        "cs-CZ"
      )} - ${new Date(item.rental_period_end).toLocaleDateString("cs-CZ")}`,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return NextResponse.json({
      checkoutSessionClientSecret: session.client_secret,
      orderItems,
      totalPrice,
    });
  } catch (error) {
    console.error("Stripe error creating checkout session:", error);
    return NextResponse.json(
      { error: `Stripe error: ${error}` },
      { status: 500 }
    );
  }
}
