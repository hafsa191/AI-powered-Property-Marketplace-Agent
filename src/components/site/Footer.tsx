import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "./primitives";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-ink text-ink-foreground">
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-foreground/65">
              An AI-powered brokerage pairing verified properties with serious buyers and tenants — with privacy and
              human oversight at every step.
            </p>
            <div className="mt-6 flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-foreground/15 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">Navigate</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
              {[
                ["/", "Home"],
                ["/properties", "Properties"],
                ["/about", "About"],
                ["/services", "Services"],
                ["/contact", "Contact"],
              ].map(([to, l]) => (
                <li key={to}>
                  <Link to={to as "/"} className="transition-colors hover:text-ink-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">Services</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
              {["Property Buying", "Property Renting", "Property Listing", "AI Matching", "Verification"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="transition-colors hover:text-ink-foreground">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
              <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-primary" /> +92 21 111 287 354</li>
              <li className="flex gap-3"><MessageCircle className="h-4 w-4 shrink-0 text-primary" /> WhatsApp +92 300 0287354</li>
              <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-primary" /> hello@aurelia.estate</li>
              <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-primary" /> Clifton, Karachi</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-ink-foreground/10 pt-8 text-xs text-ink-foreground/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Aurelia Estates. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-ink-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
