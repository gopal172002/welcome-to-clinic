import { createServerSupabaseClient } from "@/integrations/supabase/server";

import { mapSupabaseRpcError, requireDoctorDashboardAccess } from "./access";

export async function fetchDoctorBookingsFromDB() {
  const accessKey = requireDoctorDashboardAccess();
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_doctor_bookings", {
    access_key: accessKey,
  });

  if (error) {
    mapSupabaseRpcError(error, "get_doctor_bookings");
  }

  return data ?? [];
}
