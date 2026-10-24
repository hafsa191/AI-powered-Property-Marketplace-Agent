import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Sparkles, CalendarClock, BadgeDollarSign, Star, CheckCheck } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { NOTIFICATIONS } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Aurelia Admin" }, { name: "description", content: "Notifications for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Notifications — Aurelia Admin" }, { property: "og:description", content: "Notifications for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Notifs,
});

const ICON = { query: Bell, ai: Sparkles, meeting: CalendarClock, deal: BadgeDollarSign, review: Star } as const;

function Notifs() {
  const [read, setRead] = useState<number[]>([]);
  return (
    <>
      <PageHeader title="Notifications" text="Everything that needs your attention." actions={<Button variant="outline" onClick={() => setRead(NOTIFICATIONS.map((_, i) => i))}><CheckCheck /> Mark all read</Button>} />
      <Panel>
        <ul className="divide-y divide-border">
          {NOTIFICATIONS.map((n, i) => {
            const I = ICON[n.type as keyof typeof ICON];
            const unread = !read.includes(i);
            return (
              <li key={i} onClick={() => setRead([...read, i])} className="flex cursor-pointer items-center gap-4 py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary"><I className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1"><p className={cn("text-sm", unread ? "font-bold" : "font-medium text-muted-foreground")}>{n.t}</p><p className="truncate text-xs text-muted-foreground">{n.d}</p></div>
                <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                {unread && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
              </li>
            );
          })}
        </ul>
      </Panel>
    </>
  );
}
