import Link from "next/link";
import { authed } from "@/lib/api";
import { lkr, countdown } from "@/lib/format";
import { Badge, Card, EmptyState } from "@/components/ds/primitives";
import { LinkButton } from "@/components/ds/controls";
import { PageHead } from "@/components/ds/app-shell";
import { noticeHref } from "@/lib/urls";
import type { Notice } from "@/lib/types";

export const metadata = { title: "Your feed" };

export default async function Feed() {
  const res = await authed<Notice[]>("/api/v1/me/feed");
  const rows: Notice[] = res.body?.data ?? [];
  const meta = res.body?.meta ?? {};
  const now = meta.now ?? new Date().toISOString();

  return (
    <>
      <PageHead
        title="Your feed"
        sub="Each active profile is matched separately and the results merged, so every row says which profile brought it here."
        right={<LinkButton href="/app/alerts" variant="secondary">Manage profiles</LinkButton>}
      />

      <Card>
        {rows.length ? (
          <ul>
            {rows.map((n) => (
              <li key={n.id} className="border-b border-ink-100 last:border-0">
                <Link href={noticeHref(n.kind, n.slug) as any} className="block px-[var(--card-p)] py-[var(--row-py)] hover:bg-ink-50/70">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {(n.matched_by ?? []).map((p: string) => <Badge key={p} tone="brand">matched: {p}</Badge>)}
                        <Badge tone={n.status === "closing_soon" ? "warn" : n.status === "closed" ? "neutral" : "ok"}>
                          {countdown(n.closing_at, now)}
                        </Badge>
                      </div>
                      <h3 className="mt-1.5 text-[14px] font-medium text-ink-900">{n.title}</h3>
                      <p className="row-meta mt-0.5 text-[12px] text-ink-500">
                        {n.reference} · {n.district ?? "—"} · {n.buyer ?? "—"}
                      </p>
                    </div>
                    <p className="font-mono text-[14px] font-medium text-ink-900 tabular">{lkr(n.estimated_value, true)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          /* An empty feed says WHY it is empty and what to do about it, rather
             than reading as a broken product. */
          <EmptyState
            title={meta.empty_reason === "no_profiles" ? "You have no alert profiles yet" : "Nothing has matched yet"}
            help={meta.empty_help}
            action={<LinkButton href="/app/alerts">Build a profile</LinkButton>}
          />
        )}
      </Card>
    </>
  );
}
