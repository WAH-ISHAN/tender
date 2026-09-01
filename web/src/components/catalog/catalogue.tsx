import Link from "next/link";
import { apiFetch, token } from "@/lib/api";
import { lkr, countdown, dateTime } from "@/lib/format";
import { Badge, Card, EmptyState } from "@/components/ds/primitives";
import { noticeHref, asArray, buildQuery, toggle } from "@/lib/urls";
import type { Facets, Notice } from "@/lib/types";

type SP = Record<string, string | string[] | undefined>;

/**
 * ONE component serves /tenders and /auctions, with the kind fixed by the route.
 * Facets, counts and results are constrained identically — a filter that leads
 * to an empty page is worse than no filter.
 */
export async function Catalogue({ kind, sp }: { kind: "tender" | "auction"; sp: SP }) {
  const cats = asArray(sp.category);
  const dists = asArray(sp.district);
  const bands = asArray(sp.value_band);
  const sectors = asArray(sp.sector);
  const q = (sp.q as string) ?? "";
  const status = (sp.status as string) ?? "all";
  const sort = (sp.sort as string) ?? "closing_at";
  const page = (sp.page as string) ?? "1";

  const query = buildQuery({ q, status, sort, page, category: cats, district: dists, value_band: bands, sector: sectors });
  const path = kind === "auction" ? "/api/v1/auctions" : "/api/v1/notices";

  // The token is sent only after the server has independently decided the
  // viewer is entitled. A cookie alone never persuades the API to release a
  // paid payload — but a paying subscriber must not be served the guest view
  // of their own subscription either, which is exactly the bug this fixes.
  const res = await apiFetch<Notice[]>(`${path}${query}`, { token: await token() });

  if (!res.ok && res.status === 502) {
    return (
      <Card><EmptyState title="The catalogue is unavailable" help={res.body?.detail ?? "The API is not reachable."} /></Card>
    );
  }

  const rows: Notice[] = res.body?.data ?? [];
  const meta = res.body?.meta ?? {};
  const facets: Facets = meta.facets ?? { category: [], district: [], sector: [], value_band: [] };
  const counts = meta.status_counts ?? {};
  const now = meta.now ?? new Date().toISOString();
  const base = kind === "auction" ? "/auctions" : "/tenders";

  const href = (patch: Record<string, any>) =>
    (base + buildQuery({ q, status, sort, page: "1", category: cats, district: dists, value_band: bands, sector: sectors, ...patch })) as any;

  const FacetGroup = ({ title, param, values, selected }: { title: string; param: string; values: { slug: string; label: string; n: number }[]; selected: string[] }) => {
    if (!values.length) return null;
    return (
      <div className="border-b border-ink-200 px-4 py-3.5 last:border-0">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">{title}</p>
        <ul className="space-y-1">
          {values.slice(0, 9).map((v) => {
            const on = selected.includes(v.slug);
            return (
              <li key={v.slug}>
                <Link href={href({ [param]: toggle(selected, v.slug) })}
                      className={`flex items-center justify-between gap-2 rounded-[6px] px-2 py-1 text-[13px] ${on ? "bg-brand-50 font-medium text-brand-700" : "text-ink-600 hover:bg-ink-100"}`}>
                  <span className="truncate">{v.label}</span>
                  <span className="font-mono text-[11px] text-ink-400">{v.n}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <Card>
          <form action={base} className="border-b border-ink-200 p-4">
            <input name="q" defaultValue={q} placeholder="Search title or reference"
              className="h-[var(--ctl-h)] w-full rounded-[8px] border border-ink-300 px-2.5 text-[13px] outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
            {status !== "all" ? <input type="hidden" name="status" value={status} /> : null}
          </form>
          <FacetGroup title="Category" param="category" values={facets.category} selected={cats} />
          <FacetGroup title="District" param="district" values={facets.district} selected={dists} />
          <FacetGroup title="Value" param="value_band" values={facets.value_band} selected={bands} />
          <FacetGroup title="Sector" param="sector" values={facets.sector} selected={sectors} />
        </Card>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {[["all", "All"], ["live", "Live"], ["closing_soon", "Closing in 7 days"], ["closed", "Closed"]].map(([k, l]) => (
            <Link key={k} href={href({ status: k })}
              className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${status === k ? "bg-ink-900 text-white" : "bg-white text-ink-600 ring-1 ring-inset ring-ink-300 hover:bg-ink-50"}`}>
              {l} <span className="font-mono text-[11px] opacity-70">{counts[k] ?? 0}</span>
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-1.5 text-[12px] text-ink-500">
            Sort
            {[["closing_at", "Closing"], ["newest", "Newest"], ["value", "Value"]].map(([k, l]) => (
              <Link key={k} href={href({ sort: k })} className={`rounded-[6px] px-2 py-1 ${sort === k ? "bg-ink-100 font-medium text-ink-900" : "hover:bg-ink-100"}`}>{l}</Link>
            ))}
          </div>
        </div>

        {(cats.length || dists.length || bands.length || sectors.length) ? (
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            {[...cats.map((v) => ["category", v] as const), ...dists.map((v) => ["district", v] as const),
              ...bands.map((v) => ["value_band", v] as const), ...sectors.map((v) => ["sector", v] as const)].map(([p, v]) => {
              const label =
                (facets as any)[p === "value_band" ? "value_band" : p]?.find((x: any) => x.slug === v)?.label ?? v;
              const sel = p === "category" ? cats : p === "district" ? dists : p === "value_band" ? bands : sectors;
              return (
                <Link key={p + v} href={href({ [p]: toggle(sel, v) })}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[12px] text-ink-700 ring-1 ring-ink-300 hover:bg-ink-100">
                  {label} <span className="text-ink-400">×</span>
                </Link>
              );
            })}
            <Link href={base as any} className="ml-1 text-[12px] text-brand-600 hover:underline">Clear all</Link>
          </div>
        ) : null}

        <Card>
          {rows.length ? (
            <ul>
              {rows.map((n) => (
                <li key={n.id} className="border-b border-ink-100 last:border-0">
                  <Link href={noticeHref(n.kind, n.slug) as any} className="block px-[var(--card-p)] py-[var(--row-py)] hover:bg-ink-50/70">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] text-ink-400">{n.reference}</span>
                          {n.is_native ? <Badge tone="brand">Published here</Badge> : null}
                          <Badge tone={n.status === "closed" ? "neutral" : n.status === "closing_soon" ? "warn" : "ok"}>
                            {countdown(n.closing_at, now)}
                          </Badge>
                        </div>
                        <h3 className="mt-1 text-[14px] font-medium leading-snug text-ink-900">{n.title}</h3>
                        <p className="row-meta mt-1 text-[12px] text-ink-500">
                          {n.district ?? "—"} · {n.category ?? "—"}
                          {n.buyer ? <> · {n.buyer}</> : null}
                          {n.documents_count ? <> · {n.documents_count} documents</> : null}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[14px] font-medium text-ink-900 tabular">{lkr(n.estimated_value, true)}</p>
                        <p className="row-meta mt-0.5 font-mono text-[11px] text-ink-400">{dateTime(n.closing_at)}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Nothing matches these filters"
              help="Remove a facet to widen the search. Every count beside a facet is the number of rows you will actually get."
            />
          )}

          {meta.pages > 1 ? (
            <div className="flex items-center justify-between border-t border-ink-200 px-[var(--card-p)] py-3">
              <span className="font-mono text-[12px] text-ink-400">Page {meta.page} of {meta.pages} · {meta.total} notices</span>
              <div className="flex gap-1.5">
                {meta.page > 1 ? <Link href={href({ page: String(meta.page - 1) })} className="rounded-[6px] px-2.5 py-1 text-[13px] text-ink-600 hover:bg-ink-100">‹ Previous</Link> : null}
                {meta.page < meta.pages ? <Link href={href({ page: String(meta.page + 1) })} className="rounded-[6px] px-2.5 py-1 text-[13px] text-ink-600 hover:bg-ink-100">Next ›</Link> : null}
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
