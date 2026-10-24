import { createFileRoute } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/site/PublicShell";
import { AISection, CTA, ServicesGrid } from "@/components/site/sections";
import { SectionHeading } from "@/components/site/primitives";
import p4 from "@/assets/p4.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Buying, Renting, Listing & AI Matching | Aurelia Estates" },
      { name: "description", content: "Property buying, renting, listing, verification, AI matching and meeting coordination." },
      { property: "og:title", content: "Aurelia Estates Services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "End-to-end brokerage services for buyers, tenants and sellers." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <PublicShell>
      <PageHero image={p4} eyebrow="Services" title="Full-service brokerage, intelligently delivered" text="Whether you're buying, renting or selling, we handle every step." />
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="What we do" title="Eight ways we help you move" />
        <div className="mt-14"><ServicesGrid /></div>
      </section>
      <AISection />
      <div className="pt-24"><CTA /></div>
    </PublicShell>
  );
}
