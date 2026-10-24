import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { PROPERTIES, formatPKR } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/matching")({
  head: () => ({ meta: [{ title: "AI Matching — Aurelia Admin" }, { name: "description", content: "AI Matching for the Aurelia Estates brokerage team." }, { property: "og:title", content: "AI Matching — Aurelia Admin" }, { property: "og:description", content: "AI Matching for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Matching,
});

const BUYERS = [
  { id: "BQ-2402", name: "Ali Hassan", req: "4-bed house · Karachi · ≈ PKR 9 Cr · garden", tags: ["House", "4 Beds", "Karachi", "Garden"], matches: [["AE-1081", 95], ["AE-1031", 82], ["AE-1024", 74]] },
  { id: "BQ-2404", name: "Zara Ahmed", req: "Furnished apartment for rent · Clifton · ≤ 4 Lac/mo", tags: ["Apartment", "Rent", "Furnished"], matches: [["AE-1045", 93], ["AE-1073", 79], ["AE-1060", 61]] },
  { id: "BQ-2406", name: "Usman Tariq", req: "Villa with pool · Islamabad · rent", tags: ["Villa", "Pool", "Islamabad"], matches: [["AE-1090", 97], ["AE-1024", 70], ["AE-1052", 58]] },
] as const;

function Ring({ v }: { v: number }) {
  const c = 2 * Math.PI * 26;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
        <circle cx="30" cy="30" r="26" fill="none" stroke="var(--border)" strokeWidth="6" />
        <circle cx="30" cy="30" r="26" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-sm font-bold">{v}%</span>
    </div>
  );
}

function Matching() {
  const [sel, setSel] = useState(0);
  const b = BUYERS[sel];
  return (
    <>
      <PageHeader title="AI property matching" text="Buyer requirements scored against verified listings. Review before sharing." />
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Panel title="Buyer requirements">
          <div className="space-y-2">
            {BUYERS.map((x, i) => (
              <button key={x.id} onClick={() => setSel(i)} className={cn("w-full rounded-2xl border p-4 text-left transition-all", sel === i ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40")}>
                <p className="font-mono text-xs text-muted-foreground">{x.id}</p>
                <p className="font-semibold">{x.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{x.req}</p>
              </button>
            ))}
          </div>
        </Panel>
        <div>
          <Panel className="mb-6 bg-gradient-ink text-ink-foreground">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold">{b.name}</span>
              {b.tags.map((t) => <span key={t} className="rounded-full bg-ink-foreground/10 px-2.5 py-1 text-xs">{t}</span>)}
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"><Sparkles className="h-3.5 w-3.5" /> AI-generated matches</span>
            </div>
          </Panel>
          <div key={b.id} className="space-y-4">
            {b.matches.map(([pid, score], i) => {
              const p = PROPERTIES.find((x) => x.id === pid)!;
              return (
                <Panel key={pid} className="animate-fade-up" >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: `${i * 100}ms` }}>
                    <img src={p.image} alt="" className="h-24 w-full rounded-2xl object-cover sm:w-36" />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs text-muted-foreground">{p.id}</p>
                      <h3 className="text-lg font-medium">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.area}, {p.city} · {p.beds} beds · {formatPKR(p.price, p.purpose)}</p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-primary" style={{ width: `${score}%` }} /></div>
                    </div>
                    <Ring v={score} />
                    <Button size="sm" onClick={() => toast.success(`${p.title} shared with ${b.name}`)}><Send /> Share</Button>
                  </div>
                </Panel>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Match scores are AI-generated estimates and must be verified by a broker.</p>
        </div>
      </div>
    </>
  );
}
