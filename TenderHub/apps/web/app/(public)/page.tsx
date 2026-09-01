import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { lkr, countdown } from "@/lib/format";
import { Badge, Card } from "@/components/ds/primitives";
import { noticeHref } from "@/lib/urls";
import type { Notice } from "@/lib/types";

export default async function Landing() {
  const [stats, latest] = await Promise.all([
    apiFetch("/api/v1/stats/summary"),
    apiFetch<Notice[]>("/api/v1/notices?per_page=6&status=live&sort=closing_at"),
  ]);

  const s = stats.body?.data ?? {};
  const rows: Notice[] = latest.body?.data ?? [];
  const now = latest.body?.meta?.now ?? new Date().toISOString();

  return (
    <>
      <section className="border-b border-ink-200 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:py-24">
          <div className="max-w-3xl">
            <Badge tone="brand">Sri Lanka · tenders and auctions</Badge>
            <h1 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-[52px]">
              Every tender and auction on the island.<br />
              <span className="text-brand-600">Alerts on your profile, not a digest.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-600">
              The incumbent sells one flat plan and a daily e-mail everybody receives. TenderHub aggregates,
              deduplicates and categorises every notice, and fires alerts on a saved profile you build and test
              before you trust it. Buying organisations run the whole procurement here — draft, publish, sell
              documents, receive sealed bids, open under dual control, evaluate and award.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tenders" className="rounded-[8px] bg-brand-600 px-5 py-3 text-[14px] font-medium text-white hover:bg-brand-700">
                Browse every notice
              </Link>
              <Link href="/company/signup" className="rounded-[8px] bg-white px-5 py-3 text-[14px] font-medium text-ink-800 ring-1 ring-inset ring-ink-300 hover:bg-ink-50">
                Publish a tender — free
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["Live now", s.live ?? 0],
                ["In the archive", s.archived ?? 0],
                ["Live auctions", s.auctions ?? 0],
                ["Buying authorities", s.authorities ?? 0],
              ].map(([l, v]) => (
                <div key={l as string}>
                  <dd className="font-mono text-[30px] font-semibold leading-none text-ink-900 tabular">{v as number}</dd>
                  <dt className="mt-1.5 text-[12px] uppercase tracking-wide text-ink-500">{l as string}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight text-ink-900">Closing soonest</h2>
            <p className="mt-1 text-[13px] text-ink-500">
              Countdowns are computed from server time, never your browser clock.
            </p>
          </div>
          <Link href="/tenders" className="text-[13px] font-medium text-brand-600 hover:underline">All notices →</Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((n) => (
            <Link key={n.id} href={noticeHref(n.kind, n.slug) as any}>
              <Card className="h-full transition-shadow hover:shadow-[var(--shadow-raise)]">
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-ink-400">{n.reference}</span>
                    <Badge tone={n.status === "closing_soon" ? "warn" : "ok"}>
                      {countdown(n.closing_at, now)}
                    </Badge>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-[14px] font-medium leading-snug text-ink-900">{n.title}</h3>
                  <p className="mt-2.5 text-[12px] text-ink-500">
                    {n.district ?? "—"} · {n.category ?? "—"}
                  </p>
                  <p className="mt-1 font-mono text-[13px] font-medium text-ink-800">{lkr(n.estimated_value, true)}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-ink-200 bg-ink-50">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <Badge tone="brand">Demand side</Badge>
            <h2 className="mt-3 text-[26px] font-semibold tracking-tight text-ink-900">For bidders</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600">
              Five notice views free, then Rs. 24,000 a year — or Rs. 7,500 a quarter, because a contractor&rsquo;s
              cash flow is seasonal. That is well under the incumbent&rsquo;s flat Rs. 40,000.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Alert profiles matched on slugs, previewed against 30 days of real history before you save them",
                "Mirrored documents — agency sites take files down mid-tender; once the bytes are here they stay here",
                "Signed download links, bound to you, expiring in five minutes",
                "A bid pipeline, a compliance vault, and electronic submission with a timestamped receipt",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-600">
                  <span className="mt-0.5 text-brand-600">✓</span>{t}
                </li>
              ))}
            </ul>
            <Link href="/bidder/signup" className="mt-6 inline-block rounded-[8px] bg-brand-600 px-4 py-2.5 text-[13px] font-medium text-white hover:bg-brand-700">
              Create a free account
            </Link>
          </div>

          <div>
            <Badge tone="ok">Supply side</Badge>
            <h2 className="mt-3 text-[26px] font-semibold tracking-tight text-ink-900">For buying organisations</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600">
              Free, and staying free until supply is dense. A paywall on publishing kills the only asset that
              compounds.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Draft, approve and publish — with self-approval refused above your threshold, by the API and not the interface",
                "Sell documents, answer clarifications anonymously, issue numbered addenda that move the date",
                "Sealed bids no route through the platform can read early, opened under dual control by two officers",
                "Committee evaluation behind a conflict-of-interest gate, award with a server-computed standstill, and an evidence pack",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-600">
                  <span className="mt-0.5 text-ok-600">✓</span>{t}
                </li>
              ))}
            </ul>
            <Link href="/company/signup" className="mt-6 inline-block rounded-[8px] bg-ink-900 px-4 py-2.5 text-[13px] font-medium text-white hover:bg-ink-800">
              Open a workspace
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
