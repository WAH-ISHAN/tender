"use client";

import { DataTable, type Column } from "@/components/ds/data-table";
import { Badge } from "@/components/ds/primitives";
import { date } from "@/lib/format";

function expiryTone(v: string | null): [any, string] {
  if (!v) return ["neutral", "No expiry"];
  // Using UTC midnight parse to avoid locale-timezone differences between server and client
  const expiry = new Date(v + "T00:00:00Z").getTime();
  const now = new Date().getTime();
  const days = Math.round((expiry - now) / 86_400_000);
  if (days < 0) return ["bad", `Expired ${Math.abs(days)}d ago`];
  if (days < 60) return ["warn", `${days}d left`];
  return ["ok", `${days}d left`];
}

export function VaultTable({ rows }: { rows: any[] }) {
  const cols: Column<any>[] = [
    { key: "name", header: "Document", sortable: true, sortValue: (r) => r.name,
      cell: (r) => <span className="font-medium text-ink-900">{r.name}</span>, meta: (r) => r.kind },
    { key: "expires", header: "Expires", width: "140px", sortable: true, sortValue: (r) => r.expires_at ?? "9999",
      cell: (r) => <span className="font-mono text-[12px] text-ink-600">{r.expires_at ? date(r.expires_at) : "—"}</span> },
    { key: "state", header: "Status", width: "140px", align: "right",
      cell: (r) => { const [tone, label] = expiryTone(r.expires_at); return <span suppressHydrationWarning><Badge tone={tone}>{label}</Badge></span>; } },
  ];

  return (
    <DataTable rows={rows} columns={cols} searchKeys={(r) => `${r.name} ${r.kind}`}
      empty={{ title: "Your vault is empty", help: "Upload the registrations and certificates every bid asks for, once." }} />
  );
}
