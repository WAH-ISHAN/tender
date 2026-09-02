"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "./controls";

/** Portalled so a table's overflow never clips it. Escape, scrim, focus trap
 *  and focus restore. */
export function Modal({
  open, onClose, title, children, footer, width = 560,
}: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; width?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const restore = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    restore.current = document.activeElement as HTMLElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => ref.current?.querySelector<HTMLElement>("button,input")?.focus(), 20);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restore.current?.focus();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-xs" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title}
           style={{ maxWidth: width }}
           className="relative w-full rounded-t-[16px] sm:rounded-[12px] bg-white shadow-[var(--shadow-pop)] max-h-[90dvh] sm:max-h-[85vh] flex flex-col animate-slideUp sm:animate-none">
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3.5">
          <h2 className="text-[15px] font-semibold text-ink-900">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink-400 hover:bg-ink-100 cursor-pointer">✕</button>
        </div>
        <div className="max-h-[75dvh] sm:max-h-[70vh] overflow-y-auto custom-scrollbar px-5 py-4 text-[13px] text-ink-700">{children}</div>
        {footer ? <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 border-t border-ink-200 px-5 py-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] sm:pb-3">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

export function ConfirmDialog({
  open, onClose, onConfirm, title, body, confirmLabel = "Confirm", danger,
}: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; body: ReactNode; confirmLabel?: string; danger?: boolean }) {
  return (
    <Modal open={open} onClose={onClose} title={title} width={440}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant={danger ? "danger" : "primary"} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Button>
      </>}>
      {body}
    </Modal>
  );
}

export function Toast({ message, tone = "ok", onDone }: { message: string; tone?: "ok" | "bad"; onDone?: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); const t = setTimeout(() => onDone?.(), 4200); return () => clearTimeout(t); }, [onDone]);
  if (!mounted) return null;
  return createPortal(
    <div className={`fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-[10px] px-4 py-2.5 text-[13px] text-white shadow-[var(--shadow-pop)] ${tone === "ok" ? "bg-ink-900" : "bg-bad-600"}`}>
      {message}
    </div>,
    document.body,
  );
}
