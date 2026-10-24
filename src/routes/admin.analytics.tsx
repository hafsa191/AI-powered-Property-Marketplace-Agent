import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";
import { PageHeader, Panel, chartTooltip } from "@/components/admin/ui";
import { DEALS, MATCH_PERF, PRICE_TREND, QUERY_STATUS, VOLUME } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Aurelia Admin" }, { name: "description", content: "Analytics for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Analytics — Aurelia Admin" }, { property: "og:description", content: "Analytics for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Analytics,
});

const ax = { stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false } as const;
const grid = <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />;
const COLORS = ["var(--warning)", "var(--chart-1)", "var(--destructive)", "var(--chart-4)"];
const NOTIF = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({ d, sent: [120, 140, 132, 168, 150, 190, 90][i] }));

function Analytics() {
  return (
    <>
      <PageHeader title="Analytics" text="Market and operational performance at a glance." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Avg. price trend (PKR Lac / Marla)">
          <div className="h-72"><ResponsiveContainer><LineChart data={PRICE_TREND}>{grid}<XAxis dataKey="m" {...ax} /><YAxis {...ax} /><Tooltip {...chartTooltip} /><Legend />
            <Line type="monotone" dataKey="karachi" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="lahore" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="islamabad" stroke="var(--chart-4)" strokeWidth={2.5} dot={false} />
          </LineChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Buyer & seller volume">
          <div className="h-72"><ResponsiveContainer><BarChart data={VOLUME}>{grid}<XAxis dataKey="d" {...ax} /><YAxis {...ax} /><Tooltip {...chartTooltip} /><Legend />
            <Bar dataKey="buyers" fill="var(--chart-1)" radius={[6, 6, 0, 0]} /><Bar dataKey="sellers" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="AI matching performance (%)">
          <div className="h-72"><ResponsiveContainer><AreaChart data={MATCH_PERF}>{grid}<XAxis dataKey="w" {...ax} /><YAxis {...ax} domain={[40, 100]} /><Tooltip {...chartTooltip} /><Legend />
            <Area type="monotone" dataKey="accuracy" stroke="var(--chart-1)" fill="var(--primary-soft)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="accepted" stroke="var(--chart-4)" fill="transparent" strokeWidth={2.5} />
          </AreaChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Query status">
          <div className="h-72"><ResponsiveContainer><PieChart><Tooltip {...chartTooltip} /><Legend />
            <Pie data={QUERY_STATUS} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>{QUERY_STATUS.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="var(--card)" />)}</Pie>
          </PieChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Notification activity">
          <div className="h-72"><ResponsiveContainer><AreaChart data={NOTIF}>{grid}<XAxis dataKey="d" {...ax} /><YAxis {...ax} /><Tooltip {...chartTooltip} />
            <Area type="monotone" dataKey="sent" stroke="var(--chart-2)" fill="var(--primary-soft)" strokeWidth={2.5} />
          </AreaChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Sold vs rented">
          <div className="h-72"><ResponsiveContainer><BarChart data={DEALS}>{grid}<XAxis dataKey="m" {...ax} /><YAxis {...ax} /><Tooltip {...chartTooltip} /><Legend />
            <Bar dataKey="sold" stackId="a" fill="var(--chart-1)" /><Bar dataKey="rented" stackId="a" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
          </BarChart></ResponsiveContainer></div>
        </Panel>
      </div>
    </>
  );
}
