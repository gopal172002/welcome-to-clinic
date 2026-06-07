import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";

import {
  DOCTOR_COOKIE_NAME,
  DOCTOR_COOKIE_VALUE,
  DOCTOR_PASSWORD_HASH,
  DOCTOR_USERNAME,
  SESSION_TTL_SECONDS,
  sha256Hex,
} from "@/lib/doctor/cookies";

type DoctorLoginInput = {
  username: string;
  password: string;
};

function parseDoctorLoginInput(input: unknown): DoctorLoginInput {
  if (!input || typeof input !== "object") {
    return { username: "", password: "" };
  }

  const fields = input as Record<string, unknown>;
  return {
    username: typeof fields.username === "string" ? fields.username : "",
    password: typeof fields.password === "string" ? fields.password : "",
  };
}

export const loginDoctor = createServerFn({ method: "POST" })
  .inputValidator(parseDoctorLoginInput)
  .handler(async ({ data }) => {
    const normalizedUsername = data.username.trim().toLowerCase();
    const passwordHash = await sha256Hex(data.password);
    const isValid =
      normalizedUsername === DOCTOR_USERNAME && passwordHash === DOCTOR_PASSWORD_HASH;

    if (!isValid) {
      return { ok: false as const };
    }

    setCookie(DOCTOR_COOKIE_NAME, DOCTOR_COOKIE_VALUE, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });

    return { ok: true as const };
  });
