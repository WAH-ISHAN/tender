"use client";

import { DataTable, type Column } from "@/components/ds/data-table";
import { Badge, Meter } from "@/components/ds/primitives";
import { lkr, dateTime } from "@/lib/format";

const TONE: Record<string, any> = { watching: "neutral", preparing: "brand", ready: "ok", submitted: "ok", won: "ok", lost: "bad" };

export function PipelineTable({ rows, stages }: { rows: any[]; stages: string[] }) {
  const cols: Column<any>[] = [
    {
      key: "title", header: "Tender", sortable: true, sortValue: (r) => r.notice.title,
      cell: (r) => <span className="font-medium text-ink-900">{r.notice.title}</span>,
      meta: (r) => <>{r.notice.reference} · {r.notice.district ?? "—"}</>,
    },
    { key: "stage", header: "Stage", width: "120px", sortable: true, sortValue: (r) => r.stage,
      cell: (r) => <Badge tone={TONE[r.stage] ?? "neutral"}>{r.stage}</Badge> },
    {
      key: "checklist", header: "Checklist", width: "130px",
      cell: (r) => (
        <div>
          <p className="font-mono text-[12px] text-ink-600">{r.checklist.ready}/{r.checklist.total}</p>
          <Meter value={r.checklist.ready} max={r.checklist.total} tone={r.can_submit ? "ok" : "warn"} />
        </div>
      ),
    },
    { key: "value", header: "Value", width: "120px", align: "right", sortable: true,
      sortValue: (r) => r.notice.estimated_value ?? 0,
      cell: (r) => <span className="font-mono tabular">{lkr(r.notice.estimated_value, true)}</span> },
    { key: "closing", header: "Closes", width: "150px", align: "right", sortable: true,
      sortValue: (r) => r.notice.closing_at ?? "",
      cell: (r) => <span className="font-mono text-[12px] text-ink-500">{dateTime(r.notice.closing_at)}</span> },
  ];

  return (
    <DataTable
      rows={rows}
      columns={cols}
      searchKeys={(r) => `${r.notice.title} ${r.notice.reference}`}
      filters={[{
        key: "stage", label: "Stage",
        options: stages.map((s) => ({ value: s, label: s, n: rows.filter((r) => r.stage === s).length })),
        match: (r, sel) => sel.includes(r.stage),
      }]}
      empty={{ title: "Nothing in your pipeline", help: "Add a tender from its detail page to start tracking it." }}
    />
  );
}
