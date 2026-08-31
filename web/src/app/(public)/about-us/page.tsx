"use client";
import { useState } from "react";
import Link from "next/link";

type AboutTab = "overview" | "mandate" | "integrity" | "leadership";

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>("overview");

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Subnav (Interactive Functional Navigation) */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4 pt-4 text-[13px]">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "overview" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "overview" ? "[Company Overview]" : "Company Overview"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mandate")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "mandate" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "mandate" ? "[Mission & Mandate]" : "Mission & Mandate"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("integrity")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "integrity" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "integrity" ? "[Data Integrity]" : "Data Integrity"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("leadership")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "leadership" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "leadership" ? "[Leadership]" : "Leadership"}
          </button>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          
          {/* Dynamic Header according to active tab */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#111827] uppercase leading-none mb-6">
            {activeTab === "overview" && "ABOUT TENDERHUB"}
            {activeTab === "mandate" && "MISSION & MANDATE"}
            {activeTab === "integrity" && "DATA INTEGRITY & SECURITY"}
            {activeTab === "leadership" && "EXECUTIVE GOVERNANCE"}
          </h1>

          <p className="text-lg text-[#6B7280] max-w-3xl mb-12 font-normal leading-relaxed">
            {activeTab === "overview" &&
              "Sri Lanka's centralized commercial and state procurement gateway. We aggregate, verify, and deliver high-value tender opportunities across all 9 provinces with industrial accuracy."}
            {activeTab === "mandate" &&
              "Standardizing public and private sector bidding across Sri Lanka through transparent, real-time national gazette aggregation and verified RFP indexing."}
            {activeTab === "integrity" &&
              "Every notice undergoes multi-stage verification across Sinhala, Tamil, and English publications with SHA-256 cryptographic document validation."}
            {activeTab === "leadership" &&
              "Directed by senior procurement intelligence specialists, legal compliance officers, and enterprise software architects based at World Trade Centre, Colombo."}
          </p>

          {/* TAB 1: COMPANY OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fadeIn">
              {/* Metric Badges Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                <div className="bg-[#F8FAFC] border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">39,900+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-extrabold mt-1">Tenders Published</div>
                </div>
                <div className="bg-[#0055B8] text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-white">100%</div>
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-extrabold mt-1">Verified Gazettes</div>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">9</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-extrabold mt-1">Provinces Covered</div>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">3,200+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-extrabold mt-1">Registered Suppliers</div>
                </div>
              </div>

              {/* Editorial Story Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-200 pt-12">
                <div>
                  <h2 className="text-2xl font-black text-[#111827] mb-4">Our Institutional Mandate</h2>
                  <p className="text-slate-600 font-normal leading-relaxed mb-4">
                    For over a decade, tracking government procurement and corporate invitations required scouring disparate print gazettes, departmental bulletins, and provincial newspapers.
                  </p>
                  <p className="text-slate-600 font-normal leading-relaxed">
                    TenderHub standardizes the entire national procurement pipeline into a clean, searchable index. Every notice is cross-checked against official procurement reference numbers before release.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-[#111827] mb-4">Verification &amp; Accuracy</h2>
                  <p className="text-slate-600 font-normal leading-relaxed mb-4">
                    Our editorial desk processes gazettes daily across Sinhala, Tamil, and English publications. We extract critical bidding criteria, bid bonds, and submission deadlines so suppliers bid with confidence.
                  </p>
                  <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/90 border-l-4 border-l-[#0055B8] shadow-sm">
                    <p className="text-sm font-normal text-slate-800 italic">
                      &quot;Empowering Sri Lankan enterprises with transparent, immediate access to public and private sector projects.&quot;
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
                <h2 className="text-2xl font-black text-[#111827] mb-4">National Procurement Modernization</h2>
                <p className="text-slate-600 font-normal leading-relaxed mb-4">
                  TenderHub acts as the bridge connecting public sector procurement authorities with competitive, qualified domestic and international contractors. Our mandate focuses on three core pillars:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                  <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                    <div className="font-black text-[#0055B8] text-sm uppercase mb-1">1. Full Transparency</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">Unbiased, direct publication of official state procurement without gatekeeping.</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                    <div className="font-black text-[#0055B8] text-sm uppercase mb-1">2. CIDA Alignment</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">Standardized classification conforming to CIDA contractor grading and criteria.</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                    <div className="font-black text-[#0055B8] text-sm uppercase mb-1">3. Trilingual Reach</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">Equal accessibility across Sinhala, Tamil, and English procurement sectors.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DATA INTEGRITY */}
          {activeTab === "integrity" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-black text-[#111827] mb-4">Multi-Stage Gazette Ingestion &amp; Verification</h2>
                <p className="text-slate-600 font-normal leading-relaxed mb-6">
                  Every tender published on TenderHub undergoes a rigorous 4-step quality assurance workflow to ensure 100% legal reliability:
                </p>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0055B8] text-white flex items-center justify-center font-bold shrink-0 text-xs">1</span>
                    <div>
                      <strong className="text-slate-900 font-black block">Original Source Mirroring</strong>
                      <span className="text-slate-600 font-normal">Direct capture from Department of Government Printing gazettes, state ministries, and municipal authorities.</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0055B8] text-white flex items-center justify-center font-bold shrink-0 text-xs">2</span>
                    <div>
                      <strong className="text-slate-900 font-black block">Reference Number &amp; Budget Validation</strong>
                      <span className="text-slate-600 font-normal">Procurement officers cross-verify contract codes, bid bond amounts, and submission cutoff hours.</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0055B8] text-white flex items-center justify-center font-bold shrink-0 text-xs">3</span>
                    <div>
                      <strong className="text-slate-900 font-black block">Cryptographic File Integrity</strong>
                      <span className="text-slate-600 font-normal">Official BOQ, RFP, and bidding documents are stored with SHA-256 checksums to prevent tampering.</span>
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
                <h2 className="text-2xl font-black text-[#111827] mb-6">Operations &amp; Editorial Directorate</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200">
                    <div className="text-base font-black text-slate-900">National Procurement Operations</div>
                    <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider mb-2">Central Desk · Colombo 01</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      Oversees day-to-day data intake, ministry communication, and bidder support across all nine provinces.
                    </p>
                  </div>
                  <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200">
                    <div className="text-base font-black text-slate-900">Gazette Verification Desk</div>
                    <div className="text-xs font-bold text-[#0055B8] uppercase tracking-wider mb-2">Editorial Compliance · Sri Lanka</div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      Specialized trilingual editorial team responsible for extracting technical criteria and legal tender parameters.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Need institutional coordination?</span>
                  <Link
                    href="/contact-us"
                    className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    Contact Directorate &rarr;
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
