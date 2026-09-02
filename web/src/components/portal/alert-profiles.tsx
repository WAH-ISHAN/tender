"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Card, CardBody, CardHead, EmptyState } from "@/components/ds/primitives";
import { Button } from "@/components/ds/controls";
import { Modal, Toast } from "@/components/ds/overlay";
import { lkr } from "@/lib/format";

export function AlertProfileEditor({ profiles, categories, districts }: { profiles: any[]; categories: any[]; districts: any[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<any | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [cats, setCats] = useState<string[]>([]);
  const [dists, setDists] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>(["inapp"]);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/workspace/me/alert-profiles", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, categories: cats, districts: dists, channels, kinds: "tender" }),
    });
    setBusy(false);
    if (res.ok) { setOpen(false); setCats([]); setDists([]); router.refresh(); setToast("Profile saved. Preview it to see what it would have matched."); }
  }

  async function runPreview(id: number) {
    const res = await fetch(`/api/workspace/me/alert-profiles/${id}/preview`);
    const json = await res.json();
    setPreview({ ...json.data, warning: json.meta?.warning });
  }

  const Multi = ({ items, sel, set, label }: { items: any[]; sel: string[]; set: (v: string[]) => void; label: string }) => (
    <div>
      <p className="mb-1.5 text-[12px] font-medium text-ink-600">{label}</p>
      <div className="max-h-40 overflow-auto rounded-[8px] border border-ink-300 p-1.5">
        {items.map((i) => (
          <label key={i.slug} className="flex cursor-pointer items-center gap-2 rounded-[6px] px-2 py-1 text-[13px] hover:bg-ink-50">
            <input type="checkbox" checked={sel.includes(i.slug)} className="accent-brand-600"
              onChange={() => set(sel.includes(i.slug) ? sel.filter((x) => x !== i.slug) : [...sel, i.slug])} />
            {i.name}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-4"><Button onClick={() => setOpen(true)}>New profile</Button></div>

      <div className="grid gap-3 md:grid-cols-2">
        {profiles.length ? profiles.map((p) => (
          <Card key={p.id}>
            <CardHead
              title={p.name}
              sub={[p.category_slugs, p.district_slugs].filter(Boolean).join(" · ").replace(/,/g, ", ") || "Everything"}
              right={<Badge tone={p.active ? "ok" : "neutral"}>{p.active ? "Active" : "Paused"}</Badge>}
            />
            <CardBody>
              <div className="flex flex-wrap items-center gap-1.5">
                {String(p.channels).split(",").map((c: string) => <Badge key={c}>{c}</Badge>)}
                {p.min_value ? <Badge>from {lkr(Number(p.min_value), true)}</Badge> : null}
              </div>
              <Button size="sm" variant="secondary" className="mt-3" onClick={() => runPreview(p.id)}>Preview against 30 days</Button>
            </CardBody>
          </Card>
        )) : (
          <div className="md:col-span-2">
            <Card><EmptyState title="No profiles yet" help="A profile is a saved search that pushes matches to your feed. Build one and preview it before you rely on it." action={<Button onClick={() => setOpen(true)}>New profile</Button>} /></Card>
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New alert profile" width={620}
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                 <Button form="ap" type="submit" disabled={busy}>{busy ? "Saving…" : "Save profile"}</Button></>}>
        <form id="ap" onSubmit={create} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-[12px] font-medium text-ink-600">Name this profile</span>
            <input name="name" required placeholder="Civil works — Western"
              className="h-[38px] w-full rounded-[8px] border border-ink-300 px-2.5 text-[13px]" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <Multi items={categories.filter((c) => c.parent_id)} sel={cats} set={setCats} label="Categories" />
            <Multi items={districts} sel={dists} set={setDists} label="Districts" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-[12px] font-medium text-ink-600">Minimum value (Rs.)</span>
              <input name="min_value" type="number" className="h-[38px] w-full rounded-[8px] border border-ink-300 px-2.5 text-[13px]" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[12px] font-medium text-ink-600">Keywords, comma separated</span>
              <input name="keywords" placeholder="bridge, culvert" className="h-[38px] w-full rounded-[8px] border border-ink-300 px-2.5 text-[13px]" />
            </label>
          </div>
          <div>
            <p className="mb-1.5 text-[12px] font-medium text-ink-600">Channels</p>
            <div className="flex flex-wrap gap-1.5">
              {[["inapp", "In-app feed"], ["email", "E-mail"], ["sms", "SMS"], ["whatsapp", "WhatsApp"]].map(([v, l]) => (
                <button type="button" key={v} onClick={() => setChannels(channels.includes(v) ? channels.filter((c) => c !== v) : [...channels, v])}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${channels.includes(v) ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-600 hover:bg-ink-200"}`}>{l}</button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-ink-400">
              Matching and the in-app feed are live. E-mail, SMS and WhatsApp delivery are not yet wired — we would
              rather say so than let you think something is being sent.
            </p>
          </div>
        </form>
      </Modal>

      <Modal open={!!preview} onClose={() => setPreview(null)} title="What this profile would have matched" width={620}>
        {preview ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[["Matches", preview.matches], ["Per week", preview.per_week], ["Window", `${preview.window_days} days`]].map(([l, v]) => (
                <div key={l as string} className="rounded-[8px] bg-ink-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-ink-400">{l as string}</p>
                  <p className="mt-1 font-mono text-[20px] font-semibold text-ink-900">{v as any}</p>
                </div>
              ))}
            </div>
            {preview.warning ? (
              <p className="rounded-[8px] bg-warn-50 px-3 py-2 text-[13px] text-warn-600 ring-1 ring-inset ring-amber-200">{preview.warning}</p>
            ) : null}
            <div>
              <p className="mb-1.5 text-[12px] font-medium text-ink-600">Sample of what it caught</p>
              <ul className="space-y-1.5">
                {(preview.sample ?? []).map((s: any) => (
                  <li key={s.id} className="rounded-[8px] bg-ink-50 px-3 py-2 text-[13px] text-ink-700">{s.title}</li>
                ))}
                {!preview.sample?.length ? <li className="text-[13px] text-ink-500">Nothing in the last 30 days. Widen the profile.</li> : null}
              </ul>
            </div>
          </div>
        ) : null}
      </Modal>

      {toast ? <Toast message={toast} onDone={() => setToast(null)} /> : null}
    </>
  );
}
