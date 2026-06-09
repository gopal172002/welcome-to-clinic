import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import devyaniImage from "@/assets/devyani.jpg";

type DevyaniProfileProps = {
  variant: "preview" | "full";
};

export function DevyaniProfile({ variant }: DevyaniProfileProps) {
  const { t } = useTranslation();
  const credentials = t("devyani.credentialsList", { returnObjects: true }) as string[];
  const aboutParagraphs = t("devyani.aboutParagraphs", { returnObjects: true }) as string[];

  if (variant === "preview") {
    return (
      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative max-w-md mx-auto lg:mx-0 w-full">
            <img
              src={devyaniImage}
              alt={t("devyani.name")}
              className="w-full aspect-[4/5] object-cover object-top rounded-sm shadow-lg"
              loading="lazy"
            />
            <blockquote className="absolute -bottom-6 -right-4 lg:-right-8 max-w-[16rem] bg-card border border-border shadow-md p-5 font-serif text-base italic leading-snug text-foreground/85">
              &ldquo;{t("devyani.quote")}&rdquo;
            </blockquote>
          </div>

          <div className="lg:pt-4">
            <p className="font-serif text-xl text-foreground/80">
              {t("devyani.name")}, <span className="italic">{t("devyani.role")}</span>
            </p>
            <p className="mt-8 eyebrow">{t("devyani.eyebrow")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 mb-6 leading-tight">
              {t("devyani.greeting")}
            </h2>
            <div className="space-y-5 text-foreground/75 leading-relaxed">
              <p>{t("devyani.p1")}</p>
              <p>{t("devyani.p2")}</p>
            </div>
            <p className="mt-8 font-serif italic text-foreground/70">
              {t("devyani.credentials")}
            </p>
            <Link to="/about" className="btn-ghost mt-10">
              {t("devyani.readFullStory")}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-24">
      <p className="eyebrow mb-6">{t("devyani.eyebrow")}</p>
      <h1 className="font-serif text-5xl lg:text-6xl max-w-4xl leading-[1.08] mb-16">
        {t("devyani.greetingFull")}
      </h1>

      <div className="grid lg:grid-cols-[minmax(0,22rem)_1fr] gap-12 lg:gap-20 items-start">
        <div>
          <img
            src={devyaniImage}
            alt={t("devyani.name")}
            className="w-full aspect-[4/5] object-cover object-top rounded-sm shadow-lg"
            loading="lazy"
          />
          <p className="mt-6 font-serif text-xl italic">{t("devyani.name")}</p>
          <ul className="mt-5 space-y-2 border-l-2 border-[color:var(--color-clay)] pl-4 text-sm text-foreground/75 leading-relaxed">
            {credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 text-foreground/80 leading-relaxed text-[1.05rem]">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
