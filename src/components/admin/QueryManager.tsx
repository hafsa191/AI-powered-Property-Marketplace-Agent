import { useState } from "react";
import { Eye, Pencil, Check, X, Clock, Inbox, Phone, MessageCircle, Globe } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel, StatusBadge } from "./ui";
import { QUERIES, type Query, type QStatus } from "@/lib/admin-data";

const TABS: QStatus[] = ["Pending", "Accepted", "Rejected", "Final"];
const CH = { WhatsApp: MessageCircle, "AI Call": Phone, "Web Form": Globe };

export function QueryManager({ kind }: { kind: "Buyer" | "Seller" }) {
  const [rows, setRows] = useState<Query[]>(QUERIES.filter((q) => q.kind === kind));
  const [tab, setTab] = useState<QStatus>("Pending");
  const [view, setView] = useState<Query | null>(null);
  const [edit, setEdit] = useState<Query | null>(null);
  const [reject, setReject] = useState<Query | null>(null);

  const setStatus = (q: Query, s: QStatus) => {
    setRows((r) => r.map((x) => (x.id === q.id ? { ...x, status: s } : x)));
    toast.success(`${q.id} moved to ${s}`);
  };
  const list = rows.filter((r) => r.status === tab);

  return (
    <Panel>
      <Tabs value={tab} onValueChange={(v) => setTab(v as QStatus)}>
        <TabsList className="mb-5 h-auto flex-wrap rounded-full bg-muted p-1">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="rounded-full px-4 py-1.5 data-[state=active]:bg-card data-[state=active]:text-primary">
              {t} <span className="ml-1.5 rounded-full bg-primary-soft px-1.5 text-[0.65rem] text-primary">{rows.filter((r) => r.status === t).length}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {list.length === 0 ? (
        <div className="grid place-items-center py-16 text-center">
          <Inbox className="h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-semibold">No {tab.toLowerCase()} queries</p>
          <p className="text-sm text-muted-foreground">New {kind.toLowerCase()} queries will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3">ID</th><th className="pb-3">Client</th><th className="pb-3">Requirement</th><th className="pb-3">Budget</th><th className="pb-3">Channel</th><th className="pb-3">Status</th><th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((q) => {
                const C = CH[q.channel];
                return (
                  <tr key={q.id} className="border-t border-border transition-colors hover:bg-muted/50">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{q.id}</td>
                    <td className="py-3"><p className="font-semibold">{q.name}</p><p className="text-xs text-muted-foreground">{q.date}</p></td>
                    <td className="py-3"><p>{q.requirement}</p><p className="text-xs text-muted-foreground">{q.area}</p></td>
                    <td className="py-3 font-medium">{q.budget}</td>
                    <td className="py-3"><span className="flex items-center gap-1.5 text-muted-foreground"><C className="h-3.5 w-3.5 text-primary" />{q.channel}</span></td>
                    <td className="py-3"><StatusBadge status={q.status} /></td>
                    <td className="py-3">
                      <div className="flex justify-end gap-1">
                        <IconBtn label="View" onClick={() => setView(q)}><Eye /></IconBtn>
                        <IconBtn label="Edit" onClick={() => setEdit(q)}><Pencil /></IconBtn>
                        <IconBtn label="Accept" tone="success" onClick={() => setStatus(q, "Accepted")}><Check /></IconBtn>
                        <IconBtn label="Reject" tone="danger" onClick={() => setReject(q)}><X /></IconBtn>
                        <IconBtn label="Keep pending" onClick={() => setStatus(q, "Pending")}><Clock /></IconBtn>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!view} onOpenChange={() => setView(null)}>
        <DialogContent className="rounded-3xl">
          <DialogHeader><DialogTitle>{view?.name}</DialogTitle><DialogDescription>{view?.id} · {view?.kind} query via {view?.channel}</DialogDescription></DialogHeader>
          {view && (
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {[["Phone (internal)", view.phone], ["Requirement", view.requirement], ["Budget", view.budget], ["Area", view.area], ["Received", view.date]].map(([k, v]) => (
                <div key={k}><dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
              <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Status</dt><dd><StatusBadge status={view.status} /></dd></div>
            </dl>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setView(null)}>Close</Button>
            <Button onClick={() => { if (view) setStatus(view, "Final"); setView(null); }}>Mark as final</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!edit} onOpenChange={() => setEdit(null)}>
        <DialogContent className="rounded-3xl">
          <DialogHeader><DialogTitle>Edit query {edit?.id}</DialogTitle></DialogHeader>
          {edit && (
            <form
              id="edit-q"
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setRows((r) => r.map((x) => (x.id === edit.id ? { ...x, requirement: String(fd.get("req")), budget: String(fd.get("budget")), area: String(fd.get("area")) } : x)));
                toast.success("Query updated");
                setEdit(null);
              }}
            >
              <Input name="req" defaultValue={edit.requirement} />
              <Input name="budget" defaultValue={edit.budget} />
              <Input name="area" defaultValue={edit.area} />
            </form>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button><Button form="edit-q" type="submit">Save changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!reject} onOpenChange={() => setReject(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader><AlertDialogTitle>Reject this query?</AlertDialogTitle><AlertDialogDescription>{reject?.name}'s query will move to Rejected. You can restore it later.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => reject && setStatus(reject, "Rejected")}>Reject</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Panel>
  );
}

function IconBtn({ label, onClick, children, tone }: { label: string; onClick: () => void; children: React.ReactNode; tone?: "success" | "danger" }) {
  const c = tone === "success" ? "hover:bg-success-soft hover:text-success" : tone === "danger" ? "hover:bg-danger-soft hover:text-destructive" : "hover:bg-primary-soft hover:text-primary";
  return (
    <button title={label} aria-label={label} onClick={onClick} className={`grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors [&_svg]:h-4 [&_svg]:w-4 ${c}`}>{children}</button>
  );
}
