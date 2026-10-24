import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({ title, text, actions }: { title: string; text?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-medium">{title}</h1>
        {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6", className)}>
      {title && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="font-sans text-base font-bold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function DashboardCard({ label, value, delta, icon, accent }: { label: string; value: string | number; delta?: number; icon: ReactNode; accent?: boolean }) {
  return (
    <div className={cn("group relative overflow-hidden rounded-3xl border p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant", accent ? "border-transparent bg-gradient-primary text-primary-foreground" : "border-border bg-card")}>
      <div className="flex items-start justify-between">
        <span className={cn("grid h-11 w-11 place-items-center rounded-2xl [&_svg]:h-5 [&_svg]:w-5", accent ? "bg-ink-foreground/20" : "bg-primary-soft text-primary")}>{icon}</span>
        {delta !== undefined && (
          <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold", accent ? "bg-ink-foreground/20" : delta >= 0 ? "bg-success-soft text-success" : "bg-danger-soft text-destructive")}>
            {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-5 font-display text-3xl font-semibold">{value}</p>
      <p className={cn("mt-1 text-sm", accent ? "opacity-80" : "text-muted-foreground")}>{label}</p>
    </div>
  );
}

const STATUS: Record<string, string> = {
  Pending: "bg-warning-soft text-warning",
  "Pending Review": "bg-warning-soft text-warning",
  Accepted: "bg-info-soft text-info",
  Available: "bg-info-soft text-info",
  Confirmed: "bg-success-soft text-success",
  Verified: "bg-success-soft text-success",
  Final: "bg-primary-soft text-primary",
  Sold: "bg-primary-soft text-primary",
  Rented: "bg-primary-soft text-primary",
  Rejected: "bg-danger-soft text-destructive",
  "Reschedule requested": "bg-danger-soft text-destructive",
  Buyer: "bg-info-soft text-info",
  Seller: "bg-success-soft text-success",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", STATUS[status] ?? "bg-muted text-muted-foreground")}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export const chartTooltip = {
  contentStyle: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    boxShadow: "var(--shadow-soft)",
    fontSize: 12,
  },
  cursor: { fill: "var(--primary-soft)" },
};
