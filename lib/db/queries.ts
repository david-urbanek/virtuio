"use server";

import { createClient } from "@/lib/supabase/server";

export async function getReservedReservations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("id,headset_id, start_time, end_time")
    .in("status", ["pending", "confirmed"]);
  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

export async function getVRHeadsets() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vr_headsets")
    .select("id, name, daily_rate");
  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
