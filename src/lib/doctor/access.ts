import { getCookie } from "@tanstack/react-start/server";

import { DOCTOR_COOKIE_NAME, DOCTOR_COOKIE_VALUE } from "./cookies";

export function requireDoctorDashboardAccess() {
  if (getCookie(DOCTOR_COOKIE_NAME) !== DOCTOR_COOKIE_VALUE) {
    throw new Error("Unauthorized");
  }

  const accessKey = process.env.DOCTOR_DASHBOARD_SECRET;
  if (!accessKey) {
    throw new Error("MISSING_ENV:DOCTOR_DASHBOARD_SECRET");
  }

  return accessKey;
}

export function mapSupabaseRpcError(error: { code?: string; message: string }, fnName: string) {
  if (error.code === "PGRST202") {
    throw new Error(`RPC_NOT_FOUND:${fnName}`);
  }
  throw new Error(`SUPABASE:${error.message}`);
}
