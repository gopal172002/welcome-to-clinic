import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

export type BookingValidationMessages = {
  name: string;
  email: string;
  age: string;
  notes: string;
  referralDetails: string;
  videoCallPreference: string;
};

const defaultBookingMessages: BookingValidationMessages = {
  name: "Please enter your full name.",
  email: "Please enter a valid email address.",
  age: "Please enter a valid age.",
  notes: "Notes must be 2000 characters or fewer.",
  referralDetails: "Referral details must be 200 characters or fewer.",
  videoCallPreference: "Please choose your preferred video call platform.",
};

export const sessionLanguageOptions = ["english", "hindi", "either"] as const;
export const videoCallPlatformOptions = [
  "zoom",
  "google_meet",
  "microsoft_teams",
  "no_preference",
] as const;
export const referralSourceOptions = [
  "facebook",
  "instagram",
  "whatsapp",
  "friend",
  "patient",
  "other",
] as const;

type SessionLanguage = (typeof sessionLanguageOptions)[number];
type VideoCallPlatform = (typeof videoCallPlatformOptions)[number];
type ReferralSource = (typeof referralSourceOptions)[number];

export type BookingRequestNoteLabels = {
  languagePreference: string;
  languageValue: string;
  referralSource: string;
  referralValue?: string;
  referralDetails: string;
  notes: string;
};

function createBookingSchema(messages: BookingValidationMessages = defaultBookingMessages) {
  return z
    .object({
      name: z.string().trim().min(2, messages.name),
      email: z.string().trim().email(messages.email),
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
          message: messages.age,
        }),
      date: z.string().optional(),
      time: z.string().optional(),
      notes: z
        .string()
        .trim()
        .max(2000, messages.notes)
        .optional()
        .transform((v) => v || undefined),
      sessionLanguage: z.enum(sessionLanguageOptions),
      videoCallPreference: z.enum(videoCallPlatformOptions).optional(),
      referralSource: z.enum(referralSourceOptions).optional(),
      referralDetails: z
        .string()
        .trim()
        .max(200, messages.referralDetails)
        .optional()
        .transform((v) => v || undefined),
      sessionType: z.enum(["online", "offline"]),
    })
    .superRefine((data, ctx) => {
      if (data.sessionType === "online" && !data.videoCallPreference) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages.videoCallPreference,
          path: ["videoCallPreference"],
        });
      }
    });
}

const defaultBookingSchema = createBookingSchema();

export type BookingFormInput = z.input<typeof defaultBookingSchema>;

export function parseBookingForm(
  data: FormData,
  sessionType: "online" | "offline",
  messages: BookingValidationMessages = defaultBookingMessages,
) {
  const str = (key: string) => {
    const v = data.get(key);
    return v == null || v === "" ? undefined : String(v);
  };

  return createBookingSchema(messages).safeParse({
    name: data.get("name"),
    email: data.get("email"),
    phone: str("phone"),
    age: str("age"),
    date: str("date"),
    time: str("time"),
    notes: str("notes"),
    sessionLanguage: str("sessionLanguage") ?? "either",
    videoCallPreference:
      sessionType === "online" ? str("videoCallPreference") : undefined,
    referralSource: str("referralSource"),
    referralDetails: str("referralDetails"),
    sessionType,
  });
}

export async function submitBookingRequest(
  parsed: z.infer<typeof defaultBookingSchema>,
  failureMessage = "Could not submit your request. Please try again or email manonirmaan@gmail.com.",
  noteLabels?: BookingRequestNoteLabels,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const notes = buildBookingNotes(parsed, noteLabels);
  const row: TablesInsert<"bookings"> = {
    full_name: parsed.name,
    email: parsed.email,
    phone: parsed.phone ?? null,
    age: parsed.age ?? null,
    session_type: parsed.sessionType,
    preferred_date: parsed.date?.trim() || null,
    preferred_time: parsed.time?.trim() || null,
    video_call_preference:
      parsed.sessionType === "online" ? (parsed.videoCallPreference ?? null) : null,
    notes,
  };

  const { error } = await supabase.from("bookings").insert(row);

  if (error) {
    console.error("[bookings]", error);
    const devHint =
      import.meta.env.DEV && error.message ? ` (${error.message})` : "";
    return {
      ok: false,
      message: `${failureMessage}${devHint}`,
    };
  }

  return { ok: true };
}

function buildBookingNotes(
  parsed: z.infer<typeof defaultBookingSchema>,
  labels?: BookingRequestNoteLabels,
) {
  if (!labels) {
    return parsed.notes ?? null;
  }

  const lines = [
    `${labels.languagePreference}: ${labels.languageValue}`,
    labels.referralValue ? `${labels.referralSource}: ${labels.referralValue}` : undefined,
    parsed.referralDetails ? `${labels.referralDetails}: ${parsed.referralDetails}` : undefined,
    parsed.notes ? "" : undefined,
    parsed.notes ? `${labels.notes}:` : undefined,
    parsed.notes,
  ].filter((line): line is string => line !== undefined);

  return lines.length > 0 ? lines.join("\n") : null;
}
