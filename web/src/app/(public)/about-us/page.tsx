"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type AboutTab = "overview" | "mandate" | "integrity" | "leadership";

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>("overview");
  const { t } = useLanguage();

  return (
    <div className="max-w-[1680px] 2xl:max-w-[1760px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 2xl:px-10 py-6 xs:py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 lg:gap-12 items-start">
        
        {/* Mobile & Tablet Horizontal Subnav Tabs (Rule #8 Interactive Navigation) */}
        <div className="lg:hidden col-span-1 flex overflow-x-auto custom-scrollbar gap-2 p-1.5 bg-[#F1F3F7] rounded-2xl border border-slate-200 mb-6">
          {[
            { id: "overview", label: t("aboutTabOverview") },
            { id: "mandate", label: t("aboutTabMandate") },
            { id: "integrity", label: t("aboutTabIntegrity") },
            { id: "leadership", label: t("aboutTabLeadership") },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as AboutTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-[#0055B8] shadow-xs"
                  : "text-slate-600 hover:text-black font-bold"
              }`}
            >
              {activeTab === tab.id ? `[${tab.label}]` : tab.label}
            </button>
          ))}
        </div>

        {/* Left Subnav (Desktop Interactive Navigation) */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4 pt-4 text-[13px]">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "overview" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "overview" ? `[${t("aboutTabOverview")}]` : t("aboutTabOverview")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mandate")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "mandate" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "mandate" ? `[${t("aboutTabMandate")}]` : t("aboutTabMandate")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("integrity")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "integrity" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "integrity" ? `[${t("aboutTabIntegrity")}]` : t("aboutTabIntegrity")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("leadership")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "leadership" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "leadership" ? `[${t("aboutTabLeadership")}]` : t("aboutTabLeadership")}
          </button>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          
          {/* Dynamic Header according to active tab - Responsive 320px -> 1920px+ */}
          <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111827] uppercase leading-none mb-4 xs:mb-6 break-words">
            {activeTab === "overview" && t("aboutTitleOverview")}
            {activeTab === "mandate" && t("aboutTitleMandate")}
            {activeTab === "integrity" && t("aboutTitleIntegrity")}
            {activeTab === "leadership" && t("aboutTitleLeadership")}
          </h1>

          <p className="text-base xs:text-lg text-[#6B7280] max-w-3xl mb-8 xs:mb-10 sm:mb-12 font-normal leading-relaxed">
            {activeTab === "overview" && t("aboutDescOverview")}
            {activeTab === "mandate" && t("aboutDescMandate")}
            {activeTab === "integrity" && t("aboutDescIntegrity")}
            {activeTab === "leadership" && t("aboutDescLeadership")}
          </p>

          {/* TAB 1: COMPANY OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fadeIn">
              {/* Metric Badges Grid - 2 cols mobile, 4 cols desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 mb-10 xs:mb-12 sm:mb-16">
                <div className="bg-[#F8FAFC] border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">{t("aboutMetricPublished")}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-extrabold mt-1">{t("aboutMetricPublishedLabel")}</div>
                </div>
                <div className="bg-[#0055B8] text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-white">{t("aboutMetricVerified")}</div>
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-extrabold mt-1">{t("aboutMetricVerifiedLabel")}</div>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">{t("aboutMetricProvinces")}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-extrabold mt-1">{t("aboutMetricProvincesLabel")}</div>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">{t("aboutMetricSuppliers")}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-extrabold mt-1">{t("aboutMetricSuppliersLabel")}</div>
                </div>
              </div>

              {/* Editorial Story Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-200 pt-12">
                <div>
                  <h2 className="text-2xl font-black text-[#111827] mb-4">{t("aboutMandateTitle")}</h2>
                  <p className="text-slate-600 font-normal leading-relaxed mb-4">
                    {t("aboutMandateP1")}
                  </p>
                  <p className="text-slate-600 font-normal leading-relaxed">
                    {t("aboutMandateP2")}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-[#111827] mb-4">{t("aboutVerificationTitle")}</h2>
                  <p className="text-slate-600 font-normal leading-relaxed mb-4">
                    {t("aboutVerificationP1")}
                  </p>
                  <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/90 border-l-4 border-l-[#0055B8] shadow-sm">
                    <p className="text-sm font-normal text-slate-800 italic">
                      {t("aboutQuote")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MISSION & MANDATE */}
          {activeTab === "mandate" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-black text-[#111827] mb-4">{t("aboutNationalModernization")}</h2>
                <p className="text-slate-600 font-normal leading-relaxed mb-4">
                  {t("aboutNationalDesc")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                  <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                    <div className="font-black text-[#0055B8] text-sm uppercase mb-1">{t("aboutPillar1Title")}</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">{t("aboutPillar1Desc")}</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                    <div className="font-black text-[#0055B8] text-sm uppercase mb-1">{t("aboutPillar2Title")}</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">{t("aboutPillar2Desc")}</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                    <div className="font-black text-[#0055B8] text-sm uppercase mb-1">{t("aboutPillar3Title")}</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">{t("aboutPillar3Desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DATA INTEGRITY */}
          {activeTab === "integrity" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-black text-[#111827] mb-4">{t("aboutIntegrityTitle")}</h2>
                <p className="text-slate-600 font-normal leading-relaxed mb-6">
                  {t("aboutIntegrityDesc")}
                </p>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0055B8] text-white flex items-center justify-center font-bold shrink-0 text-xs">1</span>
                    <div>
                      <strong className="text-slate-900 font-black block">{t("aboutStep1Title")}</strong>
                      <span className="text-slate-600 font-normal">{t("aboutStep1Desc")}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0055B8] text-white flex items-center justify-center font-bold shrink-0 text-xs">2</span>
                    <div>
                      <strong className="text-slate-900 font-black block">{t("aboutStep2Title")}</strong>
                      <span className="text-slate-600 font-normal">{t("aboutStep2Desc")}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0055B8] text-white flex items-center justify-center font-bold shrink-0 text-xs">3</span>
                    <div>
                      <strong className="text-slate-900 font-black block">{t("aboutStep3Title")}</strong>
                      <span className="text-slate-600 font-normal">{t("aboutStep3Desc")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEADERSHIP */}
          {activeTab === "leadership" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-black text-[#111827] mb-6">{t("aboutLeadershipTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200">
                    <div className="text-base font-black text-slate-900">{t("aboutNationalOps")}</div>
                    <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider mb-2">{t("aboutCentralDesk")}</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      {t("aboutNationalOpsDesc")}
                    </p>
                  </div>
                  <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200">
                    <div className="text-base font-black text-slate-900">{t("aboutGazetteDesk")}</div>
                    <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider mb-2">{t("aboutEditorialCompliance")}</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      {t("aboutGazetteDeskDesc")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{t("aboutNeedCoordination")}</span>
                  <Link
                    href="/contact-us"
                    className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    {t("aboutContactDirectorate")}
                  </Link>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
