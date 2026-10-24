import { Link } from "@tanstack/react-router";
import {
  ClipboardList, Sparkles, ShieldCheck, CalendarCheck, Handshake, MessageCircle, PhoneCall, FileText,
  Home, KeyRound, Building2, GitCompareArrows, BadgeCheck, UserRound, Store, CalendarClock, Star, Quote, ArrowRight,
  Phone, Mail, MapPin, Clock, Bot,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Counter, Reveal, SectionHeading } from "./primitives";
import { REVIEWS, STATS } from "@/lib/data";
import agent from "@/assets/agent.jpg";

export const STEPS = [
  { icon: ClipboardList, title: "Submit Requirement", text: "Share what you need via WhatsApp, AI call or our online form." },
  { icon: Sparkles, title: "AI Finds Matches", text: "Our engine scores every verified listing against your brief." },
  { icon: ShieldCheck, title: "Admin Verifies", text: "A broker double-checks documents and coordinates both sides." },
  { icon: CalendarCheck, title: "Property Viewing", text: "We schedule a viewing at a time that suits you and the owner." },
  { icon: Handshake, title: "Deal Finalization", text: "Negotiation, paperwork and transfer — handled end to end." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="How it works" title={<>From requirement to keys, <em className="text-primary">in five steps</em></>} />
      <div className="relative mt-16 grid gap-6 md:grid-cols-5">
        <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 120} className="relative text-center">
            <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-border bg-card shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:shadow-elegant">
              <s.icon className="h-8 w-8 text-primary" />
              <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AISection() {
  const channels = [
    { icon: MessageCircle, t: "WhatsApp", d: "Send a message or voice note any time." },
    { icon: PhoneCall, t: "AI Voice Call", d: "Our assistant calls you and captures every detail." },
    { icon: FileText, t: "Online Form", d: "A guided form that takes under two minutes." },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-ink py-24 text-ink-foreground">
      <div className="grid-pattern absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" invert eyebrow="AI assistance" title={<>Find the right property with <span className="text-gradient-primary relative">intelligent assistance<span className="absolute -right-4 top-0 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span></span></span></>} text="Tell us what you're looking for in your own words. Our AI understands budget, location, lifestyle and must-haves — then a human broker takes it from there." />
          <div className="mt-10 space-y-3">
            {channels.map((c, i) => (
              <Reveal key={c.t} delay={i * 120} className="flex items-center gap-4 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-4 transition-colors hover:border-primary/50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><c.icon className="h-5 w-5" /></span>
                <div><p className="font-semibold">{c.t}</p><p className="text-sm text-ink-foreground/60">{c.d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="relative">
          <div className="relative mx-auto max-w-md rounded-[2rem] border border-ink-foreground/15 bg-ink-soft p-6 shadow-card">
            <div className="flex items-center gap-3 border-b border-ink-foreground/10 pb-4">
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
                <Bot className="relative h-6 w-6" />
              </span>
              <div className="flex-1"><p className="font-semibold">Aurelia AI Assistant</p><p className="text-xs text-success">● Live call · 02:14</p></div>
              <div className="flex h-8 items-center gap-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="h-full w-1 origin-center animate-wave rounded-full bg-primary" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
            </div>
            <div className="space-y-3 py-5 text-sm">
              <Bubble ai>Assalam-o-Alaikum! What kind of property are you looking for?</Bubble>
              <Bubble>A 4-bed house in DHA Lahore, around 8 crore, near a good school.</Bubble>
              <Bubble ai>Got it. Should it have a garden or servant quarter?</Bubble>
              <Bubble>Garden yes, and ready to move in.</Bubble>
            </div>
            <div className="rounded-2xl bg-primary-soft p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Extracted requirement</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["House", "4 Beds", "DHA Lahore", "≈ PKR 8 Cr", "Garden", "Near school", "Ready"].map((t) => (
                  <span key={t} className="rounded-full bg-ink-foreground/10 px-2.5 py-1 text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="glass absolute -bottom-6 -left-2 hidden animate-float rounded-2xl p-4 text-foreground shadow-card sm:block">
            <p className="text-xs text-muted-foreground">AI-generated match</p>
            <p className="font-display text-2xl font-semibold text-primary">94% Match</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bubble({ ai, children }: { ai?: boolean; children: React.ReactNode }) {
  return (
    <div className={ai ? "flex" : "flex justify-end"}>
      <p className={ai ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-ink-foreground/10 px-4 py-2.5" : "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-primary-foreground"}>
        {children}
      </p>
    </div>
  );
}

export const SERVICES = [
  { icon: Home, t: "Property Buying", d: "Curated, verified homes that match your brief and budget." },
  { icon: KeyRound, t: "Property Renting", d: "Fast, transparent rentals with screened landlords and tenants." },
  { icon: Building2, t: "Property Listing", d: "Professional listings with photography and privacy protection." },
  { icon: GitCompareArrows, t: "Property Matching", d: "AI scoring connects requirements to the right listings." },
  { icon: BadgeCheck, t: "Property Verification", d: "Ownership documents and site checks before anything goes live." },
  { icon: UserRound, t: "Buyer Assistance", d: "A dedicated broker from first call to final transfer." },
  { icon: Store, t: "Seller Assistance", d: "Pricing guidance, qualified buyers and negotiation support." },
  { icon: CalendarClock, t: "Meeting Coordination", d: "Viewings and meetings scheduled around everyone's time." },
];

export function ServicesGrid({ limit }: { limit?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.slice(0, limit).map((s, i) => (
        <Reveal key={s.t} delay={(i % 4) * 100} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
            <s.icon className="h-6 w-6" />
          </span>
          <h3 className="relative mt-6 text-xl font-medium">{s.t}</h3>
          <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-soft md:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="min-w-0 bg-card px-3 py-6 text-center sm:py-8">
            <p className="whitespace-nowrap font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-none tabular-nums text-primary"><Counter to={s.value} suffix={s.suffix} /></p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  const list = [...REVIEWS, ...REVIEWS];
  return (
    <section className="overflow-hidden py-24">
      <SectionHeading eyebrow="Client stories" title="Trusted by buyers and sellers" />
      <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {list.map((r, i) => (
            <figure key={i} className="w-[340px] shrink-0 rounded-3xl border border-border bg-card p-7 shadow-soft">
              <Quote className="h-8 w-8 text-primary/30" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className={k < r.rating ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4 text-border"} />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-semibold text-primary-foreground">{r.name[0]}</span>
                <div className="flex-1"><p className="text-sm font-semibold">{r.name}</p></div>
                <span className={r.role === "Buyer" ? "rounded-full bg-info-soft px-2.5 py-1 text-xs font-semibold text-info" : "rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success"}>{r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactBlock() {
  const info = [
    { icon: Phone, t: "Phone", d: "+92 21 111 287 354" },
    { icon: MessageCircle, t: "WhatsApp", d: "+92 300 0287354" },
    { icon: Mail, t: "Email", d: "hello@aurelia.estate" },
    { icon: MapPin, t: "Office", d: "Office 1204, Ocean Tower, Clifton, Karachi" },
    { icon: Clock, t: "Business hours", d: "Mon – Sat · 10:00 AM – 7:00 PM" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-card lg:grid-cols-[1fr_1.2fr]">
        <div className="relative bg-ink p-8 text-ink-foreground sm:p-12">
          <img src={agent} alt="Aurelia broker" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
          <div className="relative">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Speak with a broker today</h2>
            <ul className="mt-10 space-y-5">
              {info.map((i) => (
                <li key={i.t} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><i.icon className="h-5 w-5" /></span>
                  <div><p className="text-xs uppercase tracking-widest text-ink-foreground/50">{i.t}</p><p className="font-medium">{i.d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form
          className="grid gap-4 p-8 sm:grid-cols-2 sm:p-12"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thank you! A broker will contact you within 2 hours.");
            (e.target as HTMLFormElement).reset();
          }}
        >
          <div className="sm:col-span-2"><h3 className="text-2xl font-medium">Send us your requirement</h3><p className="mt-1 text-sm text-muted-foreground">Your details stay private and are only seen by our team.</p></div>
          <Input required placeholder="Full name" className="h-12 rounded-xl" />
          <Input required type="tel" placeholder="Phone / WhatsApp" className="h-12 rounded-xl" />
          <Input type="email" placeholder="Email" className="h-12 rounded-xl sm:col-span-2" />
          <div className="flex gap-2 sm:col-span-2">
            {["I want to buy", "I want to rent", "I want to sell"].map((t, i) => (
              <label key={t} className="flex-1 cursor-pointer">
                <input type="radio" name="intent" defaultChecked={i === 0} className="peer sr-only" />
                <span className="block rounded-xl border border-border px-3 py-3 text-center text-sm font-medium transition-all peer-checked:border-primary peer-checked:bg-primary-soft peer-checked:text-primary">{t}</span>
              </label>
            ))}
          </div>
          <Textarea placeholder="Tell us about the property you need — area, budget, size..." className="min-h-32 rounded-xl sm:col-span-2" />
          <Button size="lg" type="submit" className="sm:col-span-2">Submit requirement <ArrowRight /></Button>
        </form>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <Reveal className="relative overflow-hidden rounded-lg bg-primary p-10 text-primary-foreground sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ink-foreground/10" />
        <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-ink-foreground/10" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div><h2 className="text-3xl font-medium sm:text-4xl">Have a property to sell or rent?</h2><p className="mt-3 max-w-lg opacity-80">List with us — we verify, protect your privacy and bring only qualified buyers.</p></div>
          <Button asChild size="lg" variant="ink" className="animate-glow"><Link to="/contact">List your property <ArrowRight /></Link></Button>
        </div>
      </Reveal>
    </section>
  );
}
