import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { buildPageHead, webPageSchema } from "@/lib/seo";
import { usePageSeo } from "@/lib/usePageSeo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { DevyaniProfile } from "@/components/DevyaniProfile";
import hero from "@/assets/hero.jpg";
import growth from "@/assets/growth.jpg";
import { ArrowRight, Heart, Shield, Sprout, Users } from "lucide-react";

type IntroItem = { n: string; t: string; d: string };
type WhyItem = { t: string; d: string };

const whyIcons = [Heart, Shield, Users, Sprout, Sprout] as const;

const homeHead = buildPageHead({
  title: "ManoNirmaan | Clinical Psychology & Mental Health Care in Varanasi",
  description:
    "RCI-registered clinical psychology, psychotherapy and counselling in Varanasi. Online and in-person sessions for anxiety, depression, trauma, OCD and more.",
  path: "/",
  ogTitle: "ManoNirmaan — A quiet space for the mind",
  ogDescription:
    "Compassionate mental health care in Varanasi. Clinical psychology, counselling, special education and community medicine.",
});

export const Route = createFileRoute("/")({
  head: () => homeHead,
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const introItems = t("home.intro.items", { returnObjects: true }) as IntroItem[];
  const whyItems = t("home.why.items", { returnObjects: true }) as WhyItem[];
  const concerns = t("concerns.services", { returnObjects: true }) as string[];

  usePageSeo({
    path: "/",
    title: "home.metaTitle",
    description: "home.metaDescription",
    ogTitle: "home.ogTitle",
    ogDescription: "home.ogDescription",
  });

  return (
    <Layout>
      <SeoJsonLd
        data={webPageSchema({
          name: t("home.metaTitle"),
          description: t("home.metaDescription"),
          path: "/",
        })}
      />
      <section className="relative overflow-hidden">
        <img
          src={hero}
          alt="Calm therapy room at ManoNirmaan mental health clinic in Varanasi"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-cream)]/40 via-[color:var(--color-cream)]/70 to-[color:var(--color-cream)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 pt-28 pb-40 lg:pt-40 lg:pb-56">
          <p className="eyebrow mb-6">
            {t("common.restore")} <span className="divider-leaf" /> {t("common.reconnect")}{" "}
            <span className="divider-leaf" /> {t("common.rebuild")}
          </p>
          <h1 className="font-serif text-[2.8rem] sm:text-6xl lg:text-8xl leading-[1.05] max-w-4xl tracking-tight">
            {t("home.hero.titleBefore")} <span className="font-light">{t("home.hero.titleMind")}</span>{" "}
            <span className="relative inline-block">
              <em className="italic font-light text-[color:var(--color-clay)]">
                {t("home.hero.titleEmphasis")}
              </em>
              <svg
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full opacity-40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-[color:var(--color-clay)]" />
              </svg>
            </span>
          </h1>
          <p className="text-justify-block mt-8 max-w-xl text-base lg:text-lg leading-relaxed text-foreground/75">
            {t("home.hero.body")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/booking" className="btn-primary">
              {t("common.bookInitialConsultation")} <ArrowRight size={14} />
            </Link>
            <Link to="/about" className="btn-ghost">{t("home.hero.meet")}</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[color:var(--color-secondary)]/30">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10 grid md:grid-cols-3 gap-6 text-center md:text-left">
          {introItems.map((s) => (
            <div key={s.n} className="flex items-baseline gap-4">
              <span className="font-serif italic text-3xl text-[color:var(--color-clay)]">{s.n}</span>
              <div>
                <div className="font-serif text-xl">{s.t}</div>
                <div className="text-sm text-muted-foreground">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DevyaniProfile variant="preview" />

      <section className="bg-[color:var(--color-secondary)]/40 py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">{t("home.why.eyebrow")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl">{t("home.why.heading")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {whyItems.map(({ t: title, d }, index) => {
              const Icon = whyIcons[index] ?? Sprout;
              return (
                <div key={title} className="flex gap-5">
                  <div className="shrink-0 h-12 w-12 rounded-full bg-[color:var(--color-cream)] border border-border flex items-center justify-center text-[color:var(--color-clay)]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">{title}</h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">{d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-28">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <p className="eyebrow mb-4">{t("home.support.eyebrow")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-6">{t("home.support.heading")}</h2>
            <p className="text-foreground/75 leading-relaxed mb-8">
              {t("home.support.body")}
            </p>
            <Link to="/services" className="btn-ghost">{t("common.exploreServices")}</Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm self-center">
            {concerns.map((c) => (
              <li key={c} className="border-b border-border/70 pb-2 text-foreground/80">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src={growth} alt="Nature symbolising emotional growth and healing at ManoNirmaan" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[color:var(--color-ink)]/70" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 py-32 text-center text-[color:var(--color-cream)]">
          <p className="eyebrow !text-[color:var(--color-sage)] mb-6">{t("home.cta.eyebrow")}</p>
          <h2 className="font-serif text-4xl lg:text-6xl leading-tight">
            {t("home.cta.heading")}
          </h2>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              to="/booking"
              className="btn-primary !bg-[color:var(--color-cream)] !text-[color:var(--color-ink)] hover:!bg-[color:var(--color-clay)] hover:!text-[color:var(--color-cream)]"
            >
              {t("home.cta.button")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
