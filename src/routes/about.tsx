import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import portrait from "@/assets/devyani.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Devyani Barodh — ManoNirmaan" },
      { name: "description", content: "Meet Devyani Barodh, M.Phil Clinical Psychology. Psychotherapy for children, adolescents and adults navigating anxiety, depression, trauma, OCD and more." },
      { property: "og:title", content: "About Devyani Barodh — ManoNirmaan" },
      { property: "og:description", content: "Compassionate, evidence-based psychotherapy in Varanasi and online." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-20">
        <p className="eyebrow mb-6">A little about me</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          Hi, I'm Devyani — a clinical psychotherapist.
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-16 pb-28">
        <div>
          <img src={portrait} alt="Devyani Barodh" className="w-full object-cover rounded-sm shadow-xl" />
          <div className="mt-6 border-l-2 border-[color:var(--color-clay)] pl-4">
            <p className="font-serif italic text-lg">Devyani Barodh</p>
            <p className="text-sm text-muted-foreground mt-1">
              M.Phil Clinical Psychology<br/>
              M.Sc Clinical Psychology<br/>
              B.A. Hons (Applied Psychology)<br/>
              RCI Registered Clinical Psychologist
            </p>
          </div>
        </div>

        <div className="space-y-6 text-foreground/80 leading-relaxed text-[1.05rem]">
          <p>
            As a psychotherapist, I believe healing is not about "fixing" yourself, but about
            reconnecting with the parts of you that may have been unheard, overwhelmed, or
            emotionally burdened through life experiences.
          </p>
          <p>
            I have worked with children, adolescents, and adults experiencing a variety of mental
            health difficulties — including anxiety, depression, PTSD, OCD, trauma-related
            concerns, emotional difficulties, and relational wounds that may echo in present
            relationships and self-perception.
          </p>
          <p>
            At ManoNirmaan, I offer a safe, compassionate, and non-judgmental space where
            individuals can explore their emotions, understand their inner world, and move toward
            healing with greater self-awareness and resilience.
          </p>
          <p>
            I hold an M.Phil in Clinical Psychology and have experience working with diverse
            mental health conditions across clinical and rehabilitation settings. My work includes
            psychotherapy, psychological assessment, crisis intervention, and psychoeducation.
          </p>
          <p>
            Together, we will create a therapeutic space focused on healing, emotional growth,
            self-understanding, and rebuilding inner strength. I believe every individual carries
            an innate capacity for resilience and transformation.
          </p>
        </div>
      </section>

      {/* MANO + NIRMAAN */}
      <section className="bg-[color:var(--color-secondary)]/40 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="eyebrow mb-6">About ManoNirmaan</p>
          <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">
            <span className="text-[color:var(--color-clay)] italic">Mano</span> · mind &nbsp;
            <span className="text-[color:var(--color-sage-deep)]">+</span> &nbsp;
            <span className="text-[color:var(--color-clay)] italic">Nirmaan</span> · reconstruction
          </h2>
          <p className="text-foreground/75 leading-relaxed max-w-2xl mx-auto">
            ManoNirmaan represents the gentle reconstruction of the inner self through
            compassion, evidence-based therapy, and unwavering presence. A space for healing,
            resilience, and self-growth — for anyone navigating life's difficult chapters with
            a desire for clarity.
          </p>
        </div>
      </section>

      {/* VISION MISSION VALUES */}
      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-24 grid md:grid-cols-3 gap-12">
        <div>
          <p className="eyebrow mb-4">Our Vision</p>
          <p className="text-foreground/80 leading-relaxed">
            Everyone who walks through our door should feel heard and receive personalized care.
            We are not here to blanket everyone with the same approach. You matter. You're heard.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Our Mission</p>
          <p className="text-foreground/80 leading-relaxed">
            To be a safe, non-judgmental, confidential and fully supportive space for all
            individuals — regardless of age and stage of life — and to contribute to a more
            inclusive, caring community.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Our Values</p>
          <ul className="space-y-2 text-foreground/80">
            <li className="font-serif text-xl">Honesty</li>
            <li className="font-serif text-xl">Respect</li>
            <li className="font-serif text-xl">Integrity</li>
            <li className="font-serif text-xl">Conscientiousness</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-10 pb-8 text-center">
        <Link to="/booking" className="btn-primary">Book an initial consultation</Link>
      </section>
    </Layout>
  );
}
