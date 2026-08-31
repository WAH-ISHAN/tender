"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TenderDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"scope" | "docs" | "cida" | "inquiries">("scope");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const simulateDownload = (filename: string) => {
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Breadcrumbs */}
      <nav className="text-xs font-medium text-gray-500 mb-5 flex items-center gap-1.5" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0055B8]">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/" className="hover:text-[#0055B8]">Procurement Gazettes</Link>
        <span>&rsaquo;</span>
        <span className="text-[#0055B8] font-bold">MOE/2026/SP-01</span>
      </nav>

      {/* Gazette Official Header Card */}
      <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#0055B8] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                National Competitive Bidding (NCB)
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-md border border-emerald-500/30">
                ⏳ 10 Days Remaining
              </span>
            </div>
            <div className="font-mono text-xs text-gray-300">
              GAZETTE ISSUE NO: <strong>2,426 (Weekly Issue)</strong>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-snug mb-3">
            Supply, Delivery and Installation of Solar Power Infrastructure for Rural Schools
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 font-medium">
            <span className="text-blue-400 font-bold">Ministry of Education</span>
            <span>·</span>
            <span>Isurupaya, Battaramulla (Western Province)</span>
            <span>·</span>
            <span className="font-mono">Ref: MOE/2026/SP-01</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CRITICAL PROCUREMENT METRIC RAIL */}
        <aside className="lg:col-span-4 flex flex-col gap-5 sticky top-28">
          
          {/* Key Figures Card */}
          <div className="bg-[#F8F9FB] border-2 border-[#E2E6ED] rounded-xl p-6 shadow-xs font-mono text-xs">
            <span className="font-sans text-xs font-extrabold uppercase tracking-wider text-gray-500 block mb-3">
              PROCUREMENT SUMMARY
            </span>

            <div className="space-y-4">
              <div>
                <span className="font-sans text-[10px] uppercase font-bold text-gray-500 block">ESTIMATED BUDGET</span>
                <span className="text-2xl font-black text-[#0055B8]">LKR 17,000,000</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className="font-sans text-[10px] uppercase font-bold text-gray-500 block">REQUIRED BID SECURITY BOND</span>
                <span className="text-sm font-bold text-gray-900">LKR 200,000</span>
                <span className="font-sans text-[11px] text-gray-500 block">Validity: 120 Days from Closing</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className="font-sans text-[10px] uppercase font-bold text-gray-500 block">SUBMISSION DEADLINE</span>
                <span className="text-sm font-bold text-red-600">12 October 2026 at 14:00 hrs</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className="font-sans text-[10px] uppercase font-bold text-gray-500 block">BID OPENING TIME</span>
                <span className="text-xs font-bold text-emerald-800">12 October 2026 at 14:30 hrs</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className="font-sans text-[10px] uppercase font-bold text-gray-500 block">DOCUMENT PURCHASE FEE</span>
                <span className="text-xs font-bold text-gray-900">LKR 5,000 (Non-refundable)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col gap-2">
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors border ${
                  isBookmarked ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {isBookmarked ? "★ Saved to Watchlist" : "☆ Save to Watchlist"}
              </button>
            </div>
          </div>

          {/* Quick Action Contact Card */}
          <div className="bg-white border-2 border-[#0055B8]/30 rounded-xl p-5 shadow-xs text-xs">
            <span className="font-extrabold uppercase tracking-wider text-[#0055B8] text-[11px] block mb-2">
              PROCURING ENTITY INQUIRIES
            </span>
            <div className="font-bold text-gray-900 mb-1">Eng. K. D. M. Perera</div>
            <div className="text-gray-600 mb-3">Deputy Director (Procurement &amp; Infrastructure)</div>
            <div className="space-y-1.5 text-gray-700">
              <div>Phone: <strong>+94 11 278 5141</strong></div>
              <div>Email: <strong className="text-[#0055B8]">procurement@moe.gov.lk</strong></div>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: TABBED DOSSIER */}
        <main className="lg:col-span-8 bg-white border-2 border-[#E2E6ED] rounded-xl p-6 sm:p-8 shadow-xs">
          
          {/* Dossier Tabs */}
          <div className="flex border-b border-[#E2E6ED] mb-6 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab("scope")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap ${
                activeTab === "scope" ? "text-[#0055B8] border-b-2 border-[#0055B8]" : "text-gray-500 hover:text-black"
              }`}
            >
              📋 Scope &amp; Specifications
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap ${
                activeTab === "docs" ? "text-[#0055B8] border-b-2 border-[#0055B8]" : "text-gray-500 hover:text-black"
              }`}
            >
              📄 Bidding Documents &amp; BOQ (4)
            </button>
            <button
              onClick={() => setActiveTab("cida")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap ${
                activeTab === "cida" ? "text-[#0055B8] border-b-2 border-[#0055B8]" : "text-gray-500 hover:text-black"
              }`}
            >
              🏛️ CIDA &amp; Eligibility
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap ${
                activeTab === "inquiries" ? "text-[#0055B8] border-b-2 border-[#0055B8]" : "text-gray-500 hover:text-black"
              }`}
            >
              📞 Submission Guidelines
            </button>
          </div>

          {/* TAB 1: SCOPE */}
          {activeTab === "scope" && (
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] uppercase mb-2">
                  1. Comprehensive Project Scope
                </h3>
                <p className="bg-[#F8F9FB] p-5 rounded-xl border border-[#E2E6ED] text-xs sm:text-sm">
                  The Ministry of Education invites sealed bids from eligible contractors for the turnkey engineering, supply, testing, and commissioning of rooftop on-grid solar photovoltaic systems with hybrid battery storage across 50 secondary schools in Western Province. The contractor is responsible for civil structural assessments, mounting hardware, electrical cabling, grid synchronization approvals with CEB/LECO, and 24-month warranty support.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#0F172A] uppercase mb-2">
                  2. Technical Parameters &amp; Bill of Materials
                </h3>
                <div className="bg-white border border-[#E2E6ED] rounded-xl divide-y divide-gray-100 text-xs">
                  <div className="p-3.5 flex items-start gap-2">
                    <span className="text-[#0055B8] font-bold">✓</span>
                    <span><strong>Solar Modules:</strong> Tier 1 Mono-crystalline PERC 550W+ with IEC 61215/61730 certifications.</span>
                  </div>
                  <div className="p-3.5 flex items-start gap-2">
                    <span className="text-[#0055B8] font-bold">✓</span>
                    <span><strong>Inverter Units:</strong> 3-Phase Grid-tied hybrid inverters with minimum 98.5% European efficiency and integrated MPPT.</span>
                  </div>
                  <div className="p-3.5 flex items-start gap-2">
                    <span className="text-[#0055B8] font-bold">✓</span>
                    <span><strong>Energy Storage:</strong> Lithium Iron Phosphate (LiFePO4) modular battery systems with 6,000+ cycle warranty.</span>
                  </div>
                  <div className="p-3.5 flex items-start gap-2">
                    <span className="text-[#0055B8] font-bold">✓</span>
                    <span><strong>Mounting Frame:</strong> High-tensile anodized aluminum / hot-dip galvanized steel rated for 140 km/h wind load.</span>
                  </div>
                  <div className="p-3.5 flex items-start gap-2">
                    <span className="text-[#0055B8] font-bold">✓</span>
                    <span><strong>IoT Telemetry:</strong> Cloud-connected real-time generation monitoring dashboard with automatic fault alerting.</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-blue-50/70 p-4 rounded-xl border border-blue-200">
                <div>
                  <span className="font-bold text-[#0055B8] block mb-1">Execution Schedule:</span>
                  <span className="text-gray-900 font-semibold">90 Calendar Days from Letter of Acceptance</span>
                </div>
                <div>
                  <span className="font-bold text-[#0055B8] block mb-1">Payment Schedule:</span>
                  <span className="text-gray-900 font-semibold">20% Mobilization, 70% Progress Milestones, 10% 12-Month Retention</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTS */}
          {activeTab === "docs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0F172A] uppercase">
                  Official Bidding Dossier (SHA-256 Verified)
                </h3>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Direct Government Mirror
                </span>
              </div>

              {downloadSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-lg font-bold">
                  ✓ Download started for <strong>{downloadSuccess}</strong>.
                </div>
              )}

              <div className="space-y-3">
                {[
                  { name: "Section I — Instructions to Bidders & Bidding Data Sheet (ITB)", size: "1.4 MB", type: "PDF", hash: "e3b0c442...855" },
                  { name: "Section II — Schedule of Requirements & Technical Specifications", size: "2.8 MB", type: "PDF", hash: "8f4a1c02...102" },
                  { name: "Section III — Priced Bill of Quantities (BOQ Form Template)", size: "840 KB", type: "XLSX", hash: "a7c29e11...243" },
                  { name: "Section IV — Standard Bid Security & Bank Guarantee Format", size: "420 KB", type: "PDF", hash: "09f83b16...069" },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-[#F8F9FB] border border-[#E2E6ED] hover:border-[#0055B8] p-4 rounded-xl flex items-center justify-between gap-4 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        doc.type === "PDF" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {doc.type}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#0F172A] mb-0.5">{doc.name}</div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          <span>{doc.size}</span> · <span>SHA-256: {doc.hash}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => simulateDownload(doc.name)}
                      className="bg-white hover:bg-[#0055B8] hover:text-white border border-[#D9DFE7] text-[#0055B8] font-bold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-2xs uppercase tracking-wider"
                    >
                      Download ↓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CIDA & ELIGIBILITY */}
          {activeTab === "cida" && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#F8F9FB] p-5 rounded-xl border border-[#E2E6ED] space-y-4">
                <div>
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px] block mb-1">
                    CONTRACTOR CIDA REGISTRATION GRADE
                  </span>
                  <div className="text-base font-black text-[#0055B8]">
                    CIDA Grade C4 or above / EM-02 in Renewable Energy Systems
                  </div>
                  <p className="text-gray-600 mt-1">
                    Contractor must provide a copy of valid CIDA registration certificate valid for year 2026.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px] block mb-1">
                    BID SECURITY GUARANTEE
                  </span>
                  <div className="text-sm font-bold text-gray-900">
                    LKR 200,000 from an accredited Commercial Bank approved by Central Bank of Sri Lanka (CBSL).
                  </div>
                  <div className="text-gray-600 mt-1">
                    Insurance bonds are not accepted. Validity must extend 120 days beyond bid closing.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUBMISSION & INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#F8F9FB] p-5 rounded-xl border border-[#E2E6ED] space-y-4">
                <div>
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px] block mb-1">
                    PHYSICAL TENDER BOX ADDRESS
                  </span>
                  <div className="text-sm font-bold text-gray-900">
                    Procurement Division, 3rd Floor, Ministry of Education, Isurupaya, Battaramulla
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px] block mb-1">
                    PRE-BID CLARIFICATIONS CONFERENCE
                  </span>
                  <div className="text-xs font-bold text-[#0055B8]">
                    20 September 2026 at 10:30 AM (Auditorium, Isurupaya &amp; Online Zoom)
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
