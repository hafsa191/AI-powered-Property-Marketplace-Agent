import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MEETINGS } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/meetings")({
  head: () => ({ meta: [{ title: "Meetings — Aurelia Admin" }, { name: "description", content: "Meetings for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Meetings — Aurelia Admin" }, { property: "og:description", content: "Meetings for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Meetings,
});

type M = (typeof MEETINGS)[number];

function Meetings() {
  const [items, setItems] = useState<M[]>(MEETINGS);
  const [day, setDay] = useState(12);
  const [resched, setResched] = useState<M | null>(null);
  const first = 4; // Oct 1 2026 is Thursday (0=Sun)
  const cells = Array.from({ length: 42 }, (_, i) => i - first + 1);
  const ofDay = items.filter((m) => m.day === day);

  return (
    <>
      <PageHeader title="Meetings" text="Buyer viewings and seller consultations across the team." />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Panel title="October 2026" action={<div className="flex gap-1"><Button size="icon" variant="ghost"><ChevronLeft /></Button><Button size="icon" variant="ghost"><ChevronRight /></Button></div>}>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase text-muted-foreground">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              const valid = d >= 1 && d <= 31;
              const ms = items.filter((m) => m.day === d);
              return (
                <button key={i} disabled={!valid} onClick={() => setDay(d)} className={cn("flex aspect-square flex-col items-center justify-start rounded-xl p-1.5 text-sm transition-all sm:aspect-[4/3]", !valid && "opacity-0", valid && "hover:bg-muted", day === d && "bg-primary text-primary-foreground hover:bg-primary", d === 11 && day !== d && "ring-1 ring-primary")}>
                  <span className="font-semibold">{valid ? d : ""}</span>
                  <span className="mt-auto flex gap-0.5">{ms.map((m) => <span key={m.id} className={cn("h-1.5 w-1.5 rounded-full", day === d ? "bg-primary-foreground" : m.kind === "Buyer" ? "bg-info" : "bg-success")} />)}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-info" /> Buyer meeting</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Seller meeting</span></div>
        </Panel>
        <Panel title={`October ${day}`}>
          {ofDay.length === 0 ? <p className="py-10 text-center text-sm text-muted-foreground">No meetings scheduled.</p> : (
            <ul className="space-y-3">
              {ofDay.map((m) => (
                <li key={m.id} className="rounded-2xl border border-border p-4">
                  <div className="flex items-start justify-between gap-2"><p className="font-semibold">{m.title}</p><StatusBadge status={m.kind} /></div>
                  <p className="mt-1 text-sm text-muted-foreground">{m.time} · with {m.with}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={m.status} />
                    <div className="ml-auto flex gap-2">
                      {m.status !== "Confirmed" && <Button size="sm" variant="soft" onClick={() => { setItems((x) => x.map((y) => (y.id === m.id ? { ...y, status: "Confirmed" } : y))); toast.success("Meeting confirmed"); }}><Check /> Confirm</Button>}
                      <Button size="sm" variant="outline" onClick={() => setResched(m)}><CalendarClock /> Reschedule</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h3 className="mb-3 mt-8 text-sm font-bold">All upcoming</h3>
          <ul className="divide-y divide-border text-sm">
            {items.map((m) => <li key={m.id} className="flex items-center justify-between gap-2 py-2.5"><span className="truncate">Oct {m.day} · {m.time} · {m.with}</span><StatusBadge status={m.status} /></li>)}
          </ul>
        </Panel>
      </div>
      <Dialog open={!!resched} onOpenChange={() => setResched(null)}>
        <DialogContent className="rounded-3xl">
          <DialogHeader><DialogTitle>Reschedule · {resched?.title}</DialogTitle></DialogHeader>
          <form id="rs" className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const d = Number(String(fd.get("date")).split("-")[2]) || resched!.day;
            setItems((x) => x.map((y) => (y.id === resched!.id ? { ...y, day: d, time: String(fd.get("time")) || y.time, status: "Pending" } : y)));
            toast.success("Reschedule sent — awaiting confirmation"); setDay(d); setResched(null);
          }}>
            <Input name="date" type="date" min="2026-10-01" max="2026-10-31" required />
            <Input name="time" placeholder="e.g. 4:00 PM" />
          </form>
          <DialogFooter><Button variant="outline" onClick={() => setResched(null)}>Cancel</Button><Button form="rs" type="submit">Send new time</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
