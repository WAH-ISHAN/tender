import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Kpi } from "@/components/ds/controls";
import { Card, CardBody, CardHead, Meter } from "@/components/ds/primitives";

export const metadata = { title: "System health" };

export default async function Console() {
  const [health, coverage] = await Promise.all([
    authed("/api/v1/admin/reports/health"),
    authed("/api/v1/admin/reports/coverage"),
  ]);
  const d = health.body?.data ?? {};
  const cat = d.catalogue ?? {}, acc = d.accounts ?? {}, eng = d.engagement ?? {};
  const cov = coverage.body?.data ?? [];
  const max = Math.max(1, ...cov.map((c: any) => Number(c.n)));

  return (
    <>
      <PageHead title="System health" sub="Every figure on this page is a real query. A dashboard that reports constants is worse than none, because people stop checking the thing it was meant to watch." />

      <section className="mb-6">
        <h2 className="mb-2.5 text-[12px] font-semibold uppercase tracking-wide text-ink-400">Catalogue</h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Kpi label="Live" value={cat.live ?? 0} />
          <Kpi label="Archived" value={cat.archived ?? 0} />
          <Kpi label="Added today" value={cat.added_today ?? 0} />
          <Kpi label="Human verified" value={`${cat.verified_pct ?? 0}%`} tone={(cat.verified_pct ?? 0) > 90 ? "ok" : "warn"} />
          <Kpi label="Awaiting review" value={cat.awaiting_review ?? 0} tone={(cat.awaiting_review ?? 0) > 0 ? "warn" : "neutral"} />
          <Kpi label="Since last fetch" value={cat.minutes_since_fetch ?? "—"} sub="minutes" tone={(cat.minutes_since_fetch ?? 0) > 720 ? "bad" : "neutral"} />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2.5 text-[12px] font-semibold uppercase tracking-wide text-ink-400">Accounts and money</h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Kpi label="Bidders" value={acc.bidders ?? 0} />
          <Kpi label="Paying" value={acc.paying_bidders ?? 0} tone="ok" />
          <Kpi label="Conversion" value={`${acc.conversion_pct ?? 0}%`} />
          <Kpi label="Publishers" value={acc.publishers ?? 0} />
          <Kpi label="Awaiting payment" value={acc.awaiting_payment ?? 0} tone={(acc.awaiting_payment ?? 0) > 0 ? "warn" : "neutral"} sub="someone has paid and cannot use it" />
          <Kpi label="Unverified orgs" value={acc.unverified_orgs ?? 0} />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2.5 text-[12px] font-semibold uppercase tracking-wide text-ink-400">Engagement</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Active alert profiles" value={eng.active_alert_profiles ?? 0} />
          <Kpi label="Tenders in pipelines" value={eng.tenders_in_pipelines ?? 0} />
          <Kpi label="Bids lodged" value={eng.submissions ?? 0} />
          <Kpi label="Awards recorded" value={eng.awards ?? 0} />
        </div>
      </section>

      <Card>
        <CardHead title="Coverage by district" sub="Where the catalogue is thin is where the crawler goes next." />
        <CardBody className="space-y-2.5">
          {cov.slice(0, 12).map((c: any) => (
            <div key={c.district ?? "unknown"}>
              <div className="mb-1 flex justify-between text-[12px]">
                <span className="text-ink-700">{c.district ?? "Unassigned"}</span>
                <span className="font-mono text-ink-500">{c.n}</span>
              </div>
              <Meter value={Number(c.n)} max={max} />
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
