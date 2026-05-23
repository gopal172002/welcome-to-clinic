import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-[color:var(--color-secondary)]/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <div className="font-serif text-2xl">ManoNirmaan</div>
              <div className="eyebrow text-[0.6rem]">Guiding you back to yourself</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A quiet space for clarity, healing and growth — guided by clinical psychology,
            held with care.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Visit</div>
          <p className="text-sm leading-relaxed flex gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[color:var(--color-clay)]" />
            <span>Chiraigaon, Near Block Office<br/>Varanasi, Uttar Pradesh 221112</span>
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Reach</div>
          <div className="space-y-3 text-sm">
            <a href="mailto:barodhdevyani@gmail.com" className="flex items-center gap-2 hover:text-[color:var(--color-clay)]">
              <Mail size={16} className="text-[color:var(--color-clay)]" />
              barodhdevyani@gmail.com
            </a>
            <a href="tel:+919016183510" className="flex items-center gap-2 hover:text-[color:var(--color-clay)]">
              <Phone size={16} className="text-[color:var(--color-clay)]" />
              +91 90161 83510
            </a>
          </div>
          <Link to="/booking" className="inline-block mt-6 text-sm border-b border-foreground pb-0.5">
            Book a session →
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} ManoNirmaan. All rights reserved.</span>
          <span>Devyani Barodh · M.Phil Clinical Psychology · RCI Registered</span>
        </div>
      </div>
    </footer>
  );
}
