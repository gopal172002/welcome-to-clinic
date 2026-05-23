import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined),
  age: z
    .string()
    .optional()
    .transform((v) => (v?.trim() ? Number(v) : undefined))
    .refine((v) => v === undefined || (Number.isFinite(v) && v >= 1 && v <= 120), {
      message: "Please enter a valid age.",
    }),
  date: z.string().optional(),
  time: z.string().optional(),
  notes: z
    .string()
    .trim()
    .max(2000, "Notes must be 2000 characters or fewer.")
    .optional()
    .transform((v) => v || undefined),
  sessionType: z.enum(["online", "offline"]),
});

export type BookingFormInput = z.input<typeof bookingSchema>;

export function parseBookingForm(data: FormData, sessionType: "online" | "offline") {
  const str = (key: string) => {
    const v = data.get(key);
    return v == null || v === "" ? undefined : String(v);
  };

  return bookingSchema.safeParse({
    name: data.get("name"),
    email: data.get("email"),
    phone: str("phone"),
    age: str("age"),
    date: str("date"),
    time: str("time"),
    notes: str("notes"),
    sessionType,
  });
}

export async function submitBookingRequest(
  parsed: z.infer<typeof bookingSchema>,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const row: TablesInsert<"bookings"> = {
    full_name: parsed.name,
    email: parsed.email,
    phone: parsed.phone ?? null,
    age: parsed.age ?? null,
    session_type: parsed.sessionType,
    preferred_date: parsed.date?.trim() || null,
    preferred_time: parsed.time?.trim() || null,
    notes: parsed.notes ?? null,
  };

  const { error } = await supabase.from("bookings").insert(row);

  if (error) {
    console.error("[bookings]", error);
    const devHint =
      import.meta.env.DEV && error.message ? ` (${error.message})` : "";
    return {
      ok: false,
      message: `Could not submit your request. Please try again or email barodhdevyani@gmail.com.${devHint}`,
    };
  }

  return { ok: true };
}
