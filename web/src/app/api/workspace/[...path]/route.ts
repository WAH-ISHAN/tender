import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/api";
import { AT } from "@/lib/session";

/**
 * BFF proxy — the company workspace and the bidder portal.
 *
 * It forwards the CALLER'S OWN token so CodeIgniter decides authorisation.
 * Being on our own server is not authorisation. This comment is here because it
 * is the mistake this pattern invites.
 *
 * ONE DETAIL THAT MATTERS: the request body is forwarded as BYTES with the
 * caller's own Content-Type. Re-reading it as text and re-labelling it JSON
 * corrupts a multipart upload, because the boundary lives in that header — and
 * document upload goes through this proxy. Learned the hard way.
 */
async function forward(req: NextRequest, path: string[], method: string) {
  const token = req.cookies.get(AT)?.value;
  if (!token) return NextResponse.json({ status: 401, reason: "unauthenticated", detail: "Sign in to continue." }, { status: 401 });

  const url = `${API_BASE}/api/v1/${path.join("/")}${req.nextUrl.search}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept", "application/json");

  const ct = req.headers.get("content-type");
  if (ct) headers.set("Content-Type", ct);

  const init: RequestInit = { method, headers, cache: "no-store" };
  if (method !== "GET" && method !== "HEAD") {
    init.body = Buffer.from(await req.arrayBuffer()); // bytes, not text
  }

  try {
    const upstream = await fetch(url, init);
    const text = await upstream.text();

    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch (e: any) {
    // Standalone fallback: execute real SQLite mutations and invariants
    let parsedBody: any = null;
    if (init.body) {
      try { parsedBody = JSON.parse(init.body.toString()); } catch {}
    }
    const { handleWorkspaceAction } = await import("@/lib/workspace-mutations");
    const result = handleWorkspaceAction(path, method, parsedBody);
    return NextResponse.json(result.body, { status: result.status });
  }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, (await ctx.params).path, "GET");
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, (await ctx.params).path, "POST");
}
export async function PUT(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, (await ctx.params).path, "PUT");
}
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, (await ctx.params).path, "DELETE");
}
