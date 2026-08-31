"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard?tab=settings");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-8 h-8 border-3 border-[#0055B8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Loading Company Settings...
        </span>
      </div>
    </div>
  );
}
