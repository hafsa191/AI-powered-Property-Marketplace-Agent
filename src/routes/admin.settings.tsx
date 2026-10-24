import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { THEMES, useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Aurelia Admin" }, { name: "description", content: "Settings for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Settings — Aurelia Admin" }, { property: "og:description", content: "Settings for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Settings,
});

function Settings() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <PageHeader title="Settings" text="Branding, company details and automation preferences." />
      <Panel title="Brand theme" className="mb-6">
        <p className="mb-5 text-sm text-muted-foreground">Applies instantly across the public website and this dashboard.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((t) => (
            <button key={t.id} onClick={() => { setTheme(t.id); toast.success(`${t.name} theme applied`); }} className={cn("group overflow-hidden rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5", theme === t.id ? "border-primary shadow-elegant" : "border-border")}>
              <div className="flex h-20">
                <div className="flex flex-1 items-end p-3" style={{ background: t.ink }}><span className="h-2 w-12 rounded-full" style={{ background: t.swatch }} /></div>
                <div className="w-1/3" style={{ background: t.swatch }} />
              </div>
              <div className="flex items-center justify-between p-3"><span className="font-semibold">{t.name}</span>{theme === t.id && <Check className="h-4 w-4 text-primary" />}</div>
            </button>
          ))}
        </div>
      </Panel>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Company details">
          <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); toast.success("Company details saved"); }}>
            <Input defaultValue="Aurelia Estates" />
            <Input defaultValue="hello@aurelia.estate" />
            <Input defaultValue="+92 21 111 287 354" />
            <Input defaultValue="Office 1204, Ocean Tower, Clifton, Karachi" />
            <Button type="submit" className="justify-self-start">Save</Button>
          </form>
        </Panel>
        <Panel title="AI & privacy">
          {[["AI voice agent answers calls", true], ["Auto-match new listings to buyers", true], ["Require admin approval before sharing matches", true], ["Hide exact addresses on public site", true], ["Send WhatsApp meeting reminders", false]].map(([l, on]) => (
            <label key={l as string} className="flex items-center justify-between gap-4 border-b border-border py-3.5 text-sm last:border-0">{l as string}<Switch defaultChecked={on as boolean} /></label>
          ))}
        </Panel>
      </div>
    </>
  );
}
