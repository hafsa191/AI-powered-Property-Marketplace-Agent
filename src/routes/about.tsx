import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, HeartHandshake, Lock } from "lucide-react";
import { PublicShell, PageHero } from "@/components/site/PublicShell";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { CTA, HowItWorks, StatsBand } from "@/components/site/sections";
import p1 from "@/assets/p1.jpg";
import agent from "@/assets/agent.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Aurelia Estates" },
      { name: "description", content: "Learn how Aurelia Estates combines AI matching with experienced brokers to make property deals faster and safer." },
      { property: "og:title", content: "About Aurelia Estates" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "A modern brokerage built on technology, trust and privacy." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: ShieldCheck, t: "Verified first", d: "No listing goes live before documents and site checks." },
  { icon: Lock, t: "Privacy by design", d: "Owner contacts and exact addresses are never published." },
  { icon: Sparkles, t: "Intelligent matching", d: "AI narrows thousands of listings to the few that fit." },
  { icon: HeartHandshake, t: "Human oversight", d: "Every match is reviewed and coordinated by a broker." },
];

function About() {
  return (
    <PublicShell>
      <PageHero image={p1} eyebrow="About us" title="A brokerage rebuilt for the way people search today" text="We combine the speed of AI with the judgement of experienced brokers." />
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={agent} alt="Aurelia broker" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card" />
          <div className="glass absolute -bottom-6 -right-4 animate-float rounded-2xl p-5 shadow-card">
            <p className="font-display text-3xl font-semibold text-primary">12 yrs</p>
            <p className="text-xs text-muted-foreground">of brokerage experience</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading align="left" eyebrow="Our story" title="Trust is the product" text="Aurelia began with a simple frustration: property search was noisy, unverified and unsafe for owners. We built a brokerage where every listing is checked, every client is protected, and AI does the tedious work so our brokers can focus on people." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 100} className="rounded-2xl border border-border bg-card p-5">
                <v.icon className="h-6 w-6 text-primary" />
                <p className="mt-3 font-semibold">{v.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <StatsBand />
      <HowItWorks />
      <CTA />
    </PublicShell>
  );
}
