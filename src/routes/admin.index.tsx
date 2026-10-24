import { createFileRoute, Link } from "@tanstack/react-router";
import { UserSearch, Store, Clock, ShieldCheck, CalendarDays, BadgeDollarSign, KeyRound, PhoneCall, PhoneOff, MessagesSquare, FileSearch, CalendarPlus, CalendarClock, Bot, ArrowRight } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Panel, DashboardCard, StatusBadge, chartTooltip } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { DEALS, MEETINGS, QUERIES, VOLUME } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Aurelia Admin" }, { name: "description", content: "Dashboard for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Dashboard — Aurelia Admin" }, { property: "og:description", content: "Dashboard for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Overview,
});

const AGENT = [
  { i: PhoneCall, l: "Calls completed", v: 128 },
  { i: PhoneOff, l: "Calls pending", v: 14 },
  { i: MessagesSquare, l: "Buyer conversations", v: 86 },
  { i: Store, l: "Seller conversations", v: 31 },
  { i: FileSearch, l: "Extracted requirements", v: 97 },
  { i: CalendarPlus, l: "Meeting requests", v: 22 },
  { i: CalendarClock, l: "Reschedule requests", v: 6 },
];

function Overview() {
  return (
    <>
      <PageHeader title="Good evening, Sara" text="Here's what's happening across the brokerage today." actions={<Button asChild><Link to="/admin/properties">+ Add property</Link></Button>} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
        <DashboardCard accent label="New buyer queries" value={24} delta={18} icon={<UserSearch />} />
        <DashboardCard label="New seller queries" value={9} delta={6} icon={<Store />} />
        <DashboardCard label="Pending queries" value={38} delta={-4} icon={<Clock />} />
        <DashboardCard label="Verified properties" value={412} delta={9} icon={<ShieldCheck />} />
        <DashboardCard label="Active meetings" value={17} icon={<CalendarDays />} />
        <DashboardCard label="Sold properties" value={34} delta={12} icon={<BadgeDollarSign />} />
        <DashboardCard label="Rented properties" value={52} delta={15} icon={<KeyRound />} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Buyer vs seller volume · this week" className="xl:col-span-2">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={VOLUME}>
                <defs>
                  <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip {...chartTooltip} />
                <Area type="monotone" dataKey="buyers" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#gb)" />
                <Area type="monotone" dataKey="sellers" stroke="var(--chart-2)" strokeWidth={2.5} fill="url(#gs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="AI agent activity" action={<span className="flex items-center gap-1.5 text-xs font-semibold text-success"><span className="h-2 w-2 animate-pulse rounded-full bg-success" /> Live</span>}>
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-ink p-4 text-ink-foreground">
            <Bot className="h-8 w-8 text-primary" /><div><p className="text-sm font-semibold">Aurelia Voice Agent</p><p className="text-xs opacity-70">4 calls in progress</p></div>
          </div>
          <ul className="space-y-2.5">
            {AGENT.map((a) => (
              <li key={a.l} className="flex items-center gap-3 text-sm"><a.i className="h-4 w-4 text-primary" /><span className="flex-1 text-muted-foreground">{a.l}</span><span className="font-bold">{a.v}</span></li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Latest queries" className="xl:col-span-2" action={<Link to="/admin/buyer-queries" className="flex items-center gap-1 text-xs font-semibold text-primary">View all <ArrowRight className="h-3 w-3" /></Link>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="pb-3">Client</th><th className="pb-3">Type</th><th className="pb-3">Requirement</th><th className="pb-3">Channel</th><th className="pb-3">Status</th></tr></thead>
              <tbody>
                {QUERIES.slice(0, 6).map((q) => (
                  <tr key={q.id} className="border-t border-border">
                    <td className="py-3 font-medium">{q.name}</td>
                    <td className="py-3"><StatusBadge status={q.kind} /></td>
                    <td className="py-3 text-muted-foreground">{q.requirement}</td>
                    <td className="py-3 text-muted-foreground">{q.channel}</td>
                    <td className="py-3"><StatusBadge status={q.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Upcoming meetings">
          <ul className="space-y-3">
            {MEETINGS.slice(0, 4).map((m) => (
              <li key={m.id} className="flex gap-3 rounded-2xl border border-border p-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-center text-primary"><div><p className="text-[0.6rem] font-bold uppercase">Oct</p><p className="font-display text-lg font-semibold leading-none">{m.day}</p></div></div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{m.title}</p><p className="text-xs text-muted-foreground">{m.time} · {m.with}</p></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Sold vs rented · last 6 months" className="mt-6">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={DEALS} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="sold" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rented" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </>
  );
}
