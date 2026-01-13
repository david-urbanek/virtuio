"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const orderSchema = z.object({
  firstName: z.string().min(1, "Jméno je povinné"),
  lastName: z.string().min(1, "Příjmení je povinné"),
  email: z.string().email("Neplatná emailová adresa"),
  phone: z.string().min(6, "Telefonní číslo je povinné"),
  street: z.string().min(1, "Ulice je povinná"),
  houseNumber: z.string().min(1, "Číslo popisné je povinné"),
  city: z.string().default("Brno"),
  // Změna: Očekáváme pole čísel (posíláme rovnou IDčka)
  headsetIds: z.array(z.number()).min(1, "Musíte vybrat alespoň jeden headset"),
  // Transformace Date -> ISO String přímo v Zodu
  fromDate: z.coerce.date().transform((d) => d.toISOString()),
  toDate: z.coerce.date().transform((d) => d.toISOString()),
});

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
  fields?: Record<string, string>;
  orderId?: number;
};

export async function createOrderAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();

  // Extract raw form data for persistence (fields)
  const fields: Record<string, string> = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    street: formData.get("street") as string,
    houseNumber: formData.get("houseNumber") as string,
    city: (formData.get("city") as string) || "Brno",
  };

  // 1. Příprava dat (všechno z formData na jeden zátah)
  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    street: formData.get("street"),
    houseNumber: formData.get("houseNumber"),
    city: formData.get("city") || "Brno", // Handle potential null if empty (though default covers validation)
    // Tady zajistíme, že z JSONu vylezou čísla
    headsetIds: JSON.parse((formData.get("headsetIds") as string) || "[]").map(
      Number
    ),
    fromDate: formData.get("fromDate"),
    toDate: formData.get("toDate"),
  };

  // 2. Validace a Transformace
  const validated = orderSchema.safeParse(rawData);

  if (!validated.success) {
    console.error("Validation failed:", validated.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Please fix the form errors.",
      fields,
    };
  }

  const { data } = validated;

  // 3. Volání RPC - Teď je to extrémně čisté
  const { data: orderId, error } = await supabase.rpc(
    "create_order_with_reservations",
    {
      p_name: data.firstName,
      p_surname: data.lastName,
      p_email: data.email,
      p_phone: data.phone,
      p_street: data.street,
      p_house_number: data.houseNumber,
      p_city: data.city,
      p_headset_ids: data.headsetIds,
      p_start_time: data.fromDate,
      p_end_time: data.toDate,
    }
  );

  if (error) {
    console.error("Supabase Error creating order:", error.message);
    return { success: false, message: error.message, fields };
  }

  return { success: true, orderId: orderId };
}
