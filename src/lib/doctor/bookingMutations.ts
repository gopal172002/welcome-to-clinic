import { createServerSupabaseClient } from "@/integrations/supabase/server";
import type { Tables } from "@/integrations/supabase/types";

import { mapSupabaseRpcError, requireDoctorDashboardAccess } from "./access";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

const BOOKING_STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled"];

export function isBookingStatus(value: string): value is BookingStatus {
  return BOOKING_STATUSES.includes(value as BookingStatus);
}

export async function updateDoctorBookingStatusInDB(
  bookingId: string,
  status: BookingStatus,
): Promise<Tables<"bookings">> {
  const accessKey = requireDoctorDashboardAccess();
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.rpc("update_doctor_booking_status", {
    access_key: accessKey,
    booking_id: bookingId,
    new_status: status,
  });

  if (error) {
    mapSupabaseRpcError(error, "update_doctor_booking_status");
  }

  if (!data) {
    throw new Error("SUPABASE:Booking not found");
  }

  return data;
}

export async function deleteDoctorBookingFromDB(bookingId: string) {
  const accessKey = requireDoctorDashboardAccess();
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.rpc("delete_doctor_booking", {
    access_key: accessKey,
    booking_id: bookingId,
  });

  if (error) {
    mapSupabaseRpcError(error, "delete_doctor_booking");
  }

  return { ok: true as const };
}
