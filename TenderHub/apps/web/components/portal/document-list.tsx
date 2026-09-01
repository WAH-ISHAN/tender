"use client";

import { useState } from "react";
import { bytes } from "@/lib/format";
import { Button } from "@/components/ds/controls";
import { Toast } from "@/components/ds/overlay";
import type { NoticeDocument } from "@/lib/types";

/**
 * The link is MINTED ON CLICK and never rendered into the page. A five-minute
 * link embedded in HTML is dead by the time most people click it — and alive
 * long enough to be forwarded if they do.
 */
export function DocumentList({ noticeId, documents, workspace }: { noticeId: number; documents: NoticeDocument[]; workspace?: number }) {
  const [busy, setBusy] = useState<number | null>(null);
  const [toast, setToast] = useState<{ m: string; t: "ok" | "bad" } | null>(null);

  async function download(d: NoticeDocument) {
    setBusy(d.id);
    const path = workspace
      ? `/api/workspace/authority/tenders/${workspace}/documents/${d.id}/url`
      : `/api/workspace/me/notices/${noticeId}/documents/${d.id}/url`;
    const res = await fetch(path);
    const json = await res.json();
    setBusy(null);

    if (!res.ok) {
      setToast({ m: json.detail ?? "That download could not be authorised.", t: "bad" });
      return;
    }
    window.location.href = json.data.url.replace("/api/v1/files/", "/api/files/");
  }

  if (!documents.length) {
    return <div className="px-[var(--card-p)] py-8 text-center text-[13px] text-ink-500">No documents attached yet.</div>;
  }

  return (
    <>
      <ul>
        {documents.map((d) => (
          <li key={d.id} className="flex items-center gap-3 border-b border-ink-100 px-[var(--card-p)] py-3 last:border-0">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-brand-50 text-[11px] font-semibold text-brand-700">PDF</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-ink-900">{d.name}</p>
              <p className="row-meta mt-0.5 font-mono text-[11px] text-ink-400">
                {bytes(d.size_bytes)}
                {d.sha256 ? <> · {d.sha256.slice(0, 12)}</> : null}
              </p>
            </div>
            {d.available ? (
              <Button size="sm" variant="secondary" disabled={busy === d.id} onClick={() => download(d)}>
                {busy === d.id ? "Minting link…" : "Download"}
              </Button>
            ) : (
              // A document we know about but have not mirrored SAYS SO.
              <div className="text-right">
                {d.source_url ? (
                  <a href={d.source_url} target="_blank" rel="noopener noreferrer nofollow" className="text-[12px] text-brand-600 hover:underline">At source ↗</a>
                ) : <span className="text-[12px] text-ink-400">Unavailable</span>}
                <p className="text-[11px] text-ink-400">not mirrored</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      {toast ? <Toast message={toast.m} tone={toast.t} onDone={() => setToast(null)} /> : null}
    </>
  );
}
