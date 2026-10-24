import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Maximize2, MapPin, ShieldCheck, Heart, ArrowUpRight, Sofa } from "lucide-react";
import { useState } from "react";
import { formatPKR, type Property } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PropertyCard({ p }: { p: Property }) {
  const [liked, setLiked] = useState(false);
  return (
    <article data-tilt className="motion-property group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-colors duration-500 hover:shadow-card hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            For {p.purpose === "Buy" ? "Sale" : "Rent"}
          </span>
          <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-foreground">{p.type}</span>
        </div>
        <button
          onClick={() => setLiked(!liked)}
          aria-label="Save property"
          className="glass absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full transition-transform hover:scale-110"
        >
          <Heart className={cn("h-4 w-4", liked ? "fill-destructive text-destructive" : "text-foreground")} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <p className="font-display text-2xl font-semibold text-ink-foreground">{formatPKR(p.price, p.purpose)}</p>
          {p.verified && (
            <span className="flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[0.7rem] font-bold text-ink-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-medium text-foreground">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> {p.area}, {p.city}
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2 border-y border-border py-3 text-xs text-muted-foreground">
          <Spec icon={<Maximize2 />} label={p.size} />
          <Spec icon={<BedDouble />} label={p.beds ? `${p.beds} Beds` : "—"} />
          <Spec icon={<Bath />} label={`${p.baths} Baths`} />
          <Spec icon={<Sofa />} label={p.furnishing.split("-")[0]} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.amenities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-full bg-muted px-2.5 py-1 text-[0.7rem] font-medium text-muted-foreground">
              {a}
            </span>
          ))}
          {p.amenities.length > 3 && (
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[0.7rem] font-semibold text-primary">
              +{p.amenities.length - 3}
            </span>
          )}
        </div>
        <Link
          to="/properties/$id"
          params={{ id: p.id }}
          className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-foreground"
        >
          View Details
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex min-w-0 flex-col items-center gap-1 text-center [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-primary">
      {icon}
      <span className="truncate">{label}</span>
    </span>
  );
}
