import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Upload, ShieldCheck, BadgeDollarSign, KeyRound, Pencil, Lock } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ADMIN_PROPERTIES, type PStatus } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/properties")({
  head: () => ({ meta: [{ title: "Properties — Aurelia Admin" }, { name: "description", content: "Properties for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Properties — Aurelia Admin" }, { property: "og:description", content: "Properties for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Props,
});

type Row = (typeof ADMIN_PROPERTIES)[number];
const STATUSES: PStatus[] = ["Available", "Verified", "Pending Review", "Sold", "Rented"];

function Props() {
  const [rows, setRows] = useState<Row[]>(ADMIN_PROPERTIES);
  const [open, setOpen] = useState<Row | "new" | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const set = (id: string, status: PStatus) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success(`${id} marked ${status}`);
  };
  const editing = open && open !== "new" ? open : null;

  return (
    <>
      <PageHeader title="Properties" text="Manage listings, verification and deal status. Seller details here are internal only." actions={<Button onClick={() => { setFiles([]); setOpen("new"); }}><Plus /> Add property</Button>} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((p) => (
          <Panel key={p.id} className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0"><p className="font-mono text-xs text-muted-foreground">{p.id} · {p.type}</p><h3 className="mt-1 truncate text-lg font-medium">{p.title}</h3></div>
              <StatusBadge status={p.status} />
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-primary">{p.price}</p>
            <div className="mt-4 space-y-1.5 rounded-2xl bg-muted p-3 text-xs">
              <p className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-muted-foreground"><Lock className="h-3 w-3" /> Internal</p>
              <p><span className="text-muted-foreground">Address:</span> {p.exact}</p>
              <p><span className="text-muted-foreground">Seller:</span> {p.seller} · {p.sellerPhone}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button size="sm" variant="soft" onClick={() => set(p.id, "Verified")}><ShieldCheck /> Verify</Button>
              <Button size="sm" variant="outline" onClick={() => { setFiles([]); setOpen(p); }}><Pencil /> Edit</Button>
              <Button size="sm" variant="outline" onClick={() => set(p.id, "Sold")}><BadgeDollarSign /> Mark sold</Button>
              <Button size="sm" variant="outline" onClick={() => set(p.id, "Rented")}><KeyRound /> Mark rented</Button>
            </div>
            <Select value={p.status} onValueChange={(v) => set(p.id, v as PStatus)}>
              <SelectTrigger className="mt-3 rounded-full"><SelectValue /></SelectTrigger>
              <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </Panel>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-xl">
          <DialogHeader><DialogTitle>{editing ? `Update ${editing.id}` : "Add new property"}</DialogTitle></DialogHeader>
          <form
            id="pform"
            className="grid gap-3 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const data = { title: String(fd.get("title")), type: String(fd.get("type")), price: String(fd.get("price")), exact: String(fd.get("exact")), seller: String(fd.get("seller")), sellerPhone: String(fd.get("phone")) };
              if (editing) setRows((r) => r.map((x) => (x.id === editing.id ? { ...x, ...data } : x)));
              else setRows((r) => [{ id: `AE-${1100 + r.length}`, status: "Pending Review", ...data }, ...r]);
              toast.success(editing ? "Property updated" : "Property added for review");
              setOpen(null);
            }}
          >
            <Input name="title" required placeholder="Title" defaultValue={editing?.title} className="sm:col-span-2" />
            <Input name="type" required placeholder="Type" defaultValue={editing?.type} />
            <Input name="price" required placeholder="Price" defaultValue={editing?.price} />
            <Input name="exact" required placeholder="Exact address (internal)" defaultValue={editing?.exact} className="sm:col-span-2" />
            <Input name="seller" required placeholder="Seller name" defaultValue={editing?.seller} />
            <Input name="phone" required placeholder="Seller phone (internal)" defaultValue={editing?.sellerPhone} />
            <Textarea placeholder="Public description" className="sm:col-span-2" />
            <label className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary sm:col-span-2">
              <Upload className="h-6 w-6 text-primary" />
              <span className="mt-2 text-sm font-semibold">Upload images</span>
              <span className="text-xs text-muted-foreground">{files.length ? files.join(", ") : "JPG or PNG, up to 10 MB each"}</span>
              <input type="file" multiple accept="image/*" className="sr-only" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} />
            </label>
          </form>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(null)}>Cancel</Button><Button type="submit" form="pform">{editing ? "Update" : "Add property"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
