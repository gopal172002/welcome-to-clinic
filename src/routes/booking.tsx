import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { buildPageHead, breadcrumbSchema, webPageSchema } from "@/lib/seo";
import { usePageSeo } from "@/lib/usePageSeo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import {
  parseBookingForm,
  referralSourceOptions,
  sessionLanguageOptions,
  submitBookingRequest,
  videoCallPlatformOptions,
} from "@/lib/bookings";
import { useState } from "react";
import { Calendar, Clock, Video, MapPin, Check, Monitor } from "lucide-react";

const bookingHead = buildPageHead({
  title: "Book a Session | ManoNirmaan Mental Health Clinic Varanasi",
  description:
    "Book an initial consultation with ManoNirmaan in Varanasi. Clinical psychology, counselling and learning support — online or in-person sessions available.",
  path: "/booking",
  ogTitle: "Book a Session — ManoNirmaan",
  ogDescription: "Request an initial consultation. Online and in-person mental health sessions in Varanasi.",
});

export const Route = createFileRoute("/booking")({
  head: () => bookingHead,
  component: Booking,
});

function Booking() {
  const { t } = useTranslation();
  const [type, setType] = useState<"online" | "offline">("online");
  const [videoPlatform, setVideoPlatform] = useState<
    (typeof videoCallPlatformOptions)[number] | ""
  >("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  usePageSeo({
    path: "/booking",
    title: "booking.metaTitle",
    description: "booking.metaDescription",
    ogTitle: "booking.ogTitle",
    ogDescription: "booking.ogDescription",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const parsed = parseBookingForm(new FormData(e.currentTarget), type, {
      name: t("booking.validation.name"),
      email: t("booking.validation.email"),
      age: t("booking.validation.age"),
      notes: t("booking.validation.notes"),
      referralDetails: t("booking.validation.referralDetails"),
      videoCallPreference: t("booking.validation.videoCallPreference"),
    });
    if (!parsed.success) {
      setSubmitting(false);
      setError(parsed.error.issues[0]?.message ?? t("booking.form.errorFallback"));
      return;
    }

    const result = await submitBookingRequest(
      parsed.data,
      t("booking.form.submitFailure", { email: t("common.email") }),
      {
        languagePreference: t("booking.form.languagePreference"),
        languageValue: t(`booking.form.languageOptions.${parsed.data.sessionLanguage}`),
        referralSource: t("booking.form.referralSource"),
        referralValue: parsed.data.referralSource
          ? t(`booking.form.referralOptions.${parsed.data.referralSource}`)
          : undefined,
        referralDetails: t("booking.form.referralDetails"),
        notes: t("booking.form.notes"),
      },
    );
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSubmitted(true);
  }

  return (
    <Layout>
      <SeoJsonLd
        data={[
          webPageSchema({
            name: t("booking.metaTitle"),
            description: t("booking.metaDescription"),
            path: "/booking",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book a Session", path: "/booking" },
          ]),
        ]}
      />
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-12">
        <p className="eyebrow mb-6">{t("booking.eyebrow")}</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          {t("booking.titleBefore")}{" "}
          <em className="text-[color:var(--color-clay)]">{t("booking.titleEmphasis")}</em>
          {t("booking.titleAfter")}
        </h1>
        <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
          {t("booking.intro")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 pb-24 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="bg-background border border-border p-8 rounded-sm h-fit">
          <div className="eyebrow mb-3">{t("booking.card.eyebrow")}</div>
          <h2 className="font-serif text-3xl mb-2">{t("booking.card.title")}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("booking.card.subtitle")}
          </p>

          <div className="space-y-3 text-sm border-y border-border py-5 mb-6">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-[color:var(--color-clay)]" /> {t("booking.card.duration")}
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-[color:var(--color-clay)]" /> {t("booking.card.frequency")}
            </div>
            <div className="flex items-center gap-3">
              <Video size={16} className="text-[color:var(--color-clay)]" /> {t("booking.card.online")}
            </div>
            <div className="flex items-center gap-3">
              <Monitor size={16} className="text-[color:var(--color-clay)]" /> {t("booking.card.videoPlatforms")}
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[color:var(--color-clay)]" /> {t("booking.card.offline")}
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("booking.card.note")}
          </p>
        </div>

        <div className="bg-[color:var(--color-secondary)]/40 p-8 lg:p-10 rounded-sm">
          {submitted ? (
            <div className="text-center py-16">
              <div className="inline-flex h-14 w-14 rounded-full bg-background items-center justify-center text-[color:var(--color-clay)] mb-6">
                <Check size={26} />
              </div>
              <h3 className="font-serif text-3xl mb-3">{t("booking.success.title")}</h3>
              <p className="text-foreground/75 max-w-md mx-auto">
                {t("booking.success.body")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <h3 className="font-serif text-2xl mb-2">{t("booking.form.title")}</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("booking.form.name")} name="name" required autoComplete="name" />
                <Field label={t("booking.form.age")} name="age" type="number" min={1} max={120} autoComplete="off" />
              </div>
              <Field label={t("booking.form.email")} name="email" type="email" required autoComplete="email" />
              <Field label={t("booking.form.phone")} name="phone" type="tel" autoComplete="tel" />

              <div>
                <label className="eyebrow block mb-3">{t("booking.form.sessionType")}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["online", "offline"] as const).map((sessionType) => (
                    <button
                      key={sessionType}
                      type="button"
                      onClick={() => {
                        setType(sessionType);
                        if (sessionType === "offline") {
                          setVideoPlatform("");
                        }
                      }}
                      className={`py-3 text-sm border rounded-sm transition-all ${
                        type === sessionType
                          ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] border-[color:var(--color-primary)]"
                          : "border-border bg-background hover:border-foreground"
                      }`}
                    >
                      {sessionType === "online" ? t("booking.form.online") : t("booking.form.offline")}
                    </button>
                  ))}
                </div>
              </div>

              {type === "online" && (
                <div>
                  <label className="eyebrow block mb-2">
                    {t("booking.form.videoCallPreference")}
                    <span className="text-[color:var(--color-clay)]"> *</span>
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t("booking.form.videoCallHint")}
                  </p>
                  <input type="hidden" name="videoCallPreference" value={videoPlatform} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {videoCallPlatformOptions.map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => setVideoPlatform(platform)}
                        className={`py-3 px-2 text-sm border rounded-sm transition-all text-left ${
                          videoPlatform === platform
                            ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] border-[color:var(--color-primary)]"
                            : "border-border bg-background hover:border-foreground"
                        }`}
                      >
                        {t(`booking.form.videoCallOptions.${platform}`)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("booking.form.date")} name="date" type="date" min={today} />
                <Field label={t("booking.form.time")} name="time" type="time" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  label={t("booking.form.languagePreference")}
                  name="sessionLanguage"
                  defaultValue="either"
                  options={sessionLanguageOptions.map((option) => ({
                    value: option,
                    label: t(`booking.form.languageOptions.${option}`),
                  }))}
                />
                <SelectField
                  label={t("booking.form.referralSource")}
                  name="referralSource"
                  options={[
                    { value: "", label: t("booking.form.referralOptions.none") },
                    ...referralSourceOptions.map((option) => ({
                      value: option,
                      label: t(`booking.form.referralOptions.${option}`),
                    })),
                  ]}
                />
              </div>

              <Field
                label={t("booking.form.referralDetails")}
                name="referralDetails"
                maxLength={200}
                autoComplete="off"
                placeholder={t("booking.form.referralDetailsPlaceholder")}
              />

              <div>
                <label htmlFor="notes" className="eyebrow block mb-2">
                  {t("booking.form.notes")}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  maxLength={2000}
                  className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:outline-none focus:border-foreground"
                  placeholder={t("booking.form.notesPlaceholder")}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center disabled:opacity-50"
              >
                {submitting ? t("booking.form.submitting") : t("booking.form.submit")}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                {t("booking.form.orEmail")}{" "}
                <a href={`mailto:${t("common.email")}`} className="underline">
                  {t("common.email")}
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-10 pb-16 text-center">
        <p className="text-sm text-muted-foreground">
          {t("booking.form.newToTherapy")}{" "}
          <Link to="/approach" className="underline">
            {t("common.learnWhatToExpect")}
          </Link>
          .
        </p>
      </section>
    </Layout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  min,
  max,
  maxLength,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  maxLength?: number;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">
        {label}
        {required && <span className="text-[color:var(--color-clay)]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        min={min}
        max={max}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:outline-none focus:border-foreground"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:outline-none focus:border-foreground"
      >
        {options.map((option) => (
          <option key={option.value || "none"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
