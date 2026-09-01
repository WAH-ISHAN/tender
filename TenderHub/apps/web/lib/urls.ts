export function noticeHref(kind: string, slug: string): string {
  return kind === "auction" ? `/auctions/${slug}` : `/tenders/${slug}`;
}

export function buildQuery(base: Record<string, string | string[] | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(base)) {
    if (v === undefined || v === "") continue;
    // Repeated keys, written the way the API's raw-query parser expects.
    if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
    else p.set(k, v);
  }
  const s = p.toString();
  return s ? `?${s}` : "";
}

export function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function asArray(v: string | string[] | undefined): string[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : v.split(",").filter(Boolean);
}
