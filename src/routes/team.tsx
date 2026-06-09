import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { teamMembers } from "@/lib/team";
import { buildPageHead, breadcrumbSchema, webPageSchema } from "@/lib/seo";
import { usePageSeo } from "@/lib/usePageSeo";
import { SeoJsonLd } from "@/components/SeoJsonLd";

type MemberTranslation = { title: string; quote: string };

const teamHead = buildPageHead({
  title: "Our Team | Mental Health Specialists — ManoNirmaan Varanasi",
  description:
    "Meet the ManoNirmaan team — clinical psychologists, a medical doctor, special educator and counselling psychologist offering compassionate care in Varanasi.",
  path: "/team",
  ogTitle: "Our Team — ManoNirmaan",
  ogDescription:
    "Clinical psychology, counselling, special education and community medicine under one multidisciplinary team.",
});

export const Route = createFileRoute("/team")({
  head: () => teamHead,
  component: Team,
});

function Team() {
  const { t } = useTranslation();
  const memberTranslations = t("team.members", { returnObjects: true }) as MemberTranslation[];

  usePageSeo({
    path: "/team",
    title: "team.metaTitle",
    description: "team.metaDescription",
    ogTitle: "team.ogTitle",
    ogDescription: "team.ogDescription",
  });

  return (
    <Layout>
      <SeoJsonLd
        data={[
          webPageSchema({
            name: t("team.metaTitle"),
            description: t("team.metaDescription"),
            path: "/team",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Team", path: "/team" },
          ]),
        ]}
      />
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16">
        <p className="eyebrow mb-6">{t("team.eyebrow")}</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-4xl leading-[1.05]">
          {t("team.headingBefore")}
          <span className="block mt-2">
            <em className="text-[color:var(--color-clay)] italic font-light">
              {t("team.headingBrand")}
            </em>
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75">
          {t("team.description")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => {
            const translated = memberTranslations[index];
            const title = translated?.title ?? member.title;
            const quote = translated?.quote ?? member.quote;

            return (
              <article
                key={member.name}
                className="flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[4/5] object-cover object-top"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-3xl leading-tight">{member.name}</h2>
                  <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[color:var(--color-sage-deep)] leading-relaxed">
                    {title}
                  </p>
                  <blockquote className="mt-6 flex-1 border-l-2 border-[color:var(--color-clay)] pl-4 font-serif text-lg italic leading-snug text-foreground/85">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-10 pb-28 text-center">
        <Link to="/booking" className="btn-primary">
          {t("common.bookInitialConsultation")}
        </Link>
      </section>
    </Layout>
  );
}
