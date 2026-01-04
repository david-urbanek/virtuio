"use server";

import { createClient } from "@/lib/supabase/server";

export type ActionState = {
  success?: boolean;
  message?: string;
  orderId?: any;
};

export async function createOrderAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();

  const rawData = {
    name: formData.get("firstName") as string,
    surname: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    street: formData.get("street") as string,
    houseNumber: formData.get("houseNumber") as string,
    city: "Brno",
    headsetIds: JSON.parse((formData.get("headsetIds") as string) || "[]"),
    from: formData.get("fromDate") as string,
    to: formData.get("toDate") as string,
  };

  // Basic validation check
  if (
    !rawData.name ||
    !rawData.surname ||
    !rawData.email ||
    !rawData.phone ||
    !rawData.street ||
    !rawData.houseNumber
  ) {
    return { success: false, message: "Please fill in all required fields." };
  }

  // Call RPC
  const { data, error } = await supabase.rpc("create_order_with_reservations", {
    p_name: rawData.name,
    p_surname: rawData.surname,
    p_email: rawData.email,
    p_phone: rawData.phone,
    p_street: rawData.street,
    p_house_number: rawData.houseNumber,
    p_city: rawData.city,
    p_headset_ids: rawData.headsetIds,
    p_start_time: rawData.from,
    p_end_time: rawData.to,
  });

  if (error) {
    // Return error message from DB (e.g. "Headset ID X is occupied")
    return { success: false, message: error.message };
  }

  return { success: true, orderId: data };
}
