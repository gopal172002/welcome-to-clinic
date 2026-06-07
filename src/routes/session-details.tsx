import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, FileText, LogOut, Mail, Phone, RefreshCw, Trash2, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Layout } from "@/components/Layout";
import { clearDoctorSession } from "@/lib/doctorAuth";
import { getDoctorBookings, deleteDoctorBooking, logoutDoctor, updateDoctorBookingStatus } from "@/routes/session-details.server";
import type { BookingStatus } from "@/lib/doctor/bookingMutations";
import { videoCallPlatformOptions } from "@/lib/bookings";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings">;

export const Route = createFileRoute("/session-details")({
  head: () => ({
    meta: [
      { title: "Session Details - ManoNirmaan" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SessionDetails,
});

function SessionDetails() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    document.title = t("doctor.dashboard.metaTitle");
  }, [i18n.language, t]);

  const bookingsQuery = useQuery({
    queryKey: ["doctor-bookings"],
    queryFn: async () => {
      try {
        return await getDoctorBookings();
      } catch (error) {
        if (error instanceof Error && error.message.includes("Unauthorized")) {
          setAuthenticated(false);
          void navigate({ to: "/doctor-login" });
        }
        throw error;
      }
    },
  });

  const bookings = useMemo(() => bookingsQuery.data ?? [], [bookingsQuery.data]);

  function handleLogout() {
    clearDoctorSession();
    void logoutDoctor();
    void navigate({ to: "/doctor-login" });
  }

  if (authenticated === false) {
    return (
      <Layout>
        <section className="mx-auto max-w-xl px-6 lg:px-10 py-24 text-center">
          <h1 className="font-serif text-4xl mb-4">{t("doctor.dashboard.loginRequired")}</h1>
          <Link to="/doctor-login" className="btn-primary">
            {t("doctor.dashboard.goToLogin")}
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 lg:pt-28 pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-6">{t("doctor.dashboard.eyebrow")}</p>
            <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
              {t("doctor.dashboard.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-foreground/75 leading-relaxed">
              {t("doctor.dashboard.body")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void bookingsQuery.refetch()}
              className="btn-ghost !py-3"
              disabled={bookingsQuery.isFetching}
            >
              <RefreshCw size={14} className={bookingsQuery.isFetching ? "animate-spin" : ""} />
              {t("doctor.dashboard.refresh")}
            </button>
            <button type="button" onClick={handleLogout} className="btn-primary !py-3">
              <LogOut size={14} />
              {t("doctor.dashboard.logout")}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard label={t("doctor.dashboard.total", { count: bookings.length })} value={bookings.length} />
          <SummaryCard label={t("doctor.dashboard.status")} value={activeStatusLabel(bookings)} />
          <SummaryCard label={t("doctor.dashboard.received")} value={latestReceived(bookings, t("doctor.dashboard.notProvided"))} />
        </div>

        <div className="border border-border bg-background rounded-sm overflow-hidden">
          {bookingsQuery.isLoading ? (
            <div className="p-10 text-center text-muted-foreground">{t("doctor.dashboard.loading")}</div>
          ) : bookingsQuery.isError ? (
            <div className="p-10 text-center space-y-3">
              <p className="text-red-600">{getDashboardErrorMessage(bookingsQuery.error, t)}</p>
              {getDashboardErrorHint(bookingsQuery.error, t) && (
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  {getDashboardErrorHint(bookingsQuery.error, t)}
                </p>
              )}
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">{t("doctor.dashboard.empty")}</div>
          ) : (
            <div className="divide-y divide-border">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onChanged={() => void bookingsQuery.refetch()}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function SummaryCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border border-border bg-background p-5 rounded-sm">
      <div className="eyebrow mb-2">{label}</div>
      <div className="font-serif text-3xl">{value}</div>
    </div>
  );
}

function BookingCard({
  booking,
  onChanged,
}: {
  booking: Booking;
  onChanged: () => void;
}) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(booking.status);
  const [busy, setBusy] = useState<"status" | "delete" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const statusOptions: BookingStatus[] = ["pending", "confirmed", "cancelled"];

  const sessionLines = [
    `${t("doctor.dashboard.type")}: ${booking.session_type}`,
    `${t("doctor.dashboard.date")}: ${booking.preferred_date ?? t("doctor.dashboard.notProvided")}`,
    `${t("doctor.dashboard.time")}: ${booking.preferred_time ?? t("doctor.dashboard.notProvided")}`,
  ];

  if (booking.session_type === "online" && booking.video_call_preference) {
    sessionLines.push(
      `${t("doctor.dashboard.videoCall")}: ${formatVideoCallPreference(booking.video_call_preference, t)}`,
    );
  }

  async function handleStatusChange(nextStatus: string) {
    if (nextStatus === status || !statusOptions.includes(nextStatus as BookingStatus)) {
      return;
    }

    setBusy("status");
    setActionError(null);

    try {
      await updateDoctorBookingStatus({
        data: { bookingId: booking.id, status: nextStatus },
      });
      setStatus(nextStatus);
      onChanged();
    } catch {
      setActionError(t("doctor.dashboard.actionFailed"));
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    if (!window.confirm(t("doctor.dashboard.deleteConfirm"))) {
      return;
    }

    setBusy("delete");
    setActionError(null);

    try {
      await deleteDoctorBooking({ data: { bookingId: booking.id } });
      onChanged();
    } catch {
      setActionError(t("doctor.dashboard.actionFailed"));
    } finally {
      setBusy(null);
    }
  }

  return (
    <article className="p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <InfoBlock
          icon={<UserRound size={18} />}
          title={t("doctor.dashboard.patient")}
          lines={[
            booking.full_name,
            `${t("doctor.dashboard.age")}: ${booking.age ?? t("doctor.dashboard.notProvided")}`,
          ]}
        />
        <InfoBlock
          icon={<Mail size={18} />}
          title={t("doctor.dashboard.contact")}
          lines={[
            `${t("doctor.dashboard.email")}: ${booking.email}`,
            `${t("doctor.dashboard.phone")}: ${booking.phone ?? t("doctor.dashboard.notProvided")}`,
          ]}
        />
        <InfoBlock
          icon={<CalendarDays size={18} />}
          title={t("doctor.dashboard.session")}
          lines={sessionLines}
        />
        <div>
          <div className="flex items-center gap-2 text-[color:var(--color-clay)] mb-2">
            <FileText size={18} />
            <p className="eyebrow">{t("doctor.dashboard.requestDetails")}</p>
          </div>
          <div className="space-y-3 text-sm text-foreground/75">
            <div>
              <label htmlFor={`status-${booking.id}`} className="font-medium text-foreground block mb-1">
                {t("doctor.dashboard.status")}
              </label>
              <select
                id={`status-${booking.id}`}
                value={status}
                disabled={busy !== null}
                onChange={(event) => void handleStatusChange(event.target.value)}
                className="w-full max-w-xs bg-background border border-border rounded-sm p-2 text-sm focus:outline-none focus:border-foreground disabled:opacity-50"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`doctor.dashboard.status${option.charAt(0).toUpperCase()}${option.slice(1)}`)}
                  </option>
                ))}
              </select>
            </div>
            <p>
              <span className="font-medium text-foreground">{t("doctor.dashboard.received")}:</span>{" "}
              {formatDateTime(booking.created_at)}
            </p>
            <div>
              <p className="font-medium text-foreground">{t("doctor.dashboard.notes")}:</p>
              <p className="mt-1 whitespace-pre-line leading-relaxed">
                {booking.notes ?? t("doctor.dashboard.notProvided")}
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={busy !== null}
                className="inline-flex items-center gap-2 text-sm text-red-600 border border-red-200 rounded-sm px-3 py-2 hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 size={14} />
                {busy === "delete" ? t("doctor.dashboard.deleting") : t("doctor.dashboard.delete")}
              </button>
            </div>
            {actionError && (
              <p className="text-sm text-red-600" role="alert">
                {actionError}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoBlock({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: Array<string | number>;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[color:var(--color-clay)] mb-2">
        {icon}
        <p className="eyebrow">{title}</p>
      </div>
      <div className="space-y-1 text-sm text-foreground/75">
        {lines.map((line) => (
          <p key={String(line)}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function activeStatusLabel(bookings: Booking[]) {
  if (bookings.length === 0) return "0";
  return Array.from(new Set(bookings.map((booking) => booking.status))).join(", ");
}

function latestReceived(bookings: Booking[], fallback: string) {
  const latest = bookings[0]?.created_at;
  return latest ? formatDateTime(latest) : fallback;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatVideoCallPreference(
  preference: string,
  t: (key: string) => string,
) {
  if (videoCallPlatformOptions.includes(preference as (typeof videoCallPlatformOptions)[number])) {
    return t(`booking.form.videoCallOptions.${preference}`);
  }
  return preference;
}

function getDashboardErrorMessage(error: unknown, t: (key: string) => string) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("RPC_NOT_FOUND")) {
    return t("doctor.dashboard.errorRpcMissing");
  }
  if (message.includes("MISSING_ENV")) {
    return t("doctor.dashboard.errorMissingEnv");
  }
  if (message.includes("Unauthorized")) {
    return t("doctor.dashboard.loginRequired");
  }
  if (message.startsWith("SUPABASE:")) {
    return message.replace("SUPABASE:", "");
  }
  return t("doctor.dashboard.error");
}

function getDashboardErrorHint(error: unknown, t: (key: string) => string) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("RPC_NOT_FOUND")) {
    return t("doctor.dashboard.errorRpcHint");
  }
  if (message.includes("MISSING_ENV")) {
    return t("doctor.dashboard.errorEnvHint");
  }
  if (message.includes("Unauthorized")) {
    return t("doctor.dashboard.errorLoginHint");
  }
  return null;
}
