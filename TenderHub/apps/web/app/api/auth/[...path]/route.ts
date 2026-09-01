import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/api";
import { AT, RT, SESS, VIEWS, encodeSession } from "@/lib/session";

/**
 * BFF proxy — auth.
 *
 * Access tokens live in httpOnly cookies and are never readable by JavaScript.
 * That is only possible if something server-side attaches them, which is what
 * this handler does. Being on our own server is NOT authorisation: every other
 * proxy forwards the caller's own token so CodeIgniter decides.
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const segment = path.join("/");

  if (segment === "signout") {
    const res = NextResponse.json({ ok: true });
    for (const c of [AT, RT, SESS, VIEWS]) res.cookies.delete(c);
    return res;
  }

  const body = await req.text();
  const upstream = await fetch(`${API_BASE}/api/v1/auth/${segment}`, {
    method: "POST",
    headers: { "Content-Type": req.headers.get("content-type") ?? "application/json" },
    body,
    cache: "no-store",
  });

  const text = await upstream.text();
  let json: any;
  try { json = JSON.parse(text); } catch { json = { reason: "bad_gateway", detail: "Upstream returned no JSON." }; }

  if (!upstream.ok) return NextResponse.json(json, { status: upstream.status });

  const d = json?.data;
  if (!d?.access_token) return NextResponse.json(json, { status: 200 });

  const res = NextResponse.json({ data: { user: d.user, org: d.org }, meta: json.meta ?? {} });
  const base = { httpOnly: true, sameSite: "lax" as const, path: "/", secure: process.env.NODE_ENV === "production" };
  res.cookies.set(AT, d.access_token, { ...base, maxAge: d.expires_in ?? 900 });
  res.cookies.set(RT, d.refresh_token, { ...base, maxAge: 60 * 60 * 24 * 30 });
  // The session cookie carries only display and gating facts — never the token.
  res.cookies.set(SESS, encodeSession({ user: d.user, org: d.org }), { ...base, maxAge: 60 * 60 * 24 * 30 });
  res.cookies.delete(VIEWS);

  return res;
}
