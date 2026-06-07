export const DOCTOR_USERNAME = "doctor";
export const DOCTOR_PASSWORD_HASH =
  "2baf30662ba117835bf43eb2877e8987c7f1a90eb181390750554db42eb67499";
export const DOCTOR_COOKIE_NAME = "manonirmaan_doctor";
export const DOCTOR_COOKIE_VALUE =
  "1648e8742fdc9c5d9b2295c37c5d5e470d0d6ac042296ff8afc12735058993b9";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

export async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
