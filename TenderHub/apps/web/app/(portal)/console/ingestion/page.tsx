import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card, CardBody, CardHead, Badge, EmptyState } from "@/components/ds/primitives";
import { dateTime } from "@/lib/format";

export const metadata = { title: "Ingestion" };

const TONE: Record<string, any> = { healthy: "ok", below_baseline: "warn", failing: "bad", paused: "neutral" };
const LABEL: Record<string, string> = { healthy: "Healthy", below_baseline: "Below its own baseline", failing: "Failing", paused: "Paused" };

export default async function Ingestion() {
  const [sources, queue] = await Promise.all([
    authed("/api/v1/admin/ingest/sources"),
    authed("/api/v1/admin/notices"),
  ]);
  const rows = sources.body?.data ?? [];
  const pending = queue.body?.data ?? [];

  return (
    <>
      <PageHead title="Ingestion" sub="Healthy means producing what THIS source normally produces, against its own four-week weekly average. A broken source looks exactly like a quiet week unless its own baseline is watched." />

      <Card className="mb-4">
        <CardHead title="Sources" sub={`${rows.length} configured`} />
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50 text-[11px] uppercase tracking-wide text-ink-500">
              <th className="px-[var(--card-p)] py-2 font-semibold">Source</th>
              <th className="px-3 py-2 font-semibold">Mode</th>
              <th className="px-3 py-2 text-right font-semibold">Baseline / wk</th>
              <th className="px-3 py-2 text-right font-semibold">This week</th>
              <th className="px-3 py-2 text-right font-semibold">Verified</th>
              <th className="px-3 py-2 text-right font-semibold">Last fetch</th>
              <th className="px-[var(--card-p)] py-2 text-right font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s: any) => (
              <tr key={s.id} className="border-b border-ink-100 last:border-0" style={{ height: "var(--row-h)" }}>
                <td className="px-[var(--card-p)] text-[13px] font-medium text-ink-900">{s.name}</td>
                <td className="px-3"><Badge>{s.mode}</Badge></td>
                <td className="px-3 text-right font-mono text-[12px] text-ink-500 tabular">{s.baseline}</td>
                <td className="px-3 text-right font-mono text-[13px] tabular">{s.this_week}</td>
                <td className="px-3 text-right font-mono text-[12px] text-ink-500 tabular">{s.verified_pct}%</td>
                <td className="px-3 text-right font-mono text-[12px] text-ink-500">{dateTime(s.last_fetch_at)}</td>
                <td className="px-[var(--card-p)] text-right"><Badge tone={TONE[s.status]}>{LABEL[s.status] ?? s.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        <CardBody className="border-t border-ink-200 text-[12px] leading-relaxed text-ink-400">
          The crawl worker is not built. The run endpoint returns 501 with its reason rather than pretending to
          queue something — the button appears the day the worker lands. Sourcing is by agreement first, RTI Act
          No. 12 of 2016 second, and polite scraping last: one request at a time, a user agent that identifies us,
          a timeout and a size cap. A crawler that hammers a ministry site gets the whole platform blocked.
        </CardBody>
      </Card>

      <Card>
        <CardHead title="Moderation queue" sub="Anything the parser was unsure of waits here, flagged with what is missing so a reviewer reads the gaps before the prose." />
        {pending.length ? (
          <ul>
            {pending.map((n: any) => (
              <li key={n.id} className="border-b border-ink-100 px-[var(--card-p)] py-3 last:border-0">
                <p className="text-[13px] font-medium text-ink-900">{n.title}</p>
                <p className="row-meta mt-0.5 font-mono text-[11px] text-ink-400">{n.reference} · {n.source ?? "unknown source"}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {(n.missing ?? []).map((m: string) => <Badge key={m} tone="warn">missing {m}</Badge>)}
                </div>
              </li>
            ))}
          </ul>
        ) : <EmptyState title="Nothing awaiting review" />}
        <CardBody className="border-t border-ink-200 text-[12px] text-ink-400">
          Publication is refused outright without a closing date. A wrong deadline published as fact is the one
          error that loses a customer permanently. Duplicates are merged, never deleted, so a URL already indexed
          keeps resolving and says where it went.
        </CardBody>
      </Card>
    </>
  );
}
