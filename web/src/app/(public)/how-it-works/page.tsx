"use client";
import { useState } from "react";
import Link from "next/link";

type ProcessTab = "overview" | "sourcing" | "indexing" | "documents";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<ProcessTab>("overview");

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Mobile & Tablet Horizontal Subnav Tabs (Rule #8 Interactive Navigation) */}
        <div className="lg:hidden col-span-1 flex overflow-x-auto custom-scrollbar gap-2 p-1.5 bg-[#F1F3F7] rounded-2xl border border-slate-200 mb-6">
          {[
            { id: "overview", label: "Process Overview" },
            { id: "sourcing", label: "Daily Sourcing" },
            { id: "indexing", label: "Indexing & Tags" },
            { id: "documents", label: "Bidding Documents" },
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
            {activeTab === "overview" ? "[Process Overview]" : "Process Overview"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sourcing")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "sourcing" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "sourcing" ? "[Daily Sourcing]" : "Daily Sourcing"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("indexing")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "indexing" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "indexing" ? "[Indexing & Tags]" : "Indexing & Tags"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("documents")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "documents" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "documents" ? "[Bidding Documents]" : "Bidding Documents"}
          </button>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          
          {/* Dynamic Header according to active tab */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-[#111827] uppercase leading-none mb-6">
            {activeTab === "overview" && "WHAT WE DO & HOW IT WORKS"}
            {activeTab === "sourcing" && "DAILY PROCUREMENT SOURCING"}
            {activeTab === "indexing" && "INDEXING & CLASSIFICATION"}
            {activeTab === "documents" && "OFFICIAL BIDDING VAULT"}
          </h1>

          <p className="text-lg text-[#6B7280] max-w-3xl mb-12 font-normal leading-relaxed">
            {activeTab === "overview" &&
              "A transparent 3-stage intelligence pipeline that gathers procurement notices from across Sri Lanka and transforms them into structured, actionable opportunities."}
            {activeTab === "sourcing" &&
              "Continuous morning ingestion from the Department of Government Printing, 14 national newspapers, provincial councils, and corporate boards."}
            {activeTab === "indexing" &&
              "Standardized tagging conforming to CIDA contractor requirements, accurate LKR budget bands, submission cutoff times, and bid security terms."}
            {activeTab === "documents" &&
              "Direct download repository for authentic procurement documents, verified BOQs, technical drawings, and official gazette addenda."}
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
                    Multi-Source Aggregation
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Every morning at 05:00 AM, our pipeline ingests government gazettes, 14 national newspapers, provincial council notices, and private corporate RFP publications.
                  </p>
                </div>
                <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider pt-6 border-t border-slate-200">
                  Stage 1 &mdash; Data Collection
                </div>
              </div>

              {/* Step 2 (Highlighted Royal Blue Card) */}
              <div className="bg-[#0055B8] text-white p-8 rounded-2xl flex flex-col justify-between min-h-[300px] shadow-xl hover:shadow-2xl transition-all">
                <div>
                  <div className="font-display text-6xl font-black text-white opacity-40 mb-4">
                    02
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    Editorial Classification
                  </h3>
                  <p className="text-sm text-blue-100 font-normal leading-relaxed">
                    Every notice is indexed with standard classification codes, budget limits in LKR, submission deadlines, bid bond criteria, and exact department addresses.
                  </p>
                </div>
                <div className="text-xs font-bold text-blue-200 uppercase tracking-wider pt-6 border-t border-blue-400/30 flex items-center justify-between">
                  <span>Stage 2 &mdash; Verification</span>
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
                    Instant Bidding Alerts
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Suppliers receive real-time email alerts matching their category and province, with downloadable tender PDFs and complete submission instructions.
                  </p>
                </div>
                <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider pt-6 border-t border-slate-200">
                  Stage 3 &mdash; Delivery
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DAILY SOURCING */}
          {activeTab === "sourcing" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 animate-fadeIn">
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">Source Layer 01</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">Official Government Gazette Mirror</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  Direct extraction from the Democratic Socialist Republic of Sri Lanka weekly and extraordinary gazettes, covering all national ministry procurements.
                </p>
              </div>
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">Source Layer 02</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">14 National Daily Newspapers</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  Complete trilingual coverage across Daily News, Dinamina, Thinakaran, Sunday Observer, Silumina, Sunday Times, Daily FT, and regional publications.
                </p>
              </div>
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">Source Layer 03</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">9 Provincial Council Secretariats</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  Western, Central, Southern, Northern, Eastern, North Western, North Central, Uva, and Sabaragamuwa provincial tender notices.
                </p>
              </div>
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <div className="font-black text-[#0055B8] text-xs uppercase tracking-wider mb-2">Source Layer 04</div>
                <h3 className="text-lg font-black text-[#0F172A] mb-3">State Banks &amp; Parate Auctions</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  Real estate, machinery, vehicle, and commercial parate execution notices from BOC, People&apos;s Bank, and leading financial institutions.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: INDEXING & TAGS */}
          {activeTab === "indexing" && (
            <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm mb-16 animate-fadeIn">
              <h2 className="text-2xl font-black text-[#0F172A] mb-4">Standardized Taxonomy &amp; Meta Extraction</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Every procurement announcement is structured into standard fields so bidders never miss critical qualifications:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">CIDA REQUIREMENTS</span>
                  <span className="text-xs font-bold text-slate-900">Grading &amp; Speciality C1 to C9</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">BID SECURITY BOND</span>
                  <span className="text-xs font-bold text-slate-900">Exact LKR Guarantee &amp; Validity</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">SUBMISSION DEADLINE</span>
                  <span className="text-xs font-bold text-slate-900">Countdown, Date &amp; Cutoff Hour</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-[#0055B8] block mb-1">DOCUMENT FEE</span>
                  <span className="text-xs font-bold text-slate-900">Non-Refundable Purchase Cost</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BIDDING DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm mb-16 animate-fadeIn">
              <h2 className="text-2xl font-black text-[#0F172A] mb-4">Official Document Repository</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Directly access authorized PDF tenders, Bills of Quantities (BOQ), and addenda issued by procuring entities:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">1. Clean Unwatermarked Official Notice Files</span>
                  <span className="text-[#0055B8] font-bold text-xs">PDF 300 DPI</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">2. Pre-Bid Meeting Schedule &amp; Clarifications</span>
                  <span className="text-[#0055B8] font-bold text-xs">Verified Bulletin</span>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">3. Tender Submission Location &amp; Sealed Box Guidelines</span>
                  <span className="text-[#0055B8] font-bold text-xs">Official Protocol</span>
                </div>
              </div>
            </div>
          )}

          {/* CTA Box (Preserved Exact Design with Rounded Elevation) */}
          <div className="bg-[#F8FAFC] border border-slate-200/90 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-2">Ready to explore active tenders?</h3>
              <p className="text-slate-600 text-sm font-normal">Browse 366 live procurement procedures updated today across Sri Lanka.</p>
            </div>
            <Link
              href="/"
              className="bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 shadow-md whitespace-nowrap uppercase tracking-wider"
            >
              Explore Tenders &amp; Purchases
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
