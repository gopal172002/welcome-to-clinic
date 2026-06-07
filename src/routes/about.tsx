import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { teamMembers } from "@/lib/team";
import { useTranslatedHead } from "@/lib/useTranslatedHead";

type StrengthItem = { t: string; d: string };

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the ManoNirmaan Team" },
      {
        name: "description",
        content:
          "Meet the ManoNirmaan team offering clinical psychology, counselling, special education and community medicine support in Varanasi and online.",
      },
      { property: "og:title", content: "About the ManoNirmaan Team" },
      {
        property: "og:description",
        content: "A multidisciplinary team for mental health, learning and accessible care.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useTranslation();
  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];
  const strengths = t("about.strengths.items", { returnObjects: true }) as StrengthItem[];
  const values = t("about.values.items", { returnObjects: true }) as string[];

  useTranslatedHead({
    title: "about.metaTitle",
    description: "about.metaDescription",
    ogTitle: "about.ogTitle",
    ogDescription: "about.ogDescription",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16">
        <p className="eyebrow mb-6">{t("about.eyebrow")}</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-4xl leading-[1.05]">
          {t("about.heading")}
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1fr] gap-14 pb-24">
        <div className="space-y-6 text-foreground/80 leading-relaxed text-[1.05rem]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-px self-start border border-border bg-border">
          {strengths.map((item, index) => (
            <div key={item.t} className="bg-background p-6">
              <div className="font-serif italic text-sm text-[color:var(--color-clay)] mb-3">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h2 className="font-serif text-2xl leading-tight">{item.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--color-secondary)]/40 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="eyebrow mb-6">{t("about.mano.eyebrow")}</p>
          <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">
            <span className="text-[color:var(--color-clay)] italic">Mano</span> / {t("about.mano.mind")} &nbsp;
            <span className="text-[color:var(--color-sage-deep)]">+</span> &nbsp;
            <span className="text-[color:var(--color-clay)] italic">Nirmaan</span> / {t("about.mano.reconstruction")}
          </h2>
          <p className="text-foreground/75 leading-relaxed max-w-2xl mx-auto">
            {t("about.mano.body")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-24">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">{t("about.teamEyebrow")}</p>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight">
            {t("about.teamHeading")}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <article
              key={member.name}
              className={`overflow-hidden rounded-sm border border-border bg-background shadow-sm ${
                index === 0 ? "sm:col-span-2 sm:grid sm:grid-cols-[12rem_1fr]" : ""
              }`}
            >
              <img
                src={member.image}
                alt={member.name}
                className={`w-full object-cover ${
                  index === 0 ? "h-72 sm:h-full" : "aspect-[4/3]"
                }`}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="font-serif text-3xl leading-tight">{member.name}</h3>
                <p className="mt-3 text-sm font-medium text-[color:var(--color-clay)]">
                  {member.title}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-foreground/75">
                  {member.focus}
                </p>
                <blockquote className="mt-6 border-l-2 border-[color:var(--color-clay)] pl-4 font-serif text-xl italic leading-snug text-foreground/85">
                  "{member.quote}"
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-24 grid md:grid-cols-3 gap-12">
        <div>
          <p className="eyebrow mb-4">{t("about.values.visionTitle")}</p>
          <p className="text-foreground/80 leading-relaxed">
            {t("about.values.vision")}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">{t("about.values.missionTitle")}</p>
          <p className="text-foreground/80 leading-relaxed">
            {t("about.values.mission")}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">{t("about.values.valuesTitle")}</p>
          <ul className="space-y-2 text-foreground/80">
            {values.map((value) => (
              <li key={value} className="font-serif text-xl">{value}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-10 pb-8 text-center">
        <Link to="/booking" className="btn-primary">{t("common.bookInitialConsultation")}</Link>
      </section>
    </Layout>
  );
}
