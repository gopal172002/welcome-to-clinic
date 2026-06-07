import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LockKeyhole, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Layout } from "@/components/Layout";
import { isDoctorAuthenticated, startDoctorSession } from "@/lib/doctorAuth";
import { loginDoctor } from "@/routes/doctor-login.server";

export const Route = createFileRoute("/doctor-login")({
  head: () => ({
    meta: [
      { title: "Doctor Login - ManoNirmaan" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DoctorLogin,
});

function DoctorLogin() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadyAuthenticated, setAlreadyAuthenticated] = useState(false);

  useEffect(() => {
    document.title = t("doctor.login.metaTitle");
  }, [i18n.language, t]);

  useEffect(() => {
    setAlreadyAuthenticated(isDoctorAuthenticated());
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await loginDoctor({ data: { username, password } });
    setSubmitting(false);

    if (!result.ok) {
      setError(t("doctor.login.invalid"));
      return;
    }

    startDoctorSession();
    await navigate({ to: "/session-details" });
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-20">
        <p className="eyebrow mb-6">{t("doctor.login.eyebrow")}</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          {t("doctor.login.title")}
        </h1>
        <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
          {t("doctor.login.body")}
        </p>
      </section>

      <section className="mx-auto max-w-xl px-6 lg:px-10 pb-24">
        <div className="bg-background border border-border p-8 lg:p-10 rounded-sm">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-secondary)] text-[color:var(--color-clay)]">
            <LockKeyhole size={22} />
          </div>

          {alreadyAuthenticated && (
            <div className="mb-6 rounded-sm border border-border bg-[color:var(--color-secondary)]/40 p-4 text-sm">
              <p className="font-medium">{t("doctor.login.authenticated")}</p>
              <Link to="/session-details" className="mt-2 inline-block underline">
                {t("doctor.login.openDashboard")}
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="doctor-username" className="eyebrow block mb-2">
                {t("doctor.login.username")}
              </label>
              <input
                id="doctor-username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:outline-none focus:border-foreground"
                required
              />
            </div>

            <div>
              <label htmlFor="doctor-password" className="eyebrow block mb-2">
                {t("doctor.login.password")}
              </label>
              <input
                id="doctor-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:outline-none focus:border-foreground"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {submitting ? t("doctor.login.submitting") : t("doctor.login.submit")}
              <LogIn size={14} />
            </button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            {t("doctor.login.securityNote")}
          </p>
        </div>
      </section>
    </Layout>
  );
}
