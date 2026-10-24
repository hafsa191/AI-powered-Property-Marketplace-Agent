import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/history")({
  head: () => ({ meta: [{ title: "History — Aurelia Admin" }, { name: "description", content: "History for the Aurelia Estates brokerage team." }, { property: "og:title", content: "History — Aurelia Admin" }, { property: "og:description", content: "History for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: History,
});

const LOG = [
  ["Today, 9:42 PM", "Sara A.", "Accepted buyer query BQ-2402"],
  ["Today, 8:15 PM", "AI Agent", "Extracted requirement from WhatsApp voice note"],
  ["Today, 6:03 PM", "Bilal K.", "Marked AE-1060 Twilight Penthouse as Sold"],
  ["Today, 2:30 PM", "Sara A.", "Verified property AE-1024"],
  ["Yesterday, 7:10 PM", "AI Agent", "Scheduled viewing for Ayesha Raza · Oct 12"],
  ["Yesterday, 4:44 PM", "Hina M.", "Rejected seller query SQ-2409 (incomplete documents)"],
  ["Oct 8, 11:20 AM", "Bilal K.", "Changed brand theme to Luxury Gold"],
  ["Oct 7, 3:05 PM", "Sara A.", "Added property AE-1090 Lakeside Modern Villa"],
];

function History() {
  return (
    <>
      <PageHeader title="Activity history" text="A complete audit trail of team and AI actions." />
      <Panel>
        <ol className="relative ml-3 border-l border-border">
          {LOG.map(([t, who, what], i) => (
            <li key={i} className="mb-6 ml-6 last:mb-0">
              <span className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-card ${who === "AI Agent" ? "bg-primary" : "bg-chart-2"}`} />
              <p className="text-xs text-muted-foreground">{t}</p>
              <p className="text-sm"><span className="font-semibold">{who}</span> · {what}</p>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
