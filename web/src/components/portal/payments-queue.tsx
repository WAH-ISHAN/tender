"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/components/ds/data-table";
import { Badge, KeyValue } from "@/components/ds/primitives";
import { Button } from "@/components/ds/controls";
import { Modal, Toast } from "@/components/ds/overlay";
import { lkr, dateTime, date } from "@/lib/format";

export function PaymentsQueue({ rows, bank }: { rows: any[]; bank: any }) {
  const router = useRouter();
  const [review, setReview] = useState<any | null>(null);
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState<{ m: string; t: "ok" | "bad" } | null>(null);
  const [busy, setBusy] = useState(false);

  async function act(id: number, what: "confirm" | "reject") {
    if (what === "reject" && !reason.trim()) {
      setToast({ m: "A rejection needs a reason — the subscriber is told it verbatim.", t: "bad" });
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/admin/admin/payments/${id}/${what}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reason }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) { setToast({ m: json.detail ?? "That could not be recorded.", t: "bad" }); return; }
    setReview(null); setReason("");
    router.refresh();
    setToast({ m: what === "confirm" ? "Confirmed. The account is active and the term has started." : "Rejected, with the reason sent.", t: "ok" });
  }

  const cols: Column<any>[] = [
    { key: "org", header: "Organisation", sortable: true, sortValue: (r) => r.org,
      cell: (r) => <span className="font-medium text-ink-900">{r.org}</span>, meta: (r) => r.email },
    { key: "amount", header: "Amount", width: "110px", align: "right", sortable: true, sortValue: (r) => Number(r.amount),
      cell: (r) => <span className="font-mono tabular">{lkr(Number(r.amount))}</span>, meta: (r) => r.term },
    { key: "slip", header: "Slip", width: "140px", cell: (r) => <span className="font-mono text-[12px]">{r.slip_ref ?? "—"}</span>,
      meta: (r) => <>{r.bank ?? "—"} · {r.paid_on ? date(r.paid_on) : "—"}</> },
    { key: "waiting", header: "Waiting", width: "110px", align: "right", sortable: true, sortValue: (r) => r.waiting_hours ?? -1,
      cell: (r) => r.waiting_hours !== null
        ? <span className={`font-mono tabular ${r.overdue ? "font-semibold text-bad-600" : "text-ink-600"}`}>{r.waiting_hours}h</span>
        : <span className="text-ink-400">—</span> },
    { key: "state", header: "State", width: "110px",
      cell: (r) => <Badge tone={r.state === "confirmed" ? "ok" : r.state === "rejected" ? "bad" : "warn"}>{r.state}</Badge> },
    { key: "act", header: "", width: "90px", align: "right",
      cell: (r) => r.state === "claimed" ? <Button size="sm" onClick={() => setReview(r)}>Review</Button> : null },
  ];

  return (
    <>
      <DataTable rows={rows} columns={cols} searchKeys={(r) => `${r.org} ${r.slip_ref ?? ""}`}
        filters={[{ key: "state", label: "State",
          options: ["claimed", "confirmed", "rejected"].map((s) => ({ value: s, label: s, n: rows.filter((r) => r.state === s).length })),
          match: (r, s) => s.includes(r.state) }]}
        empty={{ title: "The queue is empty", help: "Every claim has been reviewed." }} />

      <Modal open={!!review} onClose={() => setReview(null)} title="Review this payment" width={540}
        footer={review ? <>
          <Button variant="secondary" onClick={() => setReview(null)}>Cancel</Button>
          <Button variant="danger" disabled={busy} onClick={() => act(review.id, "reject")}>Reject</Button>
          <Button disabled={busy} onClick={() => act(review.id, "confirm")}>Confirm and activate</Button>
        </> : null}>
        {review ? (
          <div className="space-y-4">
            <KeyValue items={[
              ["Organisation", review.org],
              ["Amount claimed", <span key="a" className="font-mono">{lkr(Number(review.amount))}</span>],
              ["Term", review.term],
              ["Bank", review.bank ?? "—"],
              ["Slip reference", <span key="s" className="font-mono">{review.slip_ref ?? "—"}</span>],
              ["Date paid", review.paid_on ? date(review.paid_on) : "—"],
              ["Sent by", review.channel ?? "—"],
              ["Claimed", dateTime(review.created_at)],
            ]} />
            <div className="rounded-[8px] bg-ink-50 px-3 py-2.5 text-[12px] text-ink-600">
              Check this against the statement for <span className="font-mono font-medium">{bank.account_number}</span> at {bank.bank}, {bank.branch}.
            </div>
            <label className="block">
              <span className="mb-1 block text-[12px] font-medium text-ink-600">Reason, if rejecting — the subscriber is told this verbatim</span>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2}
                className="w-full rounded-[8px] border border-ink-300 p-2.5 text-[13px]" />
            </label>
            <p className="text-[12px] text-ink-400">
              Confirming records the review and activates the organisation in one transaction. Splitting them is how
              an account ends up active with no payment behind it.
            </p>
          </div>
        ) : null}
      </Modal>

      {toast ? <Toast message={toast.m} tone={toast.t} onDone={() => setToast(null)} /> : null}
    </>
  );
}
