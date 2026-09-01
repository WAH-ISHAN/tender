"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function RelatedTendersPage() {
  const router = useRouter();
  const { t } = useLanguage();
  useEffect(() => {
    router.replace("/dashboard?tab=related");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-8 h-8 border-3 border-[#0055B8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {t("dashLoadingRelated")}
        </span>
      </div>
    </div>
  );
}
