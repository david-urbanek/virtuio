"use server";

import { createClient } from "@/lib/supabase/server";

export async function createOrderAction(formData: any) {
  const supabase = await createClient();

  // Zavoláme naši SQL funkci přes .rpc()
  const { data, error } = await supabase.rpc("create_order_with_reservations", {
    p_name: formData.name,
    p_surname: formData.surname,
    p_email: formData.email,
    p_phone: formData.phone,
    p_street: formData.street,
    p_house_number: formData.houseNumber,
    p_city: formData.city,
    p_headset_ids: formData.headsetIds,
    p_start_time: formData.from,
    p_end_time: formData.to,
  });

  if (error) {
    // Tady zachytíš tu zprávu z RAISE EXCEPTION 'Headset ID % je obsazen'
    return { success: false, message: error.message };
  }

  return { success: true, orderId: data };
}
