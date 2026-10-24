import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Home, MapPin, Wallet } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AREAS, TYPES } from "@/lib/data";
import { cn } from "@/lib/utils";

const BUDGETS = [
  { v: "any", l: "Any budget" },
  { v: "0-500000", l: "Up to 5 Lac" },
  { v: "0-50000000", l: "Up to 5 Cr" },
  { v: "50000000-100000000", l: "5 – 10 Cr" },
  { v: "100000000-999999999", l: "10 Cr +" },
];

export function SearchBar({ className }: { className?: string }) {
  const nav = useNavigate();
  const [purpose, setPurpose] = useState<"Buy" | "Rent">("Buy");
  const [type, setType] = useState("any");
  const [area, setArea] = useState("any");
  const [budget, setBudget] = useState("any");

  const submit = () =>
    nav({
      to: "/properties",
      search: { purpose, type: type === "any" ? undefined : type, area: area === "any" ? undefined : area, budget: budget === "any" ? undefined : budget },
    });

  return (
    <div className={cn("hero-search rounded-xl bg-search-surface p-2 text-ink-foreground shadow-card", className)}>
      <div className="flex gap-1 p-1">
        {(["Buy", "Rent"] as const).map((p) => (
          <Button
            key={p}
            onClick={() => setPurpose(p)}
            className={cn(
              "h-9 rounded-lg px-5 text-sm font-semibold",
              purpose === p ? "bg-primary text-primary-foreground shadow-soft" : "bg-transparent text-ink-foreground/80 hover:bg-ink-foreground/10 hover:text-ink-foreground",
            )}
          >
            {p}
          </Button>
        ))}
      </div>
      <div className="grid gap-2 rounded-lg bg-search-field p-2 md:grid-cols-[1fr_1fr_1fr_auto]">
        <Field icon={<Home />} label="Property type">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-auto border-0 p-0 shadow-none focus:ring-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">All types</SelectItem>
              {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field icon={<MapPin />} label="Location">
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger className="h-auto border-0 p-0 shadow-none focus:ring-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Anywhere</SelectItem>
              {["Karachi", "Lahore", "Islamabad"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              {AREAS.map((a) => <SelectItem key={a} value={a.split(",")[0]}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field icon={<Wallet />} label="Budget">
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="h-auto border-0 p-0 shadow-none focus:ring-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              {BUDGETS.map((b) => <SelectItem key={b.v} value={b.v}>{b.l}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Button size="lg" className="h-full min-h-14 rounded-lg" onClick={submit}>
          <Search /> Search
        </Button>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="search-field flex items-center gap-3 rounded-lg px-3 py-2 transition-colors md:border-r md:last-of-type:border-0">
      <span className="search-field-icon grid h-10 w-10 shrink-0 place-items-center rounded-lg [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      <div className="min-w-0 flex-1 text-left">
        <p className="search-label text-[0.68rem] font-bold uppercase tracking-widest">{label}</p>
        <div className="text-sm font-semibold text-ink-foreground">{children}</div>
      </div>
    </div>
  );
}
