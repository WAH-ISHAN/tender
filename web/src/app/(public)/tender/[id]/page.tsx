"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_TENDERS } from "@/data/tenders";
import { useToast } from "@/components/ui/Toaster";
import { useLanguage } from "@/context/LanguageContext";

export default function TenderDetailPage() {
  const toast = useToast();
  const { t } = useLanguage();
  const params = useParams();
  const rawId = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";
  
  // Find tender by ID or match by ref / slug, fallback to first tender
  const tender = MOCK_TENDERS.find(
    (t) => t.id.toLowerCase() === rawId.toLowerCase() || t.ref.toLowerCase() === rawId.toLowerCase()
  ) || MOCK_TENDERS[1];

  const [activeTab, setActiveTab] = useState<"scope" | "docs" | "cida" | "inquiries">("scope");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const simulateDownload = (filename: string) => {
    setDownloadSuccess(filename);
    toast.success("Document Downloaded", `${filename} (Official Gazette PDF) downloaded successfully.`);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handleBookmarkToggle = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (nextState) {
      toast.info("Saved to Watchlist", `Notice ${tender.ref} has been added to your procurement watchlist.`);
    } else {
      toast.info("Removed from Watchlist", `Notice ${tender.ref} was removed from your watchlist.`);
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(tender.ref);
    setCopiedRef(true);
    toast.success("Reference Copied", `Tender reference "${tender.ref}" copied to clipboard.`);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Breadcrumbs */}
      <nav className="text-xs font-medium text-slate-500 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0055B8] transition-colors">{t("tenderBreadcrumbHome")}</Link>
        <span>&rsaquo;</span>
        <Link href="/" className="hover:text-[#0055B8] transition-colors">{t("tenderBreadcrumbGazettes")}</Link>
        <span>&rsaquo;</span>
        <span className="text-[#0055B8] font-bold">{tender.ref}</span>
      </nav>

      {/* Gazette Institutional Header with Dynamic Custom Category/Tender Image */}
      <div className="relative bg-[#0A1633] text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl overflow-hidden border border-slate-800">
        
        {/* Dynamic Contextual Background Image (Rule #3: Different image for every tender!) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 scale-105 transition-transform duration-1000 pointer-events-none"
          style={{
            backgroundImage: `url('${tender.heroImage || "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2000&auto=format&fit=crop"}')`,
          }}
        />
        {/* Soft Contrast Gradient Overlay for high legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-[#07132F]/85 via-[#0A1E4A]/60 to-[#07132F]/80 pointer-events-none" />

        <div className="relative z-10">
          {/* Institutional Top Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-white/15 text-xs font-semibold">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-blue-300 uppercase tracking-wider font-bold">
                {tender.contractType}
              </span>
              <span className="text-white/30">|</span>
              <span className="text-blue-200 font-bold">
                {t("tenderClosingIn")} {tender.daysLeft} {t("tenderDays")} ({tender.endDate})
              </span>
            </div>

            <div className="text-slate-300 font-mono text-[11px]">
              {t("tenderGazettePub")} <strong className="text-white font-sans">{tender.source}</strong>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-4 text-white drop-shadow-sm">
            {tender.title}
          </h1>

          {/* Sub-strip: Entity, Location, Official Ref */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-blue-100">
            <span className="text-white font-black uppercase">{tender.entity}</span>
            <span className="text-white/40">&bull;</span>
            <span>{tender.location}</span>
            <span className="text-white/40">&bull;</span>
            <span className="font-mono text-white font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20">
              {t("refLabel")} {tender.ref}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PROCUREMENT SUMMARY RAIL */}
        <aside className="lg:col-span-4 flex flex-col space-y-6 sticky top-28">
          
          {/* Key Figures Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-xs">
            <div className="font-bold uppercase tracking-wider text-slate-400 text-[11px] pb-3 mb-4 border-b border-slate-100">
              {t("tenderProcureParams")}
            </div>

            <div className="space-y-4 font-mono">
              <div>
                <span className="font-sans text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{t("tenderEstBudget")}</span>
                <span className="text-2xl font-black text-[#0055B8]">{tender.amount}</span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="font-sans text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{t("tenderBidBond")}</span>
                <span className="text-xs font-bold text-[#0F172A] font-sans">{tender.bidBond}</span>
                <span className="font-sans text-[11px] text-slate-400 block mt-0.5">{t("tenderValidity")} {tender.bidBondValidity}</span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="font-sans text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{t("tenderSubmissionDeadline")}</span>
                <span className="text-xs font-bold text-[#0055B8] font-sans">{tender.endDate} ({tender.daysLeft} {t("tenderDaysRemaining")})</span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="font-sans text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{t("tenderSealedOpening")}</span>
                <span className="text-xs font-bold text-slate-900 font-sans">{tender.openingTime}</span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="font-sans text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{t("tenderDocFee")}</span>
                <span className="text-xs font-bold text-slate-900 font-sans">{tender.docFee}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2 font-sans">
              <button 
                onClick={handleBookmarkToggle}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                  isBookmarked ? "bg-[#EFF6FF] text-[#0055B8] border-[#BFDBFE]" : "bg-[#F8FAFC] text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {isBookmarked ? t("tenderSavedWatchlist") : t("tenderSaveWatchlist")}
              </button>

              <button 
                onClick={handleCopyRef}
                className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                {copiedRef ? t("tenderRefCopied") : t("tenderCopyRef")}
              </button>
            </div>
          </div>

            {/* Contact Inquiries Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md text-xs">
            <div className="font-black uppercase tracking-wider text-[#0055B8] text-[11px] pb-3 mb-3 border-b border-slate-100">
              {t("tenderProcuringContact")}
            </div>
            <div className="font-black text-slate-900 text-sm mb-1">{tender.contactPerson}</div>
            <div className="text-slate-500 font-normal mb-3">{tender.entity}</div>
            <div className="space-y-1.5 text-slate-700 font-normal">
              <div>{t("tenderTelephone")} <strong className="text-slate-900 font-bold">{tender.contactPhone}</strong></div>
              <div>{t("tenderOfficialEmail")} <strong className="text-[#0055B8] font-bold">{tender.contactEmail}</strong></div>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: INSTITUTIONAL DOSSIER TABS */}
        <main className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg">
          
          {/* Clean Corporate Tabs (No AI Emojis) */}
          <div className="flex border-b border-slate-200 mb-6 overflow-x-auto text-xs font-black gap-2">
            <button
              onClick={() => setActiveTab("scope")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap rounded-t-lg cursor-pointer ${
                activeTab === "scope" ? "text-[#0055B8] border-b-2 border-[#0055B8] bg-blue-50/40" : "text-slate-500 hover:text-black font-bold"
              }`}
            >
              {t("tenderTabScope")}
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap rounded-t-lg cursor-pointer ${
                activeTab === "docs" ? "text-[#0055B8] border-b-2 border-[#0055B8] bg-blue-50/40" : "text-slate-500 hover:text-black font-bold"
              }`}
            >
              {t("tenderTabDocs")} ({tender.documentsList.length})
            </button>
            <button
              onClick={() => setActiveTab("cida")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap rounded-t-lg cursor-pointer ${
                activeTab === "cida" ? "text-[#0055B8] border-b-2 border-[#0055B8] bg-blue-50/40" : "text-slate-500 hover:text-black font-bold"
              }`}
            >
              {t("tenderTabCida")}
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-3 px-4 transition-colors uppercase tracking-wider whitespace-nowrap rounded-t-lg cursor-pointer ${
                activeTab === "inquiries" ? "text-[#0055B8] border-b-2 border-[#0055B8] bg-blue-50/40" : "text-slate-500 hover:text-black font-bold"
              }`}
            >
              {t("tenderTabInquiries")}
            </button>
          </div>

          {/* TAB 1: SCOPE */}
          {activeTab === "scope" && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <div>
                <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider mb-2">
                  {t("tenderScopeWorkDesc")}
                </h3>
                <p className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                  {tender.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider mb-2">
                  {t("tenderKeyTechnical")}
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                  {tender.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="p-3.5 flex items-start gap-2.5 font-normal">
                      <span className="text-[#0055B8] font-black">&bull;</span>
                      <span className="text-slate-700 font-normal">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                <div>
                  <span className="font-extrabold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">{t("tenderContractPeriod")}</span>
                  <span className="text-slate-900 font-black text-sm">{tender.deliveryPeriod}</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">{t("tenderPaymentTerms")}</span>
                  <span className="text-slate-900 font-black text-sm">{tender.paymentTerms}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTS */}
          {activeTab === "docs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {t("tenderOfficialFiles")}
                </h3>
                <span className="text-xs text-slate-600 font-semibold">
                  {t("tenderOfficialMirror")}
                </span>
              </div>

              {downloadSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold">
                  {t("tenderDownloadInitiated")} {downloadSuccess}.
                </div>
              )}

              <div className="space-y-3">
                {tender.documentsList.map((doc, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] border border-slate-200 hover:border-[#0055B8] p-4 rounded-xl flex items-center justify-between gap-4 transition-colors">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0 text-slate-700">
                        {doc.type}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#0F172A] mb-0.5">{doc.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          <span>{doc.size}</span> &bull; <span>SHA-256: {doc.hash.slice(0, 20)}...</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => simulateDownload(doc.name)}
                      className="bg-white hover:bg-[#0055B8] hover:text-white border border-slate-300 text-[#0055B8] font-bold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap uppercase tracking-wider cursor-pointer"
                    >
                      {t("tenderDownloadFile")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CIDA & ELIGIBILITY */}
          {activeTab === "cida" && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 space-y-4">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                    {t("tenderCidaGrade")}
                  </span>
                  <div className="text-base font-bold text-[#0055B8]">
                    {tender.cidaGrade}
                  </div>
                  <p className="text-slate-600 mt-1">
                    {t("tenderCidaGradeDesc")}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                    {t("tenderBidSecurityReq")}
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {tender.bidBond}
                  </div>
                  <div className="text-slate-500 mt-1">
                    {t("tenderGuaranteeValidity")} {tender.bidBondValidity}.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUBMISSION & INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 space-y-4">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                    {t("tenderSubmissionAddress")}
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {tender.submissionAddress}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                    {t("tenderPreBidMeeting")}
                  </span>
                  <div className="text-xs font-bold text-[#0055B8]">
                    {tender.preBidMeeting}
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
