import { apiFetch } from "@/lib/api";
import { lkr, date } from "@/lib/format";
import { Card, CardHead, EmptyState } from "@/components/ds/primitives";

export const metadata = { title: "Award history" };

export default async function Awards() {
  const res = await apiFetch("/api/v1/awards?per_page=50");
  const rows = res.body?.data ?? [];

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10">
      <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">Award history</h1>
      <p className="mt-1 mb-6 max-w-2xl text-[13px] text-ink-500">
        Awards appear here only once the standstill period has expired. Publishing one during the challenge window
        would prejudice an appeal that is still live.
      </p>

      <Card>
        <CardHead title="Published awards" sub={`${rows.length} contracts past standstill`} />
        {rows.length ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50 text-[11px] uppercase tracking-wide text-ink-500">
                <th className="px-5 py-2 font-semibold">Contract</th>
                <th className="px-3 py-2 font-semibold">Buyer</th>
                <th className="px-3 py-2 font-semibold">Supplier</th>
                <th className="px-3 py-2 text-right font-semibold">Amount</th>
                <th className="px-5 py-2 text-right font-semibold">Awarded</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a: any) => (
                <tr key={a.id} className="border-b border-ink-100 last:border-0" style={{ height: "var(--row-h)" }}>
                  <td className="px-5 py-[var(--row-py)]">
                    <p className="text-[13px] font-medium text-ink-900">{a.title}</p>
                    <p className="row-meta font-mono text-[11px] text-ink-400">{a.reference} · {a.district}</p>
                  </td>
                  <td className="px-3 text-[13px] text-ink-600">{a.buyer}</td>
                  <td className="px-3 text-[13px] text-ink-800">{a.supplier}</td>
                  <td className="px-3 text-right font-mono text-[13px] tabular">{lkr(a.amount)}</td>
                  <td className="px-5 text-right font-mono text-[12px] text-ink-500">{date(a.awarded_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState title="No awards published yet" help="Awards appear once their standstill period has run out." />
        )}
      </Card>
    </div>
  );
}
