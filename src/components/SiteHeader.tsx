import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.jpg";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/approach", label: "Approach" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:var(--color-background)]/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ManoNirmaan" className="h-11 w-11 rounded-full object-cover" />
          <div className="leading-tight">
            <div className="font-serif text-xl tracking-tight">ManoNirmaan</div>
            <div className="eyebrow text-[0.55rem]">Restore · Reconnect · Rebuild</div>
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
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/booking" className="hidden md:inline-flex btn-primary !py-3 !text-[0.7rem]">
          Book Session
        </Link>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col p-6 gap-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-base">
                {n.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary justify-center mt-2">
              Book Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
