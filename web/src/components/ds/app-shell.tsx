import Link from "next/link";
import type { ReactNode } from "react";
import { OrgMark } from "./primitives";
import { NavLink, DensityToggle } from "./nav";
import { SignOutButton } from "@/components/portal/sign-out";

/** The three-portal shell. */
export function PortalShell({
  portal, nav, orgName, userName, plan, children,
}: {
  portal: "app" | "workspace" | "console";
  nav: { href: string; label: string }[];
  orgName: string;
  userName: string;
  plan?: string;
  children: ReactNode;
}) {
  const label = { app: "Bidder portal", workspace: "Procurement workspace", console: "Staff console" }[portal];

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-white">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-brand-600 text-[13px] font-bold text-white">T</span>
            <span className="text-[15px] font-semibold text-ink-900">TenderHub</span>
          </Link>
          <span className="hidden rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-600 sm:inline">{label}</span>

          <nav className="ml-2 hidden items-center gap-0.5 md:flex">
            {nav.map((n) => <NavLink key={n.href} href={n.href}>{n.label}</NavLink>)}
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <DensityToggle />
            <div className="hidden items-center gap-2 sm:flex">
              <OrgMark name={orgName} size={30} />
              <div className="leading-tight">
                <p className="text-[12px] font-medium text-ink-800">{orgName}</p>
                <p className="text-[11px] text-ink-400">{userName}{plan ? ` · ${plan}` : ""}</p>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
        <nav className="flex flex-nowrap items-center gap-1 overflow-x-auto no-scrollbar border-t border-ink-100 px-4 py-1.5 md:hidden">
          {nav.map((n) => <div key={n.href} className="shrink-0"><NavLink href={n.href}>{n.label}</NavLink></div>)}
        </nav>
      </header>
      <main className="mx-auto max-w-[1400px] px-5 py-6">{children}</main>
    </div>
  );
}

export function PageHead({ title, sub, right }: { title: string; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-ink-900">{title}</h1>
        {sub ? <p className="mt-1 text-[13px] text-ink-500">{sub}</p> : null}
      </div>
      {right}
    </div>
  );
}
