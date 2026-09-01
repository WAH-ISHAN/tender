"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable, type Column } from "@/components/ds/data-table";
import { Badge } from "@/components/ds/primitives";
import { Button } from "@/components/ds/controls";
import { Modal, Toast } from "@/components/ds/overlay";
import { lkr, dateTime } from "@/lib/format";

const TONE = (i: number) => (i === 0 ? "neutral" : i === 1 ? "warn" : i >= 6 ? "ok" : "brand") as any;

export function WorkspaceTenders({ rows, stages }: { rows: any[]; stages: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as any;
    const fix = (v: string) => (v ? v.replace("T", " ") + ":00" : undefined);
    const res = await fetch("/api/workspace/authority/tenders", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, closing_at: fix(f.closing_at), opening_at: fix(f.opening_at) }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) { setErr(json.detail ?? "That could not be created."); return; }
    setOpen(false); router.refresh(); setToast("Draft created. It is not on the public site until it is approved and then published.");
  }

  const cols: Column<any>[] = [
    { key: "title", header: "Tender", sortable: true, sortValue: (r) => r.title,
      cell: (r) => <a href={`/workspace/tenders/${r.id}`} className="font-medium text-ink-900 hover:text-brand-700">{r.title}</a>,
      meta: (r) => <>{r.reference} · {r.district ?? "—"} · {r.category ?? "—"}</> },
    { key: "stage", header: "Stage", width: "120px", sortable: true, sortValue: (r) => r.stage_idx,
      cell: (r) => <Badge tone={TONE(r.stage_idx)}>{r.stage}</Badge> },
    { key: "subs", header: "Bids", width: "90px", align: "right", sortable: true, sortValue: (r) => r.submissions,
      cell: (r) => <span className="font-mono tabular">{r.stage_idx >= 4 ? r.submissions : r.submissions ? `${r.submissions} sealed` : "—"}</span> },
    { key: "purch", header: "Purchasers", width: "100px", align: "right", sortable: true, sortValue: (r) => r.purchasers,
      cell: (r) => <span className="font-mono tabular">{r.purchasers}</span> },
    { key: "value", header: "Value", width: "120px", align: "right", sortable: true, sortValue: (r) => r.estimated_value ?? 0,
      cell: (r) => <span className="font-mono tabular">{lkr(r.estimated_value, true)}</span> },
    { key: "closing", header: "Closes", width: "150px", align: "right", sortable: true, sortValue: (r) => r.closing_at ?? "",
      cell: (r) => <span className="font-mono text-[12px] text-ink-500">{dateTime(r.closing_at)}</span> },
  ];

  return (
    <>
      <div className="flex justify-end border-b border-ink-200 px-[var(--card-p)] py-3">
        <Button onClick={() => setOpen(true)}>New tender</Button>
      </div>

      <DataTable rows={rows} columns={cols} searchKeys={(r) => `${r.title} ${r.reference}`}
        filters={[{ key: "stage", label: "Stage",
          options: stages.map((s, i) => ({ value: String(i), label: s, n: rows.filter((r) => r.stage_idx === i).length })),
          match: (r, sel) => sel.includes(String(r.stage_idx)) }]}
        empty={{ title: "No tenders yet", help: "Create a draft. Nothing reaches the public site until it is approved and then deliberately published." }} />

      <Modal open={open} onClose={() => setOpen(false)} title="New tender" width={640}
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                 <Button form="nt" type="submit" disabled={busy}>{busy ? "Creating…" : "Create draft"}</Button></>}>
        <form id="nt" onSubmit={create} className="space-y-3.5">
          <F name="title" label="Title" required />
          <div className="grid gap-3 sm:grid-cols-2">
            <F name="reference" label="Reference" placeholder="RDA/CP/2026/001" required />
            <F name="estimated_value" label="Estimated value (Rs.)" type="number" />
          </div>
          <label className="block">
            <span className="mb-1 block text-[12px] font-medium text-ink-600">Summary</span>
            <textarea name="summary" rows={3} className="w-full rounded-[8px] border border-ink-300 p-2.5 text-[13px]" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <F name="closing_at" label="Closing" type="datetime-local" required />
            <F name="opening_at" label="Bid opening" type="datetime-local" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <F name="document_fee" label="Document fee (Rs.)" type="number" />
            <F name="bid_security" label="Bid security (Rs.)" type="number" />
          </div>
          <p className="rounded-[8px] bg-ink-50 px-3 py-2 text-[12px] text-ink-500">
            Opening cannot precede closing, and closing cannot be in the past. Both are refused by the API — a
            data-entry slip there has the same effect as a leak.
          </p>
          {err ? <p className="rounded-[8px] bg-bad-50 px-3 py-2 text-[13px] text-bad-600">{err}</p> : null}
        </form>
      </Modal>

      {toast ? <Toast message={toast} onDone={() => setToast(null)} /> : null}
    </>
  );
}

function F({ name, label, ...rest }: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-ink-600">{label}</span>
      <input name={name} {...rest} className="h-[38px] w-full rounded-[8px] border border-ink-300 px-2.5 text-[13px] outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
    </label>
  );
}
