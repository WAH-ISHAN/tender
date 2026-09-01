/** Server components — no handlers, so no client boundary needed. */
import type { ReactNode } from "react";

const TONES = {
  neutral: "bg-ink-100 text-ink-700 ring-ink-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  ok: "bg-ok-50 text-ok-600 ring-emerald-200",
  warn: "bg-warn-50 text-warn-600 ring-amber-200",
  bad: "bg-bad-50 text-bad-600 ring-red-200",
} as const;

export type Tone = keyof typeof TONES;

export function Badge({ children, tone = "neutral", mono }: { children: ReactNode; tone?: Tone; mono?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${TONES[tone]} ${mono ? "font-mono" : ""}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [Tone, string]> = {
    live: ["ok", "Live"],
    closing_soon: ["warn", "Closing soon"],
    closed: ["neutral", "Closed"],
    draft: ["neutral", "Draft"],
    unverified: ["warn", "Awaiting review"],
    published: ["ok", "Published"],
    withdrawn: ["bad", "Withdrawn"],
  };
  const [tone, label] = map[status] ?? ["neutral", status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[12px] border border-ink-200 bg-white shadow-[var(--shadow-card)] ${className}`}>{children}</div>;
}

export function CardHead({ title, sub, right }: { title: ReactNode; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-ink-200 px-[var(--card-p)] py-3">
      <div>
        <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>
        {sub ? <p className="mt-0.5 text-[13px] text-ink-500">{sub}</p> : null}
      </div>
      {right}
    </div>
  );
}

export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-[var(--card-p)] ${className}`}>{children}</div>;
}

export function OrgMark({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[8px] font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.36, background: `hsl(${h} 45% 42%)` }}
    >
      {initials}
    </span>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-[6px] bg-ink-200 ${className}`} />;
}

export function Meter({ value, max, tone = "brand" }: { value: number; max: number; tone?: Tone }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const bar = { brand: "bg-brand-600", ok: "bg-ok-600", warn: "bg-warn-600", bad: "bg-bad-600", neutral: "bg-ink-400" }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-200">
      <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function EmptyState({ title, help, action }: { title: string; help?: string; action?: ReactNode }) {
  return (
    <div className="px-6 py-14 text-center">
      <p className="text-[15px] font-medium text-ink-800">{title}</p>
      {help ? <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-ink-500">{help}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function KeyValue({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{k}</dt>
          <dd className="mt-0.5 text-[14px] text-ink-800">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
