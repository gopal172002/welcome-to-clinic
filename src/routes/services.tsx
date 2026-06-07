import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { useTranslatedHead } from "@/lib/useTranslatedHead";
import room from "@/assets/room.jpg";

type Modality = { t: string; d: string };

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Therapies - ManoNirmaan" },
      {
        name: "description",
        content:
          "Clinical psychology, counselling, inclusive learning support and community medicine perspectives. A curated range of services, online and in-person.",
      },
      { property: "og:title", content: "Services & Therapies - ManoNirmaan" },
      { property: "og:description", content: "Support thoughtfully tailored to you." },
    ],
  }),
  component: Services,
});

function Services() {
  const { t } = useTranslation();
  const modalities = t("services.modalities", { returnObjects: true }) as Modality[];
  const concerns = t("concerns.services", { returnObjects: true }) as string[];

  useTranslatedHead({
    title: "services.metaTitle",
    description: "services.metaDescription",
    ogTitle: "services.ogTitle",
    ogDescription: "services.ogDescription",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-12">
        <p className="eyebrow mb-6">{t("services.eyebrow")}</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          {t("services.titleBefore")}{" "}
          <em className="text-[color:var(--color-clay)]">{t("services.titleEmphasis")}</em>{" "}
          {t("services.titleAfter")}
        </h1>
        <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
          {t("services.intro")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {modalities.map((m, i) => (
            <div key={m.t} className="bg-background p-8 hover:bg-[color:var(--color-secondary)]/40 transition-colors">
              <div className="font-serif italic text-sm text-[color:var(--color-clay)] mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-2xl mb-3 leading-snug">{m.t}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--color-secondary)]/40 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <img src={room} alt="" className="rounded-sm shadow-xl object-cover w-full" loading="lazy" />
          <div>
            <p className="eyebrow mb-4">{t("services.concernsEyebrow")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">
              {t("services.concernsHeading")}
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {concerns.map((c) => (
                <li key={c} className="border-b border-border/70 pb-1.5 text-foreground/80">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-10 py-24 text-center">
        <p className="eyebrow mb-4">{t("services.pricingEyebrow")}</p>
        <h2 className="font-serif text-3xl lg:text-4xl mb-4">{t("services.pricingHeading")}</h2>
        <p className="text-foreground/75 mb-8">{t("services.pricingBody")}</p>
        <Link to="/booking" className="btn-primary">{t("common.bookASession")}</Link>
      </section>
    </Layout>
  );
}
