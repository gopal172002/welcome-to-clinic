import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { parseBookingForm, submitBookingRequest } from "@/lib/bookings";
import { useState } from "react";
import { Calendar, Clock, Video, MapPin, Check } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Session — ManoNirmaan" },
      {
        name: "description",
        content:
          "Book an initial consultation or therapy session with Devyani Barodh. Online and in-person sessions available in Varanasi.",
      },
      { property: "og:title", content: "Book a Session — ManoNirmaan" },
      { property: "og:description", content: "60-minute therapy sessions, online & in-person." },
    ],
  }),
  component: Booking,
});

function Booking() {
  const [type, setType] = useState<"online" | "offline">("online");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const parsed = parseBookingForm(new FormData(e.currentTarget), type);
    if (!parsed.success) {
      setSubmitting(false);
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    const result = await submitBookingRequest(parsed.data);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSubmitted(true);
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-12">
        <p className="eyebrow mb-6">Book a therapy session</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          Take the first step — <em className="text-[color:var(--color-clay)]">gently</em>.
        </h1>
        <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
          To ensure we have established a safe foundation for our work, please only book a full
          therapy session if we have already completed your initial consultation and agreed to
          proceed together.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 pb-24 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="bg-background border border-border p-8 rounded-sm h-fit">
          <div className="eyebrow mb-3">Session</div>
          <h2 className="font-serif text-3xl mb-2">60-minute Therapy Session</h2>
          <p className="text-sm text-muted-foreground mb-6">
            with Devyani Barodh, M.Phil Clinical Psychology
          </p>

          <div className="space-y-3 text-sm border-y border-border py-5 mb-6">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-[color:var(--color-clay)]" /> 60 minutes
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-[color:var(--color-clay)]" /> Weekly or
              fortnightly
            </div>
            <div className="flex items-center gap-3">
              <Video size={16} className="text-[color:var(--color-clay)]" /> Online via secure video
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[color:var(--color-clay)]" /> Or in-person, Varanasi
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            After you submit your request, Devyani will reach out within 24–48 hours to confirm a
            time and share the next steps.
          </p>
        </div>

        <div className="bg-[color:var(--color-secondary)]/40 p-8 lg:p-10 rounded-sm">
          {submitted ? (
            <div className="text-center py-16">
              <div className="inline-flex h-14 w-14 rounded-full bg-background items-center justify-center text-[color:var(--color-clay)] mb-6">
                <Check size={26} />
              </div>
              <h3 className="font-serif text-3xl mb-3">Thank you.</h3>
              <p className="text-foreground/75 max-w-md mx-auto">
                Your request has been received. Devyani will be in touch personally within 24–48
                hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <h3 className="font-serif text-2xl mb-2">Request a session</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" name="name" required autoComplete="name" />
                <Field label="Age" name="age" type="number" min={1} max={120} autoComplete="off" />
              </div>
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />

              <div>
                <label className="eyebrow block mb-3">Session type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["online", "offline"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`py-3 text-sm border rounded-sm transition-all ${
                        type === t
                          ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] border-[color:var(--color-primary)]"
                          : "border-border bg-background hover:border-foreground"
                      }`}
                    >
                      {t === "online" ? "Online" : "In-person, Varanasi"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Preferred date" name="date" type="date" min={today} />
                <Field label="Preferred time" name="time" type="time" />
              </div>

              <div>
                <label htmlFor="notes" className="eyebrow block mb-2">
                  What brings you in?
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  maxLength={2000}
                  className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:outline-none focus:border-foreground"
                  placeholder="Share a little, if you'd like — only what feels comfortable."
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
                {submitting ? "Submitting…" : "Submit request"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Or email{" "}
                <a href="mailto:barodhdevyani@gmail.com" className="underline">
                  barodhdevyani@gmail.com
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-10 pb-16 text-center">
        <p className="text-sm text-muted-foreground">
          New to therapy?{" "}
          <Link to="/approach" className="underline">
            Learn what to expect
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
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  autoComplete?: string;
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
        autoComplete={autoComplete}
        className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:outline-none focus:border-foreground"
      />
    </div>
  );
}
