import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { buildPageHead, breadcrumbSchema, CONTACT, webPageSchema } from "@/lib/seo";
import { usePageSeo } from "@/lib/usePageSeo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";

const contactHead = buildPageHead({
  title: "Contact ManoNirmaan | Mental Health Clinic in Varanasi",
  description:
    "Contact ManoNirmaan in Chiraigaon, Varanasi. Email manonirmaan@gmail.com or call +91 91964 21388. Responses within 24–48 hours, Monday to Saturday.",
  path: "/contact",
  ogTitle: "Contact — ManoNirmaan",
  ogDescription: "Reach our mental health clinic in Varanasi. We are here to help.",
});

export const Route = createFileRoute("/contact")({
  head: () => contactHead,
  component: Contact,
});

function Contact() {
  const { t } = useTranslation();

  usePageSeo({
    path: "/contact",
    title: "contact.metaTitle",
    description: "contact.metaDescription",
    ogTitle: "contact.ogTitle",
    ogDescription: "contact.ogDescription",
  });

  const cards = [
    {
      i: MapPin,
      t: t("contact.visit"),
      l: [t("common.addressLine1"), t("common.addressLine2")],
    },
    {
      i: Mail,
      t: t("contact.email"),
      l: [t("common.email")],
      href: `mailto:${t("common.email")}`,
    },
    {
      i: Phone,
      t: t("contact.phone"),
      l: [t("common.phoneDisplay")],
      href: `tel:${t("common.phoneHref")}`,
    },
    {
      i: Instagram,
      t: t("contact.instagram"),
      l: [CONTACT.instagramHandle],
      href: CONTACT.instagram,
      external: true,
    },
  ];

  return (
    <Layout>
      <SeoJsonLd
        data={[
          webPageSchema({
            name: t("contact.metaTitle"),
            description: t("contact.metaDescription"),
            path: "/contact",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16">
        <p className="eyebrow mb-6">{t("contact.eyebrow")}</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          {t("contact.titleBefore")}{" "}
          <em className="text-[color:var(--color-clay)]">{t("contact.titleEmphasis")}</em>
          {t("contact.titleAfter")}
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 pb-28 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map(({ i: Icon, t: title, l, href, external }) => (
          <div key={title} className="bg-background border border-border p-8 rounded-sm">
            <div className="h-11 w-11 rounded-full bg-[color:var(--color-secondary)] flex items-center justify-center text-[color:var(--color-clay)] mb-5">
              <Icon size={18} />
            </div>
            <div className="eyebrow mb-2">{title}</div>
            {href ? (
              <a
                href={href}
                className="font-serif text-xl hover:text-[color:var(--color-clay)]"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.map((line) => <div key={line}>{line}</div>)}
              </a>
            ) : (
              <div className="font-serif text-xl">{l.map((line) => <div key={line}>{line}</div>)}</div>
            )}
          </div>
        ))}
      </section>

      <section className="bg-[color:var(--color-secondary)]/40 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <Clock size={20} className="mx-auto text-[color:var(--color-clay)] mb-4" />
          <p className="eyebrow mb-4">{t("contact.responseEyebrow")}</p>
          <p className="font-serif text-2xl lg:text-3xl leading-snug max-w-2xl mx-auto">
            {t("contact.responseBefore")}{" "}
            <a href={`tel:${t("common.phoneHref")}`} className="underline ml-1">
              {t("common.phoneDisplay")}
            </a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
