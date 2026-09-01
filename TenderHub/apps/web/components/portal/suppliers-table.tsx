"use client";

import { DataTable, type Column } from "@/components/ds/data-table";
import { Badge, OrgMark } from "@/components/ds/primitives";

export function SuppliersTable({ rows }: { rows: any[] }) {
  const grades = [...new Set(rows.map((r) => r.cida_grade).filter(Boolean))];
  const districts = [...new Set(rows.map((r) => r.district).filter(Boolean))];

  const cols: Column<any>[] = [
    { key: "name", header: "Supplier", sortable: true, sortValue: (r) => r.name,
      cell: (r) => (
        <span className="flex items-center gap-2.5">
          <OrgMark name={r.name} size={30} />
          <span className="font-medium text-ink-900">{r.name}</span>
        </span>
      ),
      meta: (r) => r.district ?? "—" },
    { key: "grade", header: "CIDA", width: "90px", sortable: true, sortValue: (r) => r.cida_grade ?? "",
      cell: (r) => r.cida_grade ? <Badge>{r.cida_grade}</Badge> : <span className="text-ink-400">—</span> },
    { key: "rating", header: "Rating", width: "220px", align: "right", sortable: true, sortValue: (r) => r.rating ?? -1,
      cell: (r) => r.rating !== null
        ? <span className="font-mono font-medium tabular">{r.rating.toFixed(2)} <span className="text-ink-400">({r.ratings_count})</span></span>
        /* Below five ratings NO average is published, and we say why rather
           than showing the number. A mean of two is noise dressed as a score. */
        : <span className="text-[12px] text-ink-400">{r.rating_note}</span> },
  ];

  return (
    <DataTable rows={rows} columns={cols} searchKeys={(r) => `${r.name} ${r.district ?? ""}`}
      filters={[
        { key: "grade", label: "CIDA grade", options: grades.map((g) => ({ value: g, label: g, n: rows.filter((r) => r.cida_grade === g).length })), match: (r, s) => s.includes(r.cida_grade) },
        { key: "district", label: "District", options: districts.map((d) => ({ value: d, label: d, n: rows.filter((r) => r.district === d).length })), match: (r, s) => s.includes(r.district) },
      ]}
      empty={{ title: "No suppliers yet" }} />
  );
}
