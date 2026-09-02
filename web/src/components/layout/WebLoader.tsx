"use client";
import { useState, useEffect } from "react";

export default function WebLoader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(25);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 120);

    // Fade out timer
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 600);

    // Complete unmount timer
    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 950);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted || !loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-400 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={fading}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center animate-fadeIn">
        
        {/* Brand Logo Header */}
        <div className="mb-6">
          <span className="font-display font-black text-3xl sm:text-4xl tracking-tight text-[#0F172A] block leading-none">
            TENDER<span className="text-[#0055B8]">HUB</span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-widest uppercase block mt-2">
            Sri Lanka National Procurement &amp; Tender Network
          </span>
        </div>

        {/* Minimalist Corporate Progress Bar (Strict 50/30/20 styling) */}
        <div className="w-52 sm:w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 mb-3.5">
          <div
            className="h-full bg-[#0055B8] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="text-[11px] font-mono font-semibold text-slate-400">
          Loading procurement gazettes...
        </div>

      </div>
    </div>
  );
}
