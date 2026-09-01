"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type ProcessTab = "overview" | "sourcing" | "indexing" | "documents";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<ProcessTab>("overview");
  const { t } = useLanguage();

  return (
    <div className="max-w-[1680px] 2xl:max-w-[1760px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 2xl:px-10 py-6 xs:py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 lg:gap-12 items-start">
        
        {/* Mobile & Tablet Horizontal Subnav Tabs (Rule #8 Interactive Navigation) */}
        <div className="lg:hidden col-span-1 flex overflow-x-auto custom-scrollbar gap-2 p-1.5 bg-[#F1F3F7] rounded-2xl border border-slate-200 mb-6">
          {[
            { id: "overview", label: t("howTabOverview") },
            { id: "sourcing", label: t("howTabSourcing") },
            { id: "indexing", label: t("howTabIndexing") },
            { id: "documents", label: t("howTabDocuments") },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ProcessTab)}
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
            {activeTab === "overview" ? `[${t("howTabOverview")}]` : t("howTabOverview")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sourcing")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "sourcing" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "sourcing" ? `[${t("howTabSourcing")}]` : t("howTabSourcing")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("indexing")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "indexing" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "indexing" ? `[${t("howTabIndexing")}]` : t("howTabIndexing")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("documents")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "documents" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "documents" ? `[${t("howTabDocuments")}]` : t("howTabDocuments")}
          </button>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          
          {/* Dynamic Header according to active tab - Responsive */}
          <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111827] uppercase leading-none mb-4 xs:mb-6 break-words">
            {activeTab === "overview" && t("howTitleOverview")}
            {activeTab === "sourcing" && t("howTitleSourcing")}
            {activeTab === "indexing" && t("howTitleIndexing")}
            {activeTab === "documents" && t("howTitleDocuments")}
          </h1>

          <p className="text-base xs:text-lg text-[#6B7280] max-w-3xl mb-8 xs:mb-10 sm:mb-12 font-normal leading-relaxed">
            {activeTab === "overview" && t("howDescOverview")}
            {activeTab === "sourcing" && t("howDescSourcing")}
            {activeTab === "indexing" && t("howDescIndexing")}
            {activeTab === "documents" && t("howDescDocuments")}
          </p>

          {/* TAB 1: PROCESS OVERVIEW (Exact 3 Cards Layout from Screenshot) */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fadeIn">
              
              {/* Step 1 */}
              <div className="bg-[#F8FAFC] border border-slate-200/90 p-8 rounded-2xl flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-all">
                <div>
                  <div className="font-display text-6xl font-black text-[#0055B8] opacity-40 mb-4">
                    01
                  </div>
                  <h3 className="text-xl font-black text-[#0F172A] mb-3">
                    {t("howStep1Title")}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    {t("howStep1Desc")}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider pt-6 border-t border-slate-200">
                  {t("howStage1Label")}
                </div>
              </div>

              {/* Step 2 (Highlighted Royal Blue Card) */}
              <div className="bg-[#0055B8] text-white p-8 rounded-2xl flex flex-col justify-between min-h-[300px] shadow-xl hover:shadow-2xl transition-all">
                <div>
                  <div className="font-display text-6xl font-black text-white opacity-40 mb-4">
                    02
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    {t("howStep2Title")}
                  </h3>
                  <p className="text-sm text-blue-100 font-normal leading-relaxed">
                    {t("howStep2Desc")}
                  </p>
                </div>
                <div className="text-xs font-bold text-blue-200 uppercase tracking-wider pt-6 border-t border-blue-400/30 flex items-center justify-between">
                  <span>{t("howStage2Label")}</span>
                  <span className="text-xl">&rarr;</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#F8FAFC] border border-slate-200/90 p-8 rounded-2xl flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-all">
                <div>
                  <div className="font-display text-6xl font-black text-[#0055B8] opacity-40 mb-4">
                    03
                  </div>
                  <h3 className="text-xl font-black text-[#0F172A] mb-3">
                    {t("howStep3Title")}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    {t("howStep3Desc")}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider pt-6 border-t border-slate-200">
                  {t("howStage3Label")}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DAILY SOURCING */}
          {activeTab === "sourcing" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 animate-fadeIn">
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">{t("howSourceLayer1")}</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">{t("howSourceGazetteTitle")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t("howSourceGazetteDesc")}
                </p>
              </div>
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">{t("howSourceLayer2")}</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">{t("howSourceNewspapersTitle")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t("howSourceNewspapersDesc")}
                </p>
              </div>
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">{t("howSourceLayer3")}</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">{t("howSourceProvincialTitle")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t("howSourceProvincialDesc")}
                </p>
              </div>
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">{t("howSourceLayer4")}</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">{t("howSourceBanksTitle")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t("howSourceBanksDesc")}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: INDEXING & TAGS */}
          {activeTab === "indexing" && (
            <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm mb-16 animate-fadeIn">
              <h2 className="text-2xl font-black text-[#0F172A] mb-4">{t("howTaxonomyTitle")}</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                {t("howTaxonomyDesc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">{t("howCidaReq")}</span>
                  <span className="text-xs font-bold text-slate-900">{t("howCidaGrade")}</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">{t("howBidBondLabel")}</span>
                  <span className="text-xs font-bold text-slate-900">{t("howBidBondDesc")}</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">{t("howDeadlineLabel")}</span>
                  <span className="text-xs font-bold text-slate-900">{t("howDeadlineDesc")}</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">{t("howDocFeeLabel")}</span>
                  <span className="text-xs font-bold text-slate-900">{t("howDocFeeDesc")}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BIDDING DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm mb-16 animate-fadeIn">
              <h2 className="text-2xl font-black text-[#0F172A] mb-4">{t("howRepoTitle")}</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                {t("howRepoDesc")}
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">{t("howRepoItem1")}</span>
                  <span className="text-[#0055B8] font-bold text-xs">{t("howRepoItem1Badge")}</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">{t("howRepoItem2")}</span>
                  <span className="text-[#0055B8] font-bold text-xs">{t("howRepoItem2Badge")}</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">{t("howRepoItem3")}</span>
                  <span className="text-[#0055B8] font-bold text-xs">{t("howRepoItem3Badge")}</span>
                </div>
              </div>
            </div>
          )}

          {/* CTA Box (Preserved Exact Design with Rounded Elevation) */}
          <div className="bg-[#F8FAFC] border border-slate-200/90 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-2">{t("howCtaTitle")}</h3>
              <p className="text-slate-600 text-sm font-normal">{t("howCtaDesc")}</p>
            </div>
            <Link
              href="/"
              className="bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 shadow-md whitespace-nowrap uppercase tracking-wider"
            >
              {t("howCtaBtn")}
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
