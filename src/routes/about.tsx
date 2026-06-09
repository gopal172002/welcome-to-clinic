import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { DevyaniProfile } from "@/components/DevyaniProfile";
import { buildPageHead, breadcrumbSchema, personSchema, webPageSchema } from "@/lib/seo";
import { usePageSeo } from "@/lib/usePageSeo";
import { SeoJsonLd } from "@/components/SeoJsonLd";

const aboutHead = buildPageHead({
  title: "About Devyani Barodh | RCI Clinical Psychologist in Varanasi",
  description:
    "Meet Devyani Barodh, RCI Registered Clinical Psychologist at ManoNirmaan. Psychotherapy for anxiety, depression, trauma and emotional wellbeing in Varanasi.",
  path: "/about",
  ogTitle: "About Devyani Barodh — ManoNirmaan",
  ogDescription: "Clinical psychotherapy with compassion, care and evidence-informed practice.",
});

export const Route = createFileRoute("/about")({
  head: () => aboutHead,
  component: About,
});

function About() {
  const { t } = useTranslation();

  usePageSeo({
    path: "/about",
    title: "about.metaTitle",
    description: "about.metaDescription",
    ogTitle: "about.ogTitle",
    ogDescription: "about.ogDescription",
  });

  return (
    <Layout>
      <SeoJsonLd
        data={[
          personSchema(),
          webPageSchema({
            name: t("about.metaTitle"),
            description: t("about.metaDescription"),
            path: "/about",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <DevyaniProfile variant="full" />

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

      <section className="mx-auto max-w-4xl px-6 lg:px-10 py-24 text-center">
        <Link to="/booking" className="btn-primary">{t("common.bookInitialConsultation")}</Link>
      </section>
    </Layout>
  );
}
