import { createFileRoute } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/site/PublicShell";
import { ContactBlock } from "@/components/site/sections";
import p5 from "@/assets/p5.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Aurelia Estates" },
      { name: "description", content: "Call, WhatsApp or email Aurelia Estates, or send your property requirement online." },
      { property: "og:title", content: "Contact Aurelia Estates" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Speak with a broker or submit your requirement in two minutes." },
    ],
  }),
  component: () => (
    <PublicShell>
      <PageHero image={p5} eyebrow="Contact" title="Let's find your next property" text="Reach us on any channel — a broker replies within two business hours." />
      <ContactBlock />
    </PublicShell>
  ),
});
