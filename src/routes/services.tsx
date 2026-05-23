import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import room from "@/assets/room.jpg";

const modalities = [
  { t: "Integrative Counselling", d: "Drawing from multiple evidence-based approaches, tailored to you." },
  { t: "Cognitive Behavioural Therapy (CBT)", d: "Reframing thought patterns that shape how you feel and act." },
  { t: "Dialectical Behaviour Therapy (DBT)", d: "Skills for emotional regulation, distress tolerance and mindfulness." },
  { t: "Acceptance & Commitment Therapy (ACT)", d: "Living a values-led life while making room for difficult emotions." },
  { t: "Behaviour Modification", d: "Structured approaches for behavioural change and habit formation." },
  { t: "Person-Centred Therapy", d: "A relational space rooted in empathy, authenticity and unconditional regard." },
  { t: "Mindfulness-Based Therapy", d: "Cultivating present-moment awareness as a foundation for healing." },
  { t: "Couple Therapy", d: "Repairing communication, intimacy and connection together." },
  { t: "Family Therapy", d: "Working with the family system to support each member's wellbeing." },
];

const concerns = [
  "Abortion", "ADHD / Autism", "Anxiety", "Bereavement", "Child Sexual Abuse",
  "Complex Trauma", "Depression", "Dissociation", "Domestic Abuse", "Family Issues",
  "Infertility / Miscarriage", "Intimacy Issues", "Low Self-Confidence", "Menopause",
  "Chronic Illness / Pain", "Obsessive Compulsive Disorder (OCD)",
  "Post-Traumatic Stress Disorder (PTSD)", "Relationships", "Sexual Abuse", "Trauma",
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Therapies — ManoNirmaan" },
      { name: "description", content: "CBT, DBT, ACT, person-centred therapy, mindfulness, couple and family therapy. A curated range of clinical services, online and in-person." },
      { property: "og:title", content: "Services & Therapies — ManoNirmaan" },
      { property: "og:description", content: "Therapy thoughtfully tailored to you." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-12">
        <p className="eyebrow mb-6">What we offer</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          Therapy thoughtfully <em className="text-[color:var(--color-clay)]">tailored</em> to you.
        </h1>
        <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
          A curated range of clinical services, delivered with warmth, discretion, and the
          highest standards of evidence-based care.
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
          <img src={room} alt="A calm therapy space" className="rounded-sm shadow-xl object-cover w-full" loading="lazy" />
          <div>
            <p className="eyebrow mb-4">Concerns I support</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">
              A wide range of mental health concerns.
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
        <p className="eyebrow mb-4">Pricing</p>
        <h2 className="font-serif text-3xl lg:text-4xl mb-4">Sessions available online & in-person.</h2>
        <p className="text-foreground/75 mb-8">Fees are shared transparently following your initial consultation.</p>
        <Link to="/booking" className="btn-primary">Book a session</Link>
      </section>
    </Layout>
  );
}
