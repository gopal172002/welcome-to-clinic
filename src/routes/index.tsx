import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import hero from "@/assets/hero.jpg";
import portrait from "@/assets/devyani.jpg";
import growth from "@/assets/growth.jpg";
import { ArrowRight, Heart, Shield, Sprout, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ManoNirmaan — Psychotherapy in Varanasi by Devyani Barodh" },
      { name: "description", content: "A quiet space for the mind. Compassionate, evidence-based psychotherapy for children, adolescents and adults. Online & in-person sessions in Varanasi." },
      { property: "og:title", content: "ManoNirmaan — A quiet space for the mind" },
      { property: "og:description", content: "Restore. Reconnect. Rebuild. Psychotherapy with Devyani Barodh, M.Phil Clinical Psychology." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-cream)]/40 via-[color:var(--color-cream)]/70 to-[color:var(--color-cream)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 pt-28 pb-40 lg:pt-40 lg:pb-56">
          <p className="eyebrow mb-6">Restore <span className="divider-leaf"/> Reconnect <span className="divider-leaf"/> Rebuild</p>
          <h1 className="font-serif text-[2.8rem] sm:text-6xl lg:text-8xl leading-[1.05] max-w-4xl tracking-tight">
            A quiet space for the <span className="font-light">mind</span>{" "}
            <span className="relative inline-block">
              <em className="italic font-light text-[color:var(--color-clay)]">to find yourself.</em>
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
          <p className="mt-8 max-w-xl text-base lg:text-lg leading-relaxed text-foreground/75">
            Helping you create a life rooted in resilience and inner strength — where you feel
            empowered to face challenges with confidence and clarity. Compassionate, evidence-based
            psychotherapy in Varanasi and online.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/booking" className="btn-primary">
              Book an initial consultation <ArrowRight size={14} />
            </Link>
            <Link to="/about" className="btn-ghost">Meet Devyani</Link>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-y border-border bg-[color:var(--color-secondary)]/30">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10 grid md:grid-cols-3 gap-6 text-center md:text-left">
          {[
            { n: "01", t: "Restore", d: "Find balance in body and mind." },
            { n: "02", t: "Reconnect", d: "Return to your inner voice." },
            { n: "03", t: "Rebuild", d: "Grow stronger emotional roots." },
          ].map((s) => (
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

      {/* ABOUT PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={portrait}
            alt="Devyani Barodh, Clinical Psychologist"
            className="rounded-sm w-full max-w-md object-cover shadow-xl"
            loading="lazy"
          />
          <div className="absolute -bottom-6 -right-2 lg:-right-10 bg-background border border-border px-6 py-4 max-w-[16rem]">
            <p className="font-serif italic text-sm leading-snug">
              "Healing is not about fixing yourself — it is about reconnecting with the parts of you
              that were unheard."
            </p>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">A little about me</p>
          <h2 className="font-serif text-4xl lg:text-5xl mb-6">Hi, I'm Devyani.</h2>
          <p className="text-foreground/75 leading-relaxed mb-4">
            As a psychotherapist, I believe healing is not about "fixing" yourself, but about
            reconnecting with the parts of you that may have been unheard, overwhelmed, or
            emotionally burdened through life experiences.
          </p>
          <p className="text-foreground/75 leading-relaxed mb-8">
            At ManoNirmaan, I offer a safe, compassionate, and non-judgmental space where
            individuals can explore their emotions, understand their inner world, and move
            toward healing with greater self-awareness and resilience.
          </p>
          <p className="text-sm italic text-muted-foreground mb-8">
            M.Phil Clinical Psychology · M.Sc Clinical Psychology · B.A. Hons (Applied Psychology)
          </p>
          <Link to="/about" className="btn-ghost">Read my full story</Link>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-[color:var(--color-secondary)]/40 py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Why choose me as your therapist?</p>
            <h2 className="font-serif text-4xl lg:text-5xl">Therapy held with warmth, discretion and clinical care.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {[
              { i: Heart, t: "Safe, Non-Judgmental Space for Growth", d: "I strive to create a warm, non-judgmental, and emotionally safe environment where you can openly explore your thoughts, feelings, and experiences at your own pace." },
              { i: Shield, t: "Qualified & Evidence-Based Care", d: "With professional training in Clinical Psychology and experience across diverse clinical settings, I offer evidence-based psychological support tailored to each individual's unique needs and concerns." },
              { i: Users, t: "Compassionate & Client-Centred Approach", d: "I believe therapy works best when a person feels genuinely heard, understood, and supported. My approach combines empathy, professionalism, and collaboration to help clients feel empowered in their healing journey." },
              { i: Sprout, t: "Experience With Diverse Mental Health Concerns", d: "I have worked with children, adolescents, and adults facing a variety of mental health difficulties, including anxiety, depression, OCD, trauma-related concerns, PTSD, emotional difficulties, and relational wounds that may affect present relationships and self-perception." },
              { i: Sprout, t: "Flexible & Accessible Support", d: "I offer both online and offline consultation options, making psychological support more accessible, comfortable, and convenient according to your needs." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="flex gap-5">
                <div className="shrink-0 h-12 w-12 rounded-full bg-[color:var(--color-cream)] border border-border flex items-center justify-center text-[color:var(--color-clay)]">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-2">{t}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCERNS */}
      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-28">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <p className="eyebrow mb-4">Areas of support</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-6">Psychotherapy for a wide range of concerns.</h2>
            <p className="text-foreground/75 leading-relaxed mb-8">
              Working with children, adolescents, and adults — meeting each person where they are,
              with care tailored to their unique story.
            </p>
            <Link to="/services" className="btn-ghost">Explore services</Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm self-center">
            {[
              "Anxiety", "Depression", "Trauma & PTSD",
              "OCD", "ADHD / Autism", "Bereavement",
              "Complex Trauma", "Domestic Abuse", "Family Issues",
              "Infertility / Miscarriage", "Intimacy Issues", "Low Self-Confidence",
              "Menopause", "Chronic Illness / Pain", "Relationships",
              "Dissociation", "Sexual Abuse", "Life Transitions",
            ].map((c) => (
              <li key={c} className="border-b border-border/70 pb-2 text-foreground/80">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* QUOTE / CTA */}
      <section className="relative overflow-hidden">
        <img src={growth} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[color:var(--color-ink)]/70" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 py-32 text-center text-[color:var(--color-cream)]">
          <p className="eyebrow !text-[color:var(--color-sage)] mb-6">You matter. You're heard.</p>
          <h2 className="font-serif text-4xl lg:text-6xl leading-tight">
            Let's make you the author of your own life again.
          </h2>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              to="/booking"
              className="btn-primary !bg-[color:var(--color-cream)] !text-[color:var(--color-ink)] hover:!bg-[color:var(--color-clay)] hover:!text-[color:var(--color-cream)]"
            >
              Book initial consultation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
