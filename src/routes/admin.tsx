import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard, UserSearch, Store, Building2, GitCompareArrows, CalendarDays, Bell, BarChart3, Star, History, Settings, Search, Menu, LogOut, ExternalLink,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/primitives";
import { ThemeSelector } from "@/components/site/ThemeSelector";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Aurelia Estates" }, { name: "description", content: "Admin Dashboard for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Admin Dashboard — Aurelia Estates" }, { property: "og:description", content: "Admin Dashboard for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/buyer-queries", label: "Buyer Queries", icon: UserSearch, badge: 12 },
  { to: "/admin/seller-queries", label: "Seller Queries", icon: Store, badge: 5 },
  { to: "/admin/properties", label: "Properties", icon: Building2 },
  { to: "/admin/matching", label: "Matching", icon: GitCompareArrows },
  { to: "/admin/meetings", label: "Meetings", icon: CalendarDays },
  { to: "/admin/notifications", label: "Notifications", icon: Bell, badge: 6 },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/history", label: "History", icon: History },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function SidebarNav() {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-6 py-6"><Link to="/"><Logo invert /></Link></div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: "exact" in n }}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/65 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground"
            activeProps={{ className: "!bg-sidebar-primary !text-sidebar-primary-foreground shadow-elegant" }}
          >
            <n.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{n.label}</span>
            {"badge" in n && <span className="rounded-full bg-sidebar-foreground/15 px-2 py-0.5 text-[0.65rem] font-bold">{n.badge}</span>}
          </Link>
        ))}
      </nav>
      <div className="m-3 rounded-2xl border border-sidebar-border bg-sidebar-accent p-4">
        <p className="text-sm font-semibold">AI Agent online</p>
        <p className="mt-1 text-xs text-sidebar-foreground/60">Handling 4 live conversations</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sidebar-foreground/10"><div className="h-full w-2/3 rounded-full bg-sidebar-primary" /></div>
      </div>
      <Link to="/" className="mx-3 mb-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground"><LogOut className="h-4 w-4" /> Sign out</Link>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="min-h-screen bg-muted/50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block"><SidebarNav /></aside>
      <div className="lg:pl-64">
        <header className="glass sticky top-0 z-30 flex h-16 items-center gap-3 px-4 sm:px-8">
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden" aria-label="Menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="left" className="w-64 border-0 p-0"><SheetTitle className="sr-only">Navigation</SheetTitle><SidebarNav /></SheetContent>
          </Sheet>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search queries, properties, clients…" className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-primary" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex"><Link to="/"><ExternalLink /> View site</Link></Button>
            <ThemeSelector full />
            <Link to="/admin/notifications" className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Link>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">SA</span>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] animate-fade-up p-4 sm:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
