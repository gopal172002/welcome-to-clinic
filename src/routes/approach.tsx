import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { useTranslatedHead } from "@/lib/useTranslatedHead";
import growth from "@/assets/growth.jpg";

type ApproachStep = { n: string; t: string; d: string };

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Our Care Approach - ManoNirmaan" },
      {
        name: "description",
        content:
          "A relational, integrative approach to support - recognising and nurturing the strengths that brought you here. Initial assessment, frequency, and ongoing review.",
      },
      { property: "og:title", content: "Our Care Approach - ManoNirmaan" },
      {
        property: "og:description",
        content: "Relational, integrative, collaborative and evidence-informed support.",
      },
    ],
  }),
  component: Approach,
});

function Approach() {
  const { t } = useTranslation();
  const steps = t("approach.steps", { returnObjects: true }) as ApproachStep[];

  useTranslatedHead({
    title: "approach.metaTitle",
    description: "approach.metaDescription",
    ogTitle: "approach.ogTitle",
    ogDescription: "approach.ogDescription",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16">
        <p className="eyebrow mb-6">{t("approach.eyebrow")}</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-4xl leading-[1.05]">
          {t("approach.titleBefore")}{" "}
          <em className="text-[color:var(--color-clay)]">{t("approach.titleEmphasis")}</em>{" "}
          {t("approach.titleAfter")}
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 pb-28">
        <div className="space-y-6 text-foreground/80 leading-relaxed text-[1.05rem]">
          <p>{t("approach.p1")}</p>
          <p>
            <span className="font-serif italic text-[color:var(--color-clay)]">
              {t("approach.relationalLabel")}
            </span>
            {t("approach.relationalText")}
          </p>
          <p>
            <span className="font-serif italic text-[color:var(--color-clay)]">
              {t("approach.integrativeLabel")}
            </span>
            {t("approach.integrativeText")}
          </p>
        </div>
        <div>
          <img src={growth} alt="" className="rounded-sm shadow-xl object-cover w-full" loading="lazy" />
        </div>
      </section>

      <section className="bg-[color:var(--color-secondary)]/40 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="font-serif lg:text-5xl text-center mb-16 max-w-3xl mx-auto leading-tight font-bold text-4xl">
            {t("approach.expectHeading")}
          </p>

          <div className="space-y-14">
            {steps.map((s) => (
              <div key={s.n} className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 border-t border-border pt-8">
                <div className="font-serif italic text-5xl text-[color:var(--color-clay)]">{s.n}</div>
                <div>
                  <h3 className="font-serif text-3xl mb-3">{s.t}</h3>
                  <p className="text-foreground/75 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-10 py-24 text-center">
        <Link to="/booking" className="btn-primary">{t("common.bookASession")}</Link>
      </section>
    </Layout>
  );
}
