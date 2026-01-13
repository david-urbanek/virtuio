import { createClient } from "@/lib/supabase/server";

export async function getReservedReservations() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("reservations").select("*");
  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

export async function getVRHeadsets() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("vr_headsets").select("*");
  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
