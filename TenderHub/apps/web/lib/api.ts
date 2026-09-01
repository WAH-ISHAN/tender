import { cookies } from "next/headers";
import type { Envelope } from "./types";

export const API_BASE = process.env.API_BASE ?? "http://127.0.0.1:8080";

/**
 * PHP's built-in dev server binds IPv6-only by default. curl silently falls
 * back to ::1 and works; Node's fetch to an IPv4 literal does not, and every
 * sign-in reported "no backend configured" while the API was demonstrably up.
 * Start it with --host 0.0.0.0.
 */
export async function apiFetch<T = any>(
  path: string,
  opts: RequestInit & { token?: string | null } = {},
): Promise<{ ok: boolean; status: number; body: Envelope<T> | any }> {
  const { token, ...init } = opts;
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  try {
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers, cache: "no-store" });
    const text = await res.text();
    let body: any;
    try { body = JSON.parse(text); } catch { body = { reason: "bad_gateway", detail: text.slice(0, 200) }; }
    return { ok: res.ok, status: res.status, body };
  } catch (e: any) {
    return {
      ok: false,
      status: 502,
      body: { status: 502, reason: "api_unreachable", detail: `The API is not reachable at ${API_BASE}.` },
    };
  }
}

export async function token(): Promise<string | null> {
  const c = await cookies();
  return c.get("th_at")?.value ?? null;
}

/** Server-side fetch that forwards the caller's own token. */
export async function authed<T = any>(path: string, opts: RequestInit = {}) {
  return apiFetch<T>(path, { ...opts, token: await token() });
}
