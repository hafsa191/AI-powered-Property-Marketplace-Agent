import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BedDouble, Bath, Maximize2, MapPin, Sofa, ShieldCheck, Check, Lock, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/site/PublicShell";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROPERTIES, formatPKR } from "@/lib/data";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = PROPERTIES.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Property not found — Aurelia Estates" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.property;
    const t = `${p.title} in ${p.area}, ${p.city} — Aurelia Estates`;
    return { meta: [{ title: t }, { name: "description", content: p.description }, { property: "og:title", content: t }, { property: "og:description", content: p.description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => (
    <PublicShell><div className="grid min-h-[60vh] place-items-center pt-24 text-center"><div><h1 className="text-4xl">Property not found</h1><Button asChild className="mt-6"><Link to="/properties">Browse properties</Link></Button></div></div></PublicShell>
  ),
  component: Detail,
});

function Detail() {
  const { property: p } = Route.useLoaderData();
  const [img, setImg] = useState(p.gallery[0]);
  const similar = PROPERTIES.filter((x) => x.id !== p.id && (x.type === p.type || x.city === p.city)).slice(0, 3);
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
        <Link to="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> All properties</Link>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_120px]">
          <div className="overflow-hidden rounded-[2rem] shadow-card">
            <img key={img} src={img} alt={p.title} className="aspect-[16/9] w-full animate-fade-up object-cover" />
          </div>
          <div className="flex gap-3 lg:flex-col">
            {p.gallery.map((g) => (
              <button key={g} onClick={() => setImg(g)} className={`overflow-hidden rounded-2xl border-2 transition-all ${img === g ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img src={g} alt="" className="aspect-square w-24 object-cover lg:w-full" />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">For {p.purpose === "Buy" ? "Sale" : "Rent"}</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{p.type}</span>
              {p.verified && <span className="flex items-center gap-1 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success"><ShieldCheck className="h-3.5 w-3.5" /> Verified</span>}
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Ref {p.id}</span>
            </div>
            <h1 className="mt-4 text-4xl font-medium sm:text-5xl">{p.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {p.area}, {p.city} <span className="text-xs">(general area)</span></p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[[Maximize2, "Size", p.size], [BedDouble, "Bedrooms", p.beds || "—"], [Bath, "Bathrooms", p.baths], [Sofa, "Furnishing", p.furnishing]].map(([I, l, v]) => {
                const Icon = I as typeof Maximize2;
                return (
                  <div key={l as string} className="rounded-2xl border border-border bg-card p-4">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{l as string}</p>
                    <p className="font-semibold">{v as string}</p>
                  </div>
                );
              })}
            </div>
            <h2 className="mt-10 text-2xl font-medium">About this property</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
            <h2 className="mt-10 text-2xl font-medium">Amenities</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.amenities.map((a) => <p key={a} className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 text-sm font-medium"><Check className="h-4 w-4 text-primary" /> {a}</p>)}
            </div>
          </div>
          <aside>
            <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-card">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Asking price</p>
              <p className="mt-1 font-display text-4xl font-semibold text-primary">{formatPKR(p.price, p.purpose)}</p>
              <div className="mt-5 flex gap-3 rounded-2xl bg-primary-soft p-4 text-sm">
                <Lock className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-foreground/80">Owner contact and exact address are kept private. Our broker coordinates your viewing.</p>
              </div>
              <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success("Viewing request sent — our broker will confirm shortly."); (e.target as HTMLFormElement).reset(); }}>
                <Input required placeholder="Your name" className="h-11 rounded-xl" />
                <Input required type="tel" placeholder="Phone / WhatsApp" className="h-11 rounded-xl" />
                <Input type="date" className="h-11 rounded-xl" />
                <Button type="submit" size="lg" className="w-full"><CalendarCheck /> Request a viewing</Button>
              </form>
            </div>
          </aside>
        </div>
        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-medium">Similar properties</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <PropertyCard key={s.id} p={s} />)}</div>
          </div>
        )}
      </section>
    </PublicShell>
  );
}
