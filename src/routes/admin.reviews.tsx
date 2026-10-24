import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, StatusBadge, DashboardCard } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { REVIEWS } from "@/lib/data";

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Aurelia Admin" }, { name: "description", content: "Reviews for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Reviews — Aurelia Admin" }, { property: "og:description", content: "Reviews for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Reviews,
});

function Reviews() {
  const [hidden, setHidden] = useState<number[]>([]);
  return (
    <>
      <PageHeader title="Reviews" text="Moderate client testimonials shown on the website." />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <DashboardCard accent label="Average rating" value="4.9" icon={<Star />} />
        <DashboardCard label="Total reviews" value={2318} delta={8} icon={<Star />} />
        <DashboardCard label="Buyer reviews" value={1624} icon={<Star />} />
        <DashboardCard label="Seller reviews" value={694} icon={<Star />} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {REVIEWS.map((r, i) => (
          <Panel key={i} className={hidden.includes(i) ? "opacity-50" : ""}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">{r.name[0]}</span><div><p className="font-semibold">{r.name}</p><div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className={k < r.rating ? "h-3.5 w-3.5 fill-primary text-primary" : "h-3.5 w-3.5 text-border"} />)}</div></div></div>
              <StatusBadge status={r.role} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">“{r.text}”</p>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => { setHidden(hidden.includes(i) ? hidden.filter((x) => x !== i) : [...hidden, i]); toast.success("Visibility updated"); }}>
              {hidden.includes(i) ? <><Eye /> Show on site</> : <><EyeOff /> Hide from site</>}
            </Button>
          </Panel>
        ))}
      </div>
    </>
  );
}
