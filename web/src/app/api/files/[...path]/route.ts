import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/api";
import { AT } from "@/lib/session";

/** File downloads. The BFF requires a session before it will even relay the
 *  signed link; the signature is then re-checked by the API on the way in. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const token = req.cookies.get(AT)?.value;
  if (!token) return NextResponse.json({ status: 401, reason: "unauthenticated", detail: "Sign in to continue." }, { status: 401 });

  const { path } = await ctx.params;
  const upstream = await fetch(`${API_BASE}/api/v1/files/${path.join("/")}${req.nextUrl.search}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const buf = await upstream.arrayBuffer();
  const h = new Headers();
  for (const k of ["content-type", "content-disposition", "etag", "x-content-type-options"]) {
    const v = upstream.headers.get(k);
    if (v) h.set(k, v);
  }
  h.set("Cache-Control", "private, no-store");

  return new NextResponse(buf, { status: upstream.status, headers: h });
}
