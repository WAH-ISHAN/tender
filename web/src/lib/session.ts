import { cookies } from "next/headers";
import type { Session } from "./types";

export const AT = "th_at";
export const RT = "th_rt";
export const SESS = "th_sess";
export const VIEWS = "th_views";

/** Access tokens live in httpOnly cookies and are NEVER readable by JavaScript.
 *  That is only possible because something server-side attaches them. */
export async function readSession(): Promise<Session | null> {
  const raw = (await cookies()).get(SESS)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as Session;
  } catch {
    return null;
  }
}

export function encodeSession(s: Session): string {
  return Buffer.from(JSON.stringify(s), "utf8").toString("base64url");
}

export function isPaid(s: Session | null): boolean {
  if (!s) return false;
  return ["business", "publish", "enterprise", "staff"].includes(s.org.plan) && s.org.sub_status !== "expired";
}
