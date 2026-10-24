import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/site/PublicShell";
import { SearchBar } from "@/components/site/SearchBar";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { AISection, ContactBlock, CTA, HowItWorks, Reviews, ServicesGrid, StatsBand } from "@/components/site/sections";
import { PROPERTIES } from "@/lib/data";
import hero from "@/assets/hero-villa.jpg";
import { CircuitField, MotionText } from "@/components/site/MotionLayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia Estates — Find Verified Homes with AI Assistance" },
      { name: "description", content: "Buy, rent or sell verified properties in Karachi, Lahore and Islamabad with AI-powered matching and expert brokers." },
      { property: "og:title", content: "Aurelia Estates — AI-Powered Property Brokerage" },
      { property: "og:description", content: "Verified properties, intelligent matching and white-glove brokerage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PROPERTIES.filter((p) => p.featured);
  return (
    <PublicShell>
      {/* Hero */}
      <section className="fusion-hero relative flex items-end overflow-hidden bg-ink pb-12 pt-32 text-ink-foreground">
        <img src={hero} data-parallax alt="Contemporary villa with landscaped gardens and mountain views" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <CircuitField />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="glass-dark inline-flex animate-fade-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI-powered brokerage · Human-verified
            </span>
            <h1 className="mt-6 text-5xl font-medium leading-[1.08] sm:text-6xl md:text-7xl">
              <MotionText text="Aurelia Estates" />
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg text-ink-foreground/80 [animation-delay:240ms]">
              Remarkable homes. The right people. Our AI matches you with verified properties, and our brokers handle everything else.
            </p>
          </div>
          <SearchBar className="mt-10 max-w-5xl animate-fade-up [animation-delay:360ms] shadow-elegant hover:shadow-card transition-shadow duration-500" />
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink-foreground/75 animate-fade-up [animation-delay:480ms]">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Every listing verified</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> 4.9 from 2,300+ clients</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Private seller details, always</span>
          </div>
        </div>
      </section>

      <div className="motion-ticker overflow-hidden border-y border-primary/25 bg-ink py-4 text-ink-foreground" aria-label="Verified homes, intelligent matching, private viewings">
        <div className="motion-ticker-track" aria-hidden="true">{[0, 1, 2, 3].map((i) => <span key={i} className="flex shrink-0 items-center gap-8 px-4 text-sm font-semibold uppercase"><span>Verified homes</span><Sparkles className="h-4 w-4 text-primary" /><span>Intelligent matching</span><span className="text-motion-accent">✦</span><span>Private viewings</span><Sparkles className="h-4 w-4 text-primary" /></span>)}</div>
      </div>

      <div className="-mt-px bg-background pt-16"><StatsBand /></div>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="Featured properties" title={<>Handpicked, <em className="text-primary">verified</em> residences</>} text="Exact addresses and owner details are shared only after verification and a confirmed viewing." />
          <Button asChild variant="outline" size="lg"><Link to="/properties">View all properties <ArrowRight /></Link></Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 120}><PropertyCard p={p} /></Reveal>
          ))}
        </div>
      </section>

      <div className="bg-muted/60"><HowItWorks /></div>
      <AISection />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Our services" title="Everything you need, under one roof" text="For buyers, tenants and sellers — powered by data, delivered by people." />
        <div className="mt-14"><ServicesGrid /></div>
      </section>

      <Reviews />
      <CTA />
      <div className="bg-muted/60"><ContactBlock /></div>
    </PublicShell>
  );
}
