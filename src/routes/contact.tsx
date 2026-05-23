import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ManoNirmaan" },
      { name: "description", content: "Reach ManoNirmaan in Varanasi. Email barodhdevyani@gmail.com or call +91 90161 83510." },
      { property: "og:title", content: "Contact — ManoNirmaan" },
      { property: "og:description", content: "A quiet space for the mind. Get in touch." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16">
        <p className="eyebrow mb-6">Reach us</p>
        <h1 className="font-serif text-5xl lg:text-7xl max-w-3xl leading-[1.05]">
          A quiet space, <em className="text-[color:var(--color-clay)]">just a message away</em>.
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 pb-28 grid md:grid-cols-3 gap-8">
        {[
          { i: MapPin, t: "Visit", l: ["Chiraigaon, Near Block Office", "Varanasi, Uttar Pradesh 221112"] },
          { i: Mail, t: "Email", l: ["barodhdevyani@gmail.com"], href: "mailto:barodhdevyani@gmail.com" },
          { i: Phone, t: "Phone", l: ["+91 90161 83510"], href: "tel:+919016183510" },
        ].map(({ i: Icon, t, l, href }) => (
          <div key={t} className="bg-background border border-border p-8 rounded-sm">
            <div className="h-11 w-11 rounded-full bg-[color:var(--color-secondary)] flex items-center justify-center text-[color:var(--color-clay)] mb-5">
              <Icon size={18} />
            </div>
            <div className="eyebrow mb-2">{t}</div>
            {href ? (
              <a href={href} className="font-serif text-xl hover:text-[color:var(--color-clay)]">
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
          <p className="eyebrow mb-4">A note on response times</p>
          <p className="font-serif text-2xl lg:text-3xl leading-snug max-w-2xl mx-auto">
            Messages are responded to within 24–48 hours, Monday to Saturday. If this is a
            mental health emergency, please contact your nearest hospital or call iCall at
            <a href="tel:9152987821" className="underline ml-1">9152987821</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
