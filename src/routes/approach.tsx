import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import growth from "@/assets/growth.jpg";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "My Therapeutic Approach — ManoNirmaan" },
      { name: "description", content: "A relational, integrative approach to therapy — recognising and nurturing the strengths that brought you here. Initial assessment, frequency, and ongoing review." },
      { property: "og:title", content: "My Therapeutic Approach — ManoNirmaan" },
      { property: "og:description", content: "Relational, integrative, evidence-based psychotherapy." },
    ],
  }),
  component: Approach,
});

function Approach() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16">
        <p className="eyebrow mb-6">My therapeutic approach</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-4xl leading-[1.05]">
          Not about <em className="text-[color:var(--color-clay)]">fixing you</em> — about nurturing the strengths that brought you here.
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 pb-28">
        <div className="space-y-6 text-foreground/80 leading-relaxed text-[1.05rem]">
          <p>
            Therapy with me is about recognising, respecting, and gently nurturing the strengths
            that have brought you to this point. To do this, I offer a relational integrative
            approach.
          </p>
          <p>
            <span className="font-serif italic text-[color:var(--color-clay)]">A relational approach</span> means
            I tailor therapy according to each individual's unique needs while creating a
            compassionate, collaborative, and non-judgmental space for healing and self-growth.
          </p>
          <p>
            <span className="font-serif italic text-[color:var(--color-clay)]">As an integrative therapist</span>,
            I draw from different evidence-based therapeutic approaches and adapt them according
            to your unique needs, experiences, and goals — rather than following a single fixed
            method.
          </p>
        </div>
        <div>
          <img src={growth} alt="" className="rounded-sm shadow-xl object-cover w-full" loading="lazy" />
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="bg-[color:var(--color-secondary)]/40 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="font-serif lg:text-5xl text-center mb-16 max-w-3xl mx-auto leading-tight font-bold text-4xl">
            What to expect after your initial consultation
          </p>

          <div className="space-y-14">
            {[
              {
                n: "01",
                t: "Initial Assessments",
                d: "Our first few sessions will involve an assessment period to determine if therapy is suitable for you and if I am the right therapist for your needs. This is a collaborative process where we both evaluate the therapeutic fit.",
              },
              {
                n: "02",
                t: "Session Frequency",
                d: "There's no set number of sessions — therapy is individualized. If you're dealing with multiple issues, I often find it helpful to focus on one specific area of work over a few sessions before moving to the next issue. This approach allows us to go deep enough to create meaningful change without feeling overwhelmed. I generally work best with clients long-term to support deeper healing, lasting coping skills, and the chance to address complex patterns. We'll agree on session frequency together; weekly sessions tend to deliver the best results, though fortnightly options are available when needed. Regular weekly attendance helps maintain therapeutic momentum, allows for deeper processing of issues between sessions and enables the development of a strong therapeutic relationship essential for meaningful change.",
              },
              {
                n: "03",
                t: "Ongoing Review",
                d: "We'll check progress regularly to keep therapy aligned with your goals. I recommend reviewing every 6–8 sessions, or sooner if you'd like, so we can adjust focus and address any concerns. These check-ins allow us to revisit your goals, address any concerns, and adjust our approach based on your feedback.",
              },
            ].map((s) => (
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
        <Link to="/booking" className="btn-primary">Book a session</Link>
      </section>
    </Layout>
  );
}
