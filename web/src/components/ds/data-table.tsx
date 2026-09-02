"use client";

import { useMemo, useState, type ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "right";
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  cell: (row: T) => ReactNode;
  meta?: (row: T) => ReactNode;
}

export interface FilterDef<T> {
  key: string;
  label: string;
  options: { value: string; label: string; n?: number }[];
  match: (row: T, selected: string[]) => boolean;
}

/**
 * Generic DataTable<T>. Sorting with aria-sort, multi-select filters with
 * counts, removable applied chips, search, row selection with a bulk bar, row
 * menus, windowed pagination, and a FILTER-AWARE empty state — an empty page
 * that does not say why is indistinguishable from a broken one.
 */
export function DataTable<T extends { id: number | string }>({
  rows, columns, filters = [], searchKeys, perPage = 15, empty, bulkActions, rowHref,
}: {
  rows: T[];
  columns: Column<T>[];
  filters?: FilterDef<T>[];
  searchKeys?: (row: T) => string;
  perPage?: number;
  empty?: { title: string; help?: string };
  bulkActions?: (selected: T[], clear: () => void) => ReactNode;
  rowHref?: (row: T) => string;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const [picked, setPicked] = useState<Set<string | number>>(new Set());
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let out = rows;
    if (q.trim() && searchKeys) {
      const needle = q.toLowerCase();
      out = out.filter((r) => searchKeys(r).toLowerCase().includes(needle));
    }
    for (const f of filters) {
      const s = sel[f.key] ?? [];
      if (s.length) out = out.filter((r) => f.match(r, s));
    }
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.sortValue) {
        out = [...out].sort((a, b) => {
          const av = col.sortValue!(a), bv = col.sortValue!(b);
          const c = av < bv ? -1 : av > bv ? 1 : 0;
          return sort.dir === "asc" ? c : -c;
        });
      }
    }
    return out;
  }, [rows, q, sel, sort, filters, columns, searchKeys]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages);
  const view = filtered.slice((safePage - 1) * perPage, safePage * perPage);
  const anyFilter = q.trim() !== "" || Object.values(sel).some((v) => v.length);

  const chips = filters.flatMap((f) =>
    (sel[f.key] ?? []).map((v) => ({
      key: f.key, value: v,
      label: f.options.find((o) => o.value === v)?.label ?? v,
    })),
  );

  const selectedRows = view.filter((r) => picked.has(r.id));

  // Windowed pagination: never render 40 page buttons.
  const window_: (number | "…")[] = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - safePage) <= 1) window_.push(i);
    else if (window_[window_.length - 1] !== "…") window_.push("…");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 px-[var(--card-p)] py-3">
        {searchKeys ? (
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Search…"
            className="h-[var(--ctl-h)] w-full sm:w-56 rounded-[8px] border border-ink-300 px-2.5 text-[13px] outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        ) : null}

        {filters.map((f) => {
          const s = sel[f.key] ?? [];
          return (
            <div key={f.key} className="relative">
              <button
                onClick={() => setOpenFilter(openFilter === f.key ? null : f.key)}
                className={`h-[var(--ctl-h)] rounded-[8px] border px-2.5 text-[13px] ${s.length ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-300 bg-white text-ink-700 hover:bg-ink-50"}`}
              >
                {f.label}{s.length ? ` · ${s.length}` : ""}
              </button>
              {openFilter === f.key ? (
                <div className="absolute left-0 top-full z-30 mt-1 max-h-72 w-60 overflow-auto rounded-[10px] border border-ink-200 bg-white p-1 shadow-[var(--shadow-pop)]">
                  {f.options.map((o) => (
                    <label key={o.value} className="flex cursor-pointer items-center gap-2 rounded-[6px] px-2 py-1.5 text-[13px] hover:bg-ink-50">
                      <input
                        type="checkbox"
                        checked={s.includes(o.value)}
                        onChange={() => {
                          const next = s.includes(o.value) ? s.filter((x) => x !== o.value) : [...s, o.value];
                          setSel({ ...sel, [f.key]: next });
                          setPage(1);
                        }}
                        className="accent-brand-600"
                      />
                      <span className="flex-1 truncate">{o.label}</span>
                      {o.n !== undefined ? <span className="font-mono text-[11px] text-ink-400">{o.n}</span> : null}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}

        <span className="ml-auto font-mono text-[12px] text-ink-400">
          {filtered.length} {filtered.length === 1 ? "row" : "rows"}
        </span>
      </div>

      {chips.length ? (
        <div className="flex flex-wrap items-center gap-1.5 border-b border-ink-200 bg-ink-50 px-[var(--card-p)] py-2">
          {chips.map((c) => (
            <button
              key={c.key + c.value}
              onClick={() => setSel({ ...sel, [c.key]: (sel[c.key] ?? []).filter((x) => x !== c.value) })}
              className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[12px] text-ink-700 ring-1 ring-ink-300 hover:bg-ink-100"
            >
              {c.label} <span className="text-ink-400">×</span>
            </button>
          ))}
          <button onClick={() => { setSel({}); setQ(""); }} className="ml-1 text-[12px] text-brand-600 hover:underline">
            Clear all
          </button>
        </div>
      ) : null}

      {bulkActions && picked.size ? (
        <div className="flex items-center gap-3 border-b border-brand-200 bg-brand-50 px-[var(--card-p)] py-2 text-[13px]">
          <span className="font-medium text-brand-800">{picked.size} selected</span>
          {bulkActions(selectedRows, () => setPicked(new Set()))}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              {bulkActions ? <th className="w-9 px-[var(--card-p)]" /> : null}
              {columns.map((c) => {
                const active = sort?.key === c.key;
                return (
                  <th
                    key={c.key}
                    style={{ width: c.width }}
                    aria-sort={active ? (sort!.dir === "asc" ? "ascending" : "descending") : "none"}
                    className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-500 ${c.align === "right" ? "text-right" : ""} first:pl-[var(--card-p)] last:pr-[var(--card-p)]`}
                  >
                    {c.sortable ? (
                      <button
                        onClick={() => setSort(active && sort!.dir === "asc" ? { key: c.key, dir: "desc" } : { key: c.key, dir: "asc" })}
                        className="inline-flex items-center gap-1 hover:text-ink-800"
                      >
                        {c.header}
                        <span className="text-ink-300">{active ? (sort!.dir === "asc" ? "▲" : "▼") : "⇅"}</span>
                      </button>
                    ) : c.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {view.map((r) => (
              <tr key={r.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60" style={{ height: "var(--row-h)" }}>
                {bulkActions ? (
                  <td className="px-[var(--card-p)]">
                    <input
                      type="checkbox"
                      checked={picked.has(r.id)}
                      onChange={() => {
                        const n = new Set(picked);
                        n.has(r.id) ? n.delete(r.id) : n.add(r.id);
                        setPicked(n);
                      }}
                      className="accent-brand-600"
                    />
                  </td>
                ) : null}
                {columns.map((c) => (
                  <td key={c.key} className={`px-3 py-[var(--row-py)] align-middle text-[13px] first:pl-[var(--card-p)] last:pr-[var(--card-p)] ${c.align === "right" ? "text-right" : ""}`}>
                    {c.cell(r)}
                    {c.meta ? <div className="row-meta mt-0.5 text-[12px] text-ink-400">{c.meta(r)}</div> : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!view.length ? (
        <div className="px-6 py-12 text-center">
          <p className="text-[15px] font-medium text-ink-800">
            {anyFilter ? "No rows match these filters" : empty?.title ?? "Nothing here yet"}
          </p>
          <p className="mx-auto mt-1.5 max-w-md text-[13px] text-ink-500">
            {anyFilter ? "Remove a filter to widen the search." : empty?.help}
          </p>
          {anyFilter ? (
            <button onClick={() => { setSel({}); setQ(""); }} className="mt-3 text-[13px] text-brand-600 hover:underline">
              Clear all filters
            </button>
          ) : null}
        </div>
      ) : null}

      {pages > 1 ? (
        <div className="flex items-center justify-between gap-2 border-t border-ink-200 px-[var(--card-p)] py-2.5">
          <span className="font-mono text-[12px] text-ink-400">
            {(safePage - 1) * perPage + 1}–{Math.min(safePage * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button disabled={safePage === 1} onClick={() => setPage(safePage - 1)} className="h-7 rounded-[6px] px-2 text-[12px] text-ink-600 disabled:opacity-40 hover:bg-ink-100">‹</button>
            {window_.map((p, i) =>
              p === "…" ? <span key={`e${i}`} className="px-1 text-[12px] text-ink-400">…</span> : (
                <button key={p} onClick={() => setPage(p)} className={`h-7 min-w-7 rounded-[6px] px-2 font-mono text-[12px] ${p === safePage ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-ink-100"}`}>{p}</button>
              ),
            )}
            <button disabled={safePage === pages} onClick={() => setPage(safePage + 1)} className="h-7 rounded-[6px] px-2 text-[12px] text-ink-600 disabled:opacity-40 hover:bg-ink-100">›</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
