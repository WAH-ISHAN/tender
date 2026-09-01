import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card, CardBody, EmptyState, Badge } from "@/components/ds/primitives";
import { lkr, dateTime, titleCase } from "@/lib/format";

export const metadata = { title: "Auctions" };

export default async function WorkspaceAuctions() {
  const res = await authed("/api/v1/authority/auctions");
  const rows = res.body?.data ?? [];
  const meta = res.body?.meta ?? {};

  return (
    <>
      <PageHead title="Auction lots" sub="Asset class, reserve and the deposit computed from it — never stored twice, so the figure on the notice and the figure a bidder is asked for cannot disagree." />
      <Card>
        {rows.length ? (
          <ul>
            {rows.map((l: any) => (
              <li key={l.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 px-[var(--card-p)] py-3.5 last:border-0">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge tone="brand">{titleCase(l.asset_class)}</Badge>
                    <Badge>{titleCase(l.method)}</Badge>
                    {l.result ? <Badge tone={l.result === "sold" ? "ok" : "neutral"}>{titleCase(l.result)}</Badge> : null}
                  </div>
                  <p className="mt-1.5 text-[13px] font-medium text-ink-900">{l.title}</p>
                  <p className="row-meta font-mono text-[11px] text-ink-400">{l.reference} · lot {l.lot_no} · {l.venue ?? "—"}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[14px] font-medium text-ink-900">{lkr(Number(l.reserve), true)}</p>
                  <p className="font-mono text-[11px] text-ink-400">
                    deposit {l.deposit_pct}% = {lkr(Number(l.reserve) * Number(l.deposit_pct) / 100, true)}
                  </p>
                  <p className="row-meta mt-0.5 font-mono text-[11px] text-ink-400">{dateTime(l.closing_at)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : <EmptyState title="No auction lots" help="Create a lot with an asset class, reserve and deposit percentage." />}
        <CardBody className="border-t border-ink-200">
          <p className="rounded-[8px] bg-warn-50 px-3 py-2 text-[12px] leading-relaxed text-warn-600 ring-1 ring-inset ring-amber-200">
            {meta.custody}
          </p>
        </CardBody>
      </Card>
    </>
  );
}
