"use client";
/** Client, because Server Components cannot pass handlers. */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const V: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-300",
  secondary: "bg-white text-ink-800 ring-1 ring-inset ring-ink-300 hover:bg-ink-50",
  ghost: "text-ink-600 hover:bg-ink-100",
  danger: "bg-bad-600 text-white hover:bg-red-700",
};

export function Button({
  children, variant = "primary", size = "md", className = "", ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-[30px] px-2.5 text-[12px]" : "h-[var(--ctl-h)] px-3.5 text-[13px]";
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[8px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${V[variant]} ${s} ${className}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href, children, variant = "primary", size = "md", className = "",
}: { href: any; children: ReactNode; variant?: Variant; size?: "sm" | "md"; className?: string }) {
  const s = size === "sm" ? "h-[30px] px-2.5 text-[12px]" : "h-[var(--ctl-h)] px-3.5 text-[13px]";
  return (
    <Link href={href} className={`inline-flex items-center justify-center gap-1.5 rounded-[8px] font-medium transition-colors ${V[variant]} ${s} ${className}`}>
      {children}
    </Link>
  );
}

export function Kpi({ label, value, sub, tone = "neutral" }: { label: string; value: ReactNode; sub?: ReactNode; tone?: "neutral" | "ok" | "warn" | "bad" }) {
  const c = { neutral: "text-ink-900", ok: "text-ok-600", warn: "text-warn-600", bad: "text-bad-600" }[tone];
  return (
    <div className="rounded-[12px] border border-ink-200 bg-white p-4 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</p>
      <p className={`mt-1.5 font-mono text-[26px] font-semibold leading-none tabular ${c}`}>{value}</p>
      {sub ? <p className="mt-1.5 text-[12px] text-ink-500">{sub}</p> : null}
    </div>
  );
}
