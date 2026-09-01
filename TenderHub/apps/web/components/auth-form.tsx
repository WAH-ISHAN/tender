"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ds/controls";

type Mode = "signin" | "signup";
type Kind = "bidder" | "company";

const COPY: Record<Kind, Record<Mode, { title: string; sub: string; cta: string }>> = {
  bidder: {
    signin: { title: "Sign in to find work", sub: "Alerts, documents, your bid pipeline and electronic submission.", cta: "Sign in" },
    signup: { title: "Create a free bidder account", sub: "Five full notice views, alert profiles and the in-app feed. No card required.", cta: "Create my account" },
  },
  company: {
    signin: { title: "Sign in to your workspace", sub: "Publish, sell documents, receive sealed bids, evaluate and award.", cta: "Sign in" },
    signup: { title: "Open a procurement workspace", sub: "Free while we build supply. Run the whole procurement in one place.", cta: "Open the workspace" },
  },
};

export function AuthForm({ kind, mode }: { kind: Kind; mode: Mode }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const copy = COPY[kind][mode];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    if (mode === "signup") payload.account_type = kind;

    const res = await fetch(`/api/auth/${mode === "signin" ? "login" : "register"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setBusy(false);

    if (!res.ok) {
      setErr(json.detail ?? "Something went wrong. Try again.");
      return;
    }

    const org = json.data.org;
    const home = kind === "company" ? "/workspace"
      : ["business", "publish", "enterprise", "staff"].includes(org.plan) ? "/app" : "/subscription";
    router.push(home as any);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-5 py-14">
      <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">{copy.title}</h1>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{copy.sub}</p>

      <form onSubmit={submit} className="mt-7 space-y-3.5 rounded-[12px] border border-ink-200 bg-white p-6 shadow-[var(--shadow-card)]">
        {mode === "signup" ? (
          <>
            <Field name="org_name" label={kind === "company" ? "Organisation name" : "Company or trading name"} required />
            <Field name="name" label="Your name" required />
            {kind === "bidder" ? <Field name="phone" label="Mobile number" placeholder="+94 7X XXX XXXX" /> : null}
          </>
        ) : null}
        <Field name="email" label="E-mail" type="email" required />
        <Field name="password" label="Password" type="password" required minLength={mode === "signup" ? 8 : undefined} />

        {err ? <p className="rounded-[8px] bg-bad-50 px-3 py-2 text-[13px] text-bad-600 ring-1 ring-inset ring-red-200">{err}</p> : null}

        <Button type="submit" disabled={busy} className="w-full">{busy ? "One moment…" : copy.cta}</Button>
      </form>

      <p className="mt-5 text-center text-[13px] text-ink-500">
        {mode === "signin" ? (
          <>No account yet? <Link href={`/${kind}/signup` as any} className="font-medium text-brand-600 hover:underline">Create one</Link></>
        ) : (
          <>Already have one? <Link href={`/${kind}/signin` as any} className="font-medium text-brand-600 hover:underline">Sign in</Link></>
        )}
      </p>
      <p className="mt-2 text-center text-[12px] text-ink-400">
        {kind === "bidder"
          ? <>Issuing tenders instead? <Link href="/company/signin" className="hover:underline">The buyer door is here.</Link></>
          : <>Looking for work instead? <Link href="/bidder/signin" className="hover:underline">The bidder door is here.</Link></>}
      </p>
    </div>
  );
}

function Field({ name, label, ...rest }: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-ink-600">{label}</span>
      <input
        name={name}
        {...rest}
        className="h-[38px] w-full rounded-[8px] border border-ink-300 px-3 text-[13px] outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}
