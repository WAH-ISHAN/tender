import Link from "next/link";
import { readSession, isPaid } from "@/lib/session";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const s = await readSession();
  const home = s ? (s.user.group === "staff" ? "/console" : s.user.group === "company" ? "/workspace" : isPaid(s) ? "/app" : "/subscription") : null;

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-brand-600 text-[15px] font-bold text-white">T</span>
            <span className="text-[17px] font-semibold tracking-tight text-ink-900">TenderHub</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {[["/tenders", "Tenders"], ["/auctions", "Auctions"], ["/awards", "Awards"], ["/pricing", "Pricing"]].map(([h, l]) => (
              <Link key={h} href={h as any} className="rounded-[8px] px-3 py-1.5 text-[14px] font-medium text-ink-600 hover:bg-ink-100 hover:text-ink-900">{l}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {home ? (
              <Link href={home as any} className="rounded-[8px] bg-brand-600 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-brand-700">
                {s!.org.name.length > 22 ? s!.org.name.slice(0, 22) + "…" : s!.org.name} →
              </Link>
            ) : (
              <>
                {/* Two doors, separate copy. A bidder who lands on the company
                    door is not confused into signing up for the wrong thing. */}
                <Link href="/bidder/signin" className="rounded-[8px] px-3 py-2 text-[13px] font-medium text-ink-600 hover:bg-ink-100">For bidders</Link>
                <Link href="/company/signin" className="rounded-[8px] px-3 py-2 text-[13px] font-medium text-ink-600 hover:bg-ink-100">For buyers</Link>
                <Link href="/bidder/signup" className="rounded-[8px] bg-brand-600 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-brand-700">Create a free account</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {children}

      <footer className="mt-20 border-t border-ink-200 bg-ink-50">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-brand-600 text-[13px] font-bold text-white">T</span>
              <span className="font-semibold text-ink-900">TenderHub</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-500">
              Every tender and auction notice on the island, and the workspace the buying side runs procurement in.
            </p>
          </div>
          {[
            ["Find work", [["/tenders", "All tenders"], ["/auctions", "All auctions"], ["/awards", "Award history"], ["/pricing", "Pricing"]]],
            ["Bidders", [["/bidder/signup", "Create an account"], ["/bidder/signin", "Sign in"], ["/subscription", "Subscribe"]]],
            ["Buying organisations", [["/company/signup", "Publish a tender"], ["/company/signin", "Workspace sign in"]]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-400">{title as string}</p>
              <ul className="mt-3 space-y-2">
                {(links as string[][]).map(([h, l]) => (
                  <li key={h}><Link href={h as any} className="text-[13px] text-ink-600 hover:text-brand-700">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-ink-200 px-5 py-5">
          <p className="mx-auto max-w-[1200px] text-[12px] text-ink-400">
            © {new Date().getFullYear()} TenderHub (Private) Limited, Sri Lanka. TenderHub never holds any part of an
            auction purchase price; deposits settle to the auctioneer&rsquo;s own account.
          </p>
        </div>
      </footer>
    </div>
  );
}
