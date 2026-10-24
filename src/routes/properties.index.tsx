import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, SearchX, RotateCcw } from "lucide-react";
import { PublicShell, PageHero } from "@/components/site/PublicShell";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Reveal } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AMENITIES, PROPERTIES, TYPES, formatPKR } from "@/lib/data";
import { cn } from "@/lib/utils";
import p2 from "@/assets/p2.jpg";

const search = z.object({
  purpose: z.enum(["Buy", "Rent"]).optional(),
  type: z.string().optional(),
  area: z.string().optional(),
  budget: z.string().optional(),
});

export const Route = createFileRoute("/properties/")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Properties for Sale & Rent — Aurelia Estates" },
      { name: "description", content: "Browse verified houses, apartments, villas and commercial spaces with smart filters." },
      { property: "og:title", content: "Browse Verified Properties — Aurelia Estates" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Filter by area, price, size, bedrooms, furnishing and amenities." },
    ],
  }),
  component: PropertiesPage,
});

interface Filters {
  purpose: "All" | "Buy" | "Rent";
  type: string;
  area: string;
  maxPrice: number;
  minSize: number;
  beds: number;
  baths: number;
  furnishing: string;
  amenities: string[];
}

function PropertiesPage() {
  const s = Route.useSearch();
  const maxBudget = s.budget ? Number(s.budget.split("-")[1]) : 200000000;
  const initial: Filters = {
    purpose: s.purpose ?? "All", type: s.type ?? "any", area: s.area ?? "", maxPrice: Math.min(maxBudget, 200000000),
    minSize: 0, beds: 0, baths: 0, furnishing: "any", amenities: [],
  };
  const [f, setF] = useState<Filters>(initial);
  const [sort, setSort] = useState("featured");
  const reset = () => setF({ ...initial, purpose: "All", type: "any", area: "", maxPrice: 200000000 });

  const results = useMemo(() => {
    const r = PROPERTIES.filter(
      (p) =>
        (f.purpose === "All" || p.purpose === f.purpose) &&
        (f.type === "any" || p.type === f.type) &&
        (!f.area || `${p.area} ${p.city}`.toLowerCase().includes(f.area.toLowerCase())) &&
        p.price <= f.maxPrice && p.sizeSqft >= f.minSize && p.beds >= f.beds && p.baths >= f.baths &&
        (f.furnishing === "any" || p.furnishing === f.furnishing) &&
        f.amenities.every((a) => p.amenities.includes(a)),
    );
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    return r;
  }, [f, sort]);

  const panel = <FilterPanel f={f} setF={setF} reset={reset} />;

  return (
    <PublicShell>
      <PageHero image={p2} eyebrow="Property search" title="Discover verified properties" text="Every listing is reviewed by our team. Exact locations are shared after your viewing is confirmed." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[300px_1fr]">
        <aside className="hidden lg:block"><div className="sticky top-28">{panel}</div></aside>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{results.length}</span> properties found</p>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild><Button variant="outline" className="lg:hidden"><SlidersHorizontal /> Filters</Button></SheetTrigger>
                <SheetContent side="left" className="w-[340px] overflow-y-auto"><SheetTitle className="sr-only">Filters</SheetTitle><div className="pt-6">{panel}</div></SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured first</SelectItem>
                  <SelectItem value="low">Price: low to high</SelectItem>
                  <SelectItem value="high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {results.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary"><SearchX className="h-7 w-7" /></span>
              <h3 className="mt-5 text-2xl font-medium">No properties match these filters</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">Try widening your budget or area — or send us your requirement and our AI will alert you when one is listed.</p>
              <Button className="mt-6" onClick={reset}><RotateCcw /> Reset filters</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 80}><PropertyCard p={p} /></Reveal>)}
            </div>
          )}
        </div>
      </section>
    </PublicShell>
  );
}

function FilterPanel({ f, setF, reset }: { f: Filters; setF: (f: Filters) => void; reset: () => void }) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF({ ...f, [k]: v });
  return (
    <div className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <button onClick={reset} className="text-xs font-semibold text-primary hover:underline">Reset all</button>
      </div>
      <Group label="Looking to">
        <div className="grid grid-cols-3 gap-1 rounded-full bg-muted p-1">
          {(["All", "Buy", "Rent"] as const).map((p) => (
            <button key={p} onClick={() => set("purpose", p)} className={cn("rounded-full py-1.5 text-sm font-semibold transition-all", f.purpose === p ? "bg-card text-primary shadow-soft" : "text-muted-foreground")}>{p}</button>
          ))}
        </div>
      </Group>
      <Group label="Property type">
        <div className="flex flex-wrap gap-1.5">
          {["any", ...TYPES].map((t) => <Chip key={t} on={f.type === t} onClick={() => set("type", t)}>{t === "any" ? "All" : t}</Chip>)}
        </div>
      </Group>
      <Group label="Area / city">
        <input value={f.area} onChange={(e) => set("area", e.target.value)} placeholder="e.g. DHA, Clifton, Lahore" className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
      </Group>
      <Group label={`Max price · ${formatPKR(f.maxPrice)}`}>
        <Slider value={[f.maxPrice]} min={100000} max={200000000} step={100000} onValueChange={([v]) => set("maxPrice", v)} />
      </Group>
      <Group label={`Min size · ${f.minSize.toLocaleString()} sq ft`}>
        <Slider value={[f.minSize]} min={0} max={9000} step={250} onValueChange={([v]) => set("minSize", v)} />
      </Group>
      <Group label="Bedrooms">
        <div className="flex gap-1.5">{[0, 1, 2, 3, 4, 5].map((n) => <Chip key={n} on={f.beds === n} onClick={() => set("beds", n)}>{n === 0 ? "Any" : `${n}+`}</Chip>)}</div>
      </Group>
      <Group label="Bathrooms">
        <div className="flex gap-1.5">{[0, 1, 2, 3, 4].map((n) => <Chip key={n} on={f.baths === n} onClick={() => set("baths", n)}>{n === 0 ? "Any" : `${n}+`}</Chip>)}</div>
      </Group>
      <Group label="Furnishing">
        <div className="flex flex-wrap gap-1.5">{["any", "Furnished", "Semi-furnished", "Unfurnished"].map((t) => <Chip key={t} on={f.furnishing === t} onClick={() => set("furnishing", t)}>{t === "any" ? "Any" : t}</Chip>)}</div>
      </Group>
      <Group label="Amenities">
        <div className="flex flex-wrap gap-1.5">
          {AMENITIES.map((a) => (
            <Chip key={a} on={f.amenities.includes(a)} onClick={() => set("amenities", f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a])}>{a}</Chip>
          ))}
        </div>
      </Group>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>{children}</div>;
}
function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition-all", on ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary")}>
      {children}
    </button>
  );
}
