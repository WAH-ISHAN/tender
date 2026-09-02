"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ds/controls";
import { lkr } from "@/lib/format";

export function ClaimForm({ terms }: { terms: Record<string, { months: number; amount: number }> }) {
  const router = useRouter();
  const [term, setTerm] = useState("annual");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const payload = { ...Object.fromEntries(new FormData(e.currentTarget).entries()), term };
    const res = await fetch("/api/workspace/me/subscription/claim", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) { setErr(json.detail ?? "That claim could not be filed."); return; }
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4 p-[var(--card-p)]">
      <div className="grid gap-2 sm:grid-cols-2">
        {Object.entries(terms).map(([k, t]) => (
          <button type="button" key={k} onClick={() => setTerm(k)}
            className={`rounded-[10px] border p-3 text-left ${term === k ? "border-brand-600 bg-brand-50" : "border-ink-300 hover:bg-ink-50"}`}>
            <p className="text-[13px] font-medium capitalize text-ink-900">{k}</p>
            <p className="mt-0.5 font-mono text-[17px] font-semibold text-ink-900">{lkr(t.amount)}</p>
            <p className="text-[11px] text-ink-500">{t.months} months</p>
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <F name="bank" label="Bank you transferred from" required />
        <F name="slip_ref" label="Slip / reference number" required />
        <F name="paid_on" label="Date paid" type="date" required suppressHydrationWarning defaultValue={typeof window === "undefined" ? "" : new Date().toISOString().slice(0, 10)} />
        <label className="block">
          <span className="mb-1 block text-[12px] font-medium text-ink-600">How you sent the slip</span>
          <select name="channel" className="h-[38px] w-full rounded-[8px] border border-ink-300 bg-white px-2.5 text-[13px]">
            <option value="whatsapp">WhatsApp</option>
            <option value="email">E-mail</option>
          </select>
        </label>
      </div>

      {err ? <p className="rounded-[8px] bg-bad-50 px-3 py-2 text-[13px] text-bad-600">{err}</p> : null}
      <Button type="submit" disabled={busy}>{busy ? "Filing…" : "File my claim"}</Button>
    </form>
  );
}

function F({ name, label, ...rest }: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-ink-600">{label}</span>
      <input name={name} {...rest} className="h-[38px] w-full rounded-[8px] border border-ink-300 px-2.5 text-[13px] outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
    </label>
  );
}
