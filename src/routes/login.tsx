import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ArrowLeft, Home, Store, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/site/primitives";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { cn } from "@/lib/utils";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in or Create Account — Aurelia Estates" },
      { name: "description", content: "Sign in as a buyer, seller or renter to manage your property journey with Aurelia Estates." },
      { property: "og:title", content: "Sign in — Aurelia Estates" },
      { property: "og:description", content: "Buyer, seller and renter accounts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const TYPES = [
  { value: "buyer", label: "Buyer", desc: "Buy a property", icon: Home },
  { value: "seller", label: "Seller", desc: "Sell or list", icon: Store },
  { value: "renter", label: "Renter", desc: "Rent a place", icon: KeyRound },
] as const;
type AccountType = (typeof TYPES)[number]["value"];

function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [type, setType] = useState<AccountType>("buyer");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", email: "", password: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: f.email,
          password: f.password,
          options: {
            emailRedirectTo: window.location.origin + "/account",
            data: { full_name: f.name, phone: f.phone, account_type: type },
          },
        });
        if (error) throw error;
        if (data.session) nav({ to: "/account" });
        else setSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: f.email, password: f.password });
        if (error) throw error;
        toast.success("Welcome back");
        nav({ to: "/account" });
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) { toast.error(r.error.message); return; }
    if (r.redirected) return;
    nav({ to: "/account" });
  }

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full animate-ken-burns object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-12 left-12 right-12 text-ink-foreground">
          <h2 className="text-4xl font-medium">One account for buying, selling and renting.</h2>
          <p className="mt-3 text-ink-foreground/70">Save properties, track your requests and book viewings.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to website</Link>
        <Logo />
        {sent ? (
          <div className="mt-10 max-w-sm">
            <h1 className="text-3xl font-medium">Check your email</h1>
            <p className="mt-2 text-muted-foreground">We sent a confirmation link to {f.email}. Click it to activate your account.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setSent(false); setMode("signin"); }}>Back to sign in</Button>
          </div>
        ) : (
          <>
            <h1 className="mt-10 text-3xl font-medium">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
            <p className="mt-2 text-muted-foreground">{mode === "signin" ? "Sign in to your account." : "Choose how you want to use Aurelia Estates."}</p>
            <form className="mt-8 max-w-sm space-y-4" onSubmit={submit}>
              {mode === "signup" && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {TYPES.map((t) => (
                      <button
                        type="button"
                        key={t.value}
                        onClick={() => setType(t.value)}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border p-3 text-sm transition",
                          type === t.value ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:border-primary/50",
                        )}
                      >
                        <t.icon className="h-5 w-5" />
                        <span className="font-semibold">{t.label}</span>
                        <span className="text-[11px]">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                  <Input required placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="h-12 rounded-xl" />
                  <Input placeholder="Phone / WhatsApp" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="h-12 rounded-xl" />
                </>
              )}
              <Input required type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="h-12 rounded-xl" />
              <Input required minLength={6} type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} className="h-12 rounded-xl" />
              <Button size="lg" type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="animate-spin" />} {mode === "signin" ? "Sign in" : "Create account"}</Button>
              <Button size="lg" type="button" variant="outline" className="w-full" onClick={google}>Continue with Google</Button>
              <p className="text-center text-sm text-muted-foreground">
                {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
                <button type="button" className="font-semibold text-primary" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
                  {mode === "signin" ? "Create account" : "Sign in"}
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
