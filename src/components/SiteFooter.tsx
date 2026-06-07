import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.jpg";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="mt-32 border-t border-border bg-[color:var(--color-secondary)]/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <div className="font-serif text-2xl">{t("common.brand")}</div>
              <div className="eyebrow text-[0.6rem]">{t("footer.tagline")}</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.visit")}</div>
          <p className="text-sm leading-relaxed flex gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[color:var(--color-clay)]" />
            <span>
              {t("common.addressLine1")}
              <br />
              {t("common.addressLine2")}
            </span>
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.reach")}</div>
          <div className="space-y-3 text-sm">
            <a href={`mailto:${t("common.email")}`} className="flex items-center gap-2 hover:text-[color:var(--color-clay)]">
              <Mail size={16} className="text-[color:var(--color-clay)]" />
              {t("common.email")}
            </a>
            <a href={`tel:${t("common.phoneHref")}`} className="flex items-center gap-2 hover:text-[color:var(--color-clay)]">
              <Phone size={16} className="text-[color:var(--color-clay)]" />
              {t("common.phoneDisplay")}
            </a>
          </div>
          <Link to="/booking" className="inline-block mt-6 text-sm border-b border-foreground pb-0.5">
            {t("footer.book")}
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
          <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.credentials")}</span>
        </div>
      </div>
    </footer>
  );
}
