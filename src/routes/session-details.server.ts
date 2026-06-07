import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";

import {
  deleteDoctorBookingFromDB,
  isBookingStatus,
  updateDoctorBookingStatusInDB,
} from "@/lib/doctor/bookingMutations";
import { DOCTOR_COOKIE_NAME } from "@/lib/doctor/cookies";
import { fetchDoctorBookingsFromDB } from "@/lib/doctor/fetchBookings";

type BookingActionInput = {
  bookingId: string;
  status?: string;
};

function parseBookingIdInput(input: unknown): BookingActionInput {
  if (!input || typeof input !== "object") {
    return { bookingId: "" };
  }

  const fields = input as Record<string, unknown>;
  return {
    bookingId: typeof fields.bookingId === "string" ? fields.bookingId : "",
    status: typeof fields.status === "string" ? fields.status : undefined,
  };
}

export const getDoctorBookings = createServerFn({ method: "POST" }).handler(async () => {
  return fetchDoctorBookingsFromDB();
});

export const updateDoctorBookingStatus = createServerFn({ method: "POST" })
  .inputValidator(parseBookingIdInput)
  .handler(async ({ data }) => {
    if (!data.bookingId) {
      throw new Error("Invalid booking id");
    }
    if (!data.status || !isBookingStatus(data.status)) {
      throw new Error("Invalid status");
    }

    return updateDoctorBookingStatusInDB(data.bookingId, data.status);
  });

export const deleteDoctorBooking = createServerFn({ method: "POST" })
  .inputValidator(parseBookingIdInput)
  .handler(async ({ data }) => {
    if (!data.bookingId) {
      throw new Error("Invalid booking id");
    }

    return deleteDoctorBookingFromDB(data.bookingId);
  });

export const logoutDoctor = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(DOCTOR_COOKIE_NAME, { path: "/" });
  return { ok: true as const };
});
