import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.jpg";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

const nav = [
  { to: "/", labelKey: "nav.home" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/services", labelKey: "nav.services" },
  { to: "/approach", labelKey: "nav.approach" },
  { to: "/team", labelKey: "nav.team" },
  { to: "/contact", labelKey: "nav.contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:var(--color-background)]/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt={t("common.brand")} className="h-11 w-11 rounded-full object-cover" />
          <div className="leading-tight">
            <div className="font-serif text-xl tracking-tight">{t("common.brand")}</div>
            <div className="eyebrow text-[0.55rem]">{t("header.tagline")}</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm tracking-wide text-foreground/75 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {t(n.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Link to="/booking" className="btn-primary !py-3 !text-[0.7rem]">
            {t("common.bookSession")}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col p-6 gap-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-base">
                {t(n.labelKey)}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary justify-center mt-2">
              {t("common.bookSession")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
