import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Store, KeyRound, LogOut, Search, Upload, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/site/PublicShell";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "My Account — Aurelia Estates" },
      { name: "description", content: "Your buyer, seller or renter dashboard." },
      { property: "og:title", content: "My Account — Aurelia Estates" },
      { property: "og:description", content: "Manage your property journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Account,
});

type T = "buyer" | "seller" | "renter";
const OPTS: { value: T; label: string; icon: typeof Home }[] = [
  { value: "buyer", label: "Buyer", icon: Home },
  { value: "seller", label: "Seller", icon: Store },
  { value: "renter", label: "Renter", icon: KeyRound },
];

const ACTIONS: Record<T, { title: string; text: string; to: string; search?: Record<string, string>; icon: typeof Home }[]> = {
  buyer: [
    { title: "Browse homes for sale", text: "Verified properties ready to buy.", to: "/properties", search: { purpose: "Buy" }, icon: Search },
    { title: "Send your requirements", text: "Tell us budget, area and size.", to: "/contact", icon: CalendarCheck },
  ],
  seller: [
    { title: "List your property", text: "Share details — our team verifies them.", to: "/contact", icon: Upload },
    { title: "See market listings", text: "Compare prices in your area.", to: "/properties", icon: Search },
  ],
  renter: [
    { title: "Browse rentals", text: "Furnished and unfurnished options.", to: "/properties", search: { purpose: "Rent" }, icon: Search },
    { title: "Book a viewing", text: "We arrange a visit at your time.", to: "/contact", icon: CalendarCheck },
  ],
};

function Account() {
  const nav = useNavigate();
  const { user } = Route.useRouteContext();
  const [p, setP] = useState<{ full_name: string | null; account_type: T } | null>(null);

  useEffect(() => {
    supabase.from("profiles").select("full_name, account_type").eq("id", user.id).maybeSingle().then(async ({ data }) => {
      if (data) setP(data as never);
      else {
        await supabase.from("profiles").insert({ id: user.id, full_name: user.user_metadata?.full_name ?? null });
        setP({ full_name: user.user_metadata?.full_name ?? null, account_type: "buyer" });
      }
    });
  }, [user]);

  async function changeType(t: T) {
    const { error } = await supabase.from("profiles").update({ account_type: t }).eq("id", user.id);
    if (error) { toast.error(error.message); return; }
    setP((x) => (x ? { ...x, account_type: t } : x));
    toast.success(`Switched to ${t}`);
  }

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/login", replace: true });
  }

  const type = p?.account_type ?? "buyer";
  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-4 pb-24 pt-36 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">My account</p>
            <h1 className="mt-2 text-4xl font-medium">Hello, {p?.full_name || user.email}</h1>
          </div>
          <Button variant="outline" onClick={signOut}><LogOut /> Sign out</Button>
        </div>
        <div className="mt-10">
          <p className="text-sm text-muted-foreground">I am a</p>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:max-w-md">
            {OPTS.map((o) => (
              <button
                key={o.value}
                onClick={() => changeType(o.value)}
                className={cn("flex flex-col items-center gap-1 rounded-2xl border p-4 font-semibold transition",
                  type === o.value ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:border-primary/50")}
              >
                <o.icon className="h-5 w-5" /> {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ACTIONS[type].map((a) => (
            <Link key={a.title} to={a.to} search={a.search as never} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary">
              <a.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
