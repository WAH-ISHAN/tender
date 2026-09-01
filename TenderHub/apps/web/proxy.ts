import { NextRequest, NextResponse } from "next/server";

/**
 * THE SINGLE GATE.
 *
 * Next's proxy runs before any page renders, on every request including the
 * ones a client-side navigation makes. Putting the role and subscription checks
 * here means a route cannot be reached by any path that skips them — a link, a
 * bookmark, a typed URL, a stale prefetch.
 *
 * (In Next 16 this file is proxy.ts; it was middleware.ts through Next 15.)
 */

const FREE_VIEW_LIMIT = 5;

function session(req: NextRequest): { group: string; plan: string; sub: string } | null {
  const raw = req.cookies.get("th_sess")?.value;
  if (!raw) return null;
  try {
    const s = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    return { group: s.user.group, plan: s.org.plan, sub: s.org.sub_status };
  } catch {
    return null;
  }
}

function paid(s: { plan: string; sub: string }): boolean {
  return ["business", "publish", "enterprise", "staff"].includes(s.plan) && s.sub !== "expired";
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const s = session(req);

  const go = (to: string) => NextResponse.redirect(new URL(to, req.url));

  // ---- staff console
  if (pathname.startsWith("/console")) {
    if (!s) return go(`/company/signin?next=${encodeURIComponent(pathname)}`);
    if (s.group !== "staff") return go("/");
    return NextResponse.next();
  }

  // ---- bidder portal: a bidder AND an active subscription
  if (pathname.startsWith("/app")) {
    if (!s) return go(`/bidder/signin?next=${encodeURIComponent(pathname)}`);
    if (s.group !== "bidder") return go("/");
    if (!paid(s)) return go("/subscription");
    return NextResponse.next();
  }

  // ---- company workspace
  if (pathname.startsWith("/workspace")) {
    if (!s) return go(`/company/signin?next=${encodeURIComponent(pathname)}`);
    if (s.group !== "company") return go("/");
    return NextResponse.next();
  }

  // ---- signed-in users are bounced off the auth pages to their own home
  if (/^\/(bidder|company)\/(signin|signup)$/.test(pathname) && s) {
    return go(s.group === "staff" ? "/console" : s.group === "company" ? "/workspace" : paid(s) ? "/app" : "/subscription");
  }

  /**
   * ---- free-view metering.
   *
   * Counted HERE, server-side, before the page renders. Prefetch requests are
   * excluded so hovering a link never costs a view: Next sends
   * `next-router-prefetch` on those, and charging for them would burn a
   * subscriber's quota on mouse movement alone.
   */
  const detail = pathname.match(/^\/(tenders|auctions)\/[^/]+$/);
  if (detail && s && s.group === "bidder" && !paid(s)) {
    const isPrefetch =
      req.headers.get("next-router-prefetch") !== null ||
      req.headers.get("purpose") === "prefetch" ||
      req.headers.get("x-middleware-prefetch") !== null;

    if (!isPrefetch) {
      const seen = new Set((req.cookies.get("th_views")?.value ?? "").split(",").filter(Boolean));

      // The same notice viewed twice costs one view, not two.
      if (!seen.has(pathname)) {
        if (seen.size >= FREE_VIEW_LIMIT) {
          return go(`/subscription?reason=quota&next=${encodeURIComponent(pathname + search)}`);
        }
        seen.add(pathname);
        const res = NextResponse.next();
        res.cookies.set("th_views", [...seen].join(","), {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });
        return res;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
