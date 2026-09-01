"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/components/ds/data-table";
import { Badge, OrgMark } from "@/components/ds/primitives";
import { Button } from "@/components/ds/controls";
import { ConfirmDialog, Toast } from "@/components/ds/overlay";
import { date } from "@/lib/format";

export function OrganisationsTable({ rows }: { rows: any[] }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState<null | { org: any; state: "verified" | "rejected" }>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function verify(id: number, state: string) {
    const res = await fetch(`/api/admin/admin/organisations/${id}/verify`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ state }),
    });
    router.refresh();
    setToast(res.ok ? `Marked ${state}.` : "That could not be recorded.");
  }

  const cols: Column<any>[] = [
    { key: "name", header: "Organisation", sortable: true, sortValue: (r) => r.name,
      cell: (r) => (
        <span className="flex items-center gap-2.5">
          <OrgMark name={r.name} size={30} />
          <span className="font-medium text-ink-900">{r.name}</span>
        </span>
      ),
      meta: (r) => <>{r.district ?? "—"}{r.cida_grade ? ` · CIDA ${r.cida_grade}` : ""} · joined {date(r.created_at)}</> },
    { key: "type", header: "Type", width: "100px", sortable: true, sortValue: (r) => r.type,
      cell: (r) => <Badge tone={r.type === "company" ? "brand" : r.type === "staff" ? "ok" : "neutral"}>{r.type}</Badge> },
    { key: "plan", header: "Plan", width: "110px", sortable: true, sortValue: (r) => r.plan,
      cell: (r) => <span className="text-[13px]">{r.plan}</span>,
      meta: (r) => r.sub_status },
    { key: "activity", header: "Activity", width: "150px",
      cell: (r) => <span className="font-mono text-[12px] text-ink-600">{r.tenders_published} published · {r.bids_lodged} bids</span>,
      meta: (r) => `${r.seats_used} of ${r.seats} seats` },
    { key: "verify", header: "Verification", width: "160px", align: "right",
      cell: (r) => r.verify_state === "unverified"
        ? <span className="flex justify-end gap-1.5">
            <Button size="sm" variant="secondary" onClick={() => setConfirm({ org: r, state: "rejected" })}>Reject</Button>
            <Button size="sm" onClick={() => setConfirm({ org: r, state: "verified" })}>Verify</Button>
          </span>
        : <Badge tone={r.verify_state === "verified" ? "ok" : "bad"}>{r.verify_state}</Badge> },
  ];

  return (
    <>
      <DataTable rows={rows} columns={cols} searchKeys={(r) => `${r.name} ${r.district ?? ""}`}
        filters={[
          { key: "type", label: "Type", options: ["bidder", "company", "staff"].map((t) => ({ value: t, label: t, n: rows.filter((r) => r.type === t).length })), match: (r, s) => s.includes(r.type) },
          { key: "verify", label: "Verification", options: ["unverified", "verified", "rejected"].map((t) => ({ value: t, label: t, n: rows.filter((r) => r.verify_state === t).length })), match: (r, s) => s.includes(r.verify_state) },
        ]}
        empty={{ title: "No organisations" }} />

      {confirm ? (
        <ConfirmDialog open onClose={() => setConfirm(null)}
          onConfirm={() => verify(confirm.org.id, confirm.state)}
          title={confirm.state === "verified" ? "Verify this organisation?" : "Reject this organisation?"}
          body={`${confirm.org.name} will be marked ${confirm.state}.`}
          confirmLabel={confirm.state === "verified" ? "Verify" : "Reject"}
          danger={confirm.state === "rejected"} />
      ) : null}
      {toast ? <Toast message={toast} onDone={() => setToast(null)} /> : null}
    </>
  );
}
