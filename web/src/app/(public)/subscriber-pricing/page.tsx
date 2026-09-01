"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toaster";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingPage() {
  const toast = useToast();
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"annual" | "quarterly">("annual");
  const [showBankClaim, setShowBankClaim] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const PLANS = [
    t("pricingPlanAnnual"),
    t("pricingPlanQuarterly"),
  ];

  const CHANNELS = [
    "WhatsApp (+94 77 388 7615)",
    "Email Slip (billing@tenderhub.lk)",
  ];

  // Modern Dropdowns State in Modal
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedPlan = PLANS[selectedPlanIndex];
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);

  const [bankTransferredFrom, setBankTransferredFrom] = useState("");
  const [slipReference, setSlipReference] = useState("");

  const [confirmChannel, setConfirmChannel] = useState(CHANNELS[0]);
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const channelRef = useRef<HTMLDivElement>(null);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankTransferredFrom.trim() || bankTransferredFrom.trim().length < 2) {
      toast.error("Validation Required", "Please specify the bank name you transferred from.");
      return;
    }
    if (!slipReference.trim() || slipReference.trim().length < 4) {
      toast.error("Validation Required", "Please enter a valid bank slip reference / TXN ID (minimum 4 characters).");
      return;
    }
    setClaimSubmitted(true);
    toast.success(
      "Claim Registered",
      `Bank transfer slip ${slipReference} has been queued for verification.`
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (planRef.current && !planRef.current.contains(e.target as Node)) {
        setIsPlanOpen(false);
      }
      if (channelRef.current && !channelRef.current.contains(e.target as Node)) {
        setIsChannelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-[1680px] 2xl:max-w-[1760px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 2xl:px-10 py-6 xs:py-8 sm:py-10">
      
      {/* Header - Responsive 320px -> 1920px+ */}
      <header className="mb-8 xs:mb-10 text-center max-w-3xl mx-auto px-2 xs:px-0">
        <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] uppercase tracking-tight mb-3 leading-tight break-words">
          {t("pricingTitle")}
        </h1>
        <p className="text-xs xs:text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
          {t("pricingSubtitle")}
        </p>

        {/* Term Toggle Pills (§ 16) */}
        <div className="inline-flex p-1 bg-[#F1F3F7] rounded-xl border border-[#E2E6ED] mt-6">
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 text-xs font-extrabold rounded-lg transition-all uppercase tracking-wider cursor-pointer ${
              billingCycle === "annual" ? "bg-[#0055B8] text-white shadow-xs" : "text-gray-600 hover:text-black"
            }`}
          >
            {t("pricingAnnualBtn")}
          </button>
          <button
            onClick={() => setBillingCycle("quarterly")}
            className={`px-5 py-2 text-xs font-extrabold rounded-lg transition-all uppercase tracking-wider cursor-pointer ${
              billingCycle === "quarterly" ? "bg-[#0055B8] text-white shadow-xs" : "text-gray-600 hover:text-black"
            }`}
          >
            {t("pricingQuarterlyBtn")}
          </button>
        </div>
      </header>

      {/* 4 Plan Cards Matrix (§ 08) - Responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 mb-10 xs:mb-12 sm:mb-16 items-stretch">
        
        {/* 1. Free Guest / Tier */}
        <div className="bg-[#F8FAFC] p-6 rounded-2xl flex flex-col justify-between border-2 border-slate-200 shadow-sm">
          <div>
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1">{t("pricingNewBidder")}</div>
            <h3 className="text-xl font-black text-[#0F172A] mb-2">{t("pricingFreeStarter")}</h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">{t("pricingFreeStarterDesc")}</p>
            
            <div className="font-display text-4xl font-black text-[#0F172A] mb-6">
              {t("pricingFreePrice")}
            </div>
            
            <ul className="text-xs text-slate-700 flex flex-col gap-2.5 pb-6 border-b border-slate-200 font-normal">
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingFeat1")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingFeat2")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingFeat3")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingFeat4")}</li>
              <li className="flex items-center gap-2 text-slate-400">&times; {t("pricingFeat5")}</li>
              <li className="flex items-center gap-2 text-slate-400">&times; {t("pricingFeat6")}</li>
              <li className="flex items-center gap-2 text-slate-400">&times; {t("pricingFeat7")}</li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-6 w-full block text-center py-3 bg-white border border-slate-300 hover:border-[#0055B8] hover:text-[#0055B8] text-[#0F172A] font-black text-xs rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider shadow-2xs"
          >
            {t("pricingCreateFreeAccount")}
          </Link>
        </div>

        {/* 2. Business Bidder (Solid Blue Highlight Card) (§ 08 & § 16) */}
        <div className="bg-[#0055B8] text-white p-6 pt-9 rounded-2xl flex flex-col justify-between shadow-2xl relative lg:-translate-y-2 border-2 border-blue-400">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-[#0055B8] border border-blue-200 text-[10px] font-black uppercase tracking-widest py-1 px-4 rounded-full shadow-md whitespace-nowrap">
            {t("pricingRecommended")}
          </div>

          <div>
            <div className="text-[11px] font-black text-blue-200 uppercase tracking-widest mb-1 mt-2.5">{t("pricingCommercialBidder")}</div>
            <h3 className="text-2xl font-black text-white mb-2">{t("pricingBusinessBidder")}</h3>
            <p className="text-xs text-blue-100 font-normal leading-relaxed mb-6">{t("pricingBusinessDesc")}</p>
            
            <div className="font-display text-4xl font-black text-white mb-0.5">
              {billingCycle === "annual" ? "Rs. 24,000" : "Rs. 7,500"}
            </div>
            <span className="text-xs text-blue-200 block mb-6 font-mono font-bold">
              {billingCycle === "annual" ? t("pricingBilledAnnually") : t("pricingBilledQuarterly")}
            </span>
            
            <ul className="text-xs text-blue-100 flex flex-col gap-2.5 pb-6 border-b border-blue-400/30 font-normal">
              <li className="flex items-center gap-2 text-white font-bold">&check; {t("pricingBusinessFeat1")}</li>
              <li className="flex items-center gap-2 text-white font-bold">&check; {t("pricingBusinessFeat2")}</li>
              <li className="flex items-center gap-2 text-white font-bold">&check; {t("pricingBusinessFeat3")}</li>
              <li className="flex items-center gap-2 text-white font-bold">&check; {t("pricingBusinessFeat4")}</li>
              <li className="flex items-center gap-2 text-white font-bold">&check; {t("pricingBusinessFeat5")}</li>
              <li className="flex items-center gap-2 text-white font-bold">&check; {t("pricingBusinessFeat6")}</li>
            </ul>
          </div>

          <button
            onClick={() => setShowBankClaim(true)}
            className="mt-6 w-full block text-center py-3.5 bg-white text-[#0055B8] hover:bg-blue-50 font-black text-xs rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider shadow-md cursor-pointer"
          >
            {t("pricingClaimViaBank")}
          </button>
        </div>

        {/* 3. Publisher / Procuring Entity Tier (§ 01 The Moat) */}
        <div className="bg-[#F8FAFC] p-6 rounded-2xl flex flex-col justify-between border-2 border-slate-200 shadow-sm">
          <div>
            <div className="text-[11px] font-black text-[#0055B8] uppercase tracking-wider mb-1">{t("pricingProcuringAuthorities")}</div>
            <h3 className="text-xl font-black text-[#0F172A] mb-2">{t("pricingPublisherWorkspace")}</h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">{t("pricingPublisherDesc")}</p>
            
            <div className="font-display text-4xl font-black text-[#0055B8] mb-0.5">
              FREE
            </div>
            <span className="text-xs text-slate-600 font-semibold block mb-6">
              {t("pricingFreeIndefinitely")}
            </span>
            
            <ul className="text-xs text-slate-700 flex flex-col gap-2.5 pb-6 border-b border-slate-200 font-normal">
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPubFeat1")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPubFeat2")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPubFeat3")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPubFeat4")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPubFeat5")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPubFeat6")}</li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-6 w-full block text-center py-3 bg-[#0F172A] hover:bg-black text-white font-black text-xs rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider shadow-xs"
          >
            {t("pricingCreateWorkspace")}
          </Link>
        </div>

        {/* 4. Enterprise & Partner API Tier (§ 23) */}
        <div className="bg-[#F8FAFC] p-6 rounded-2xl flex flex-col justify-between border-2 border-slate-200 shadow-sm">
          <div>
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1">{t("pricingLargeIntegrators")}</div>
            <h3 className="text-xl font-black text-[#0F172A] mb-2">{t("pricingPartnerApi")}</h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">{t("pricingPartnerDesc")}</p>
            
            <div className="font-display text-4xl font-black text-[#0F172A] mb-6">
              {t("pricingCustom")}
            </div>
            
            <ul className="text-xs text-slate-700 flex flex-col gap-2.5 pb-6 border-b border-slate-200 font-normal">
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPartnerFeat1")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPartnerFeat2")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPartnerFeat3")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPartnerFeat4")}</li>
              <li className="flex items-center gap-2 font-bold text-slate-900">&check; {t("pricingPartnerFeat5")}</li>
            </ul>
          </div>

          <Link
            href="/contact-us"
            className="mt-6 w-full block text-center py-3 bg-white border border-slate-300 hover:border-[#0055B8] hover:text-[#0055B8] text-[#0F172A] font-black text-xs rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider shadow-2xs"
          >
            {t("pricingContactSales")}
          </Link>
        </div>

      </div>

      {/* Direct Bank Transfer Information Section (§ 16) */}
      <section className="bg-white border-2 border-slate-200/90 rounded-2xl p-8 max-w-4xl mx-auto shadow-md">
        <h3 className="text-xl font-black text-[#0F172A] uppercase mb-2">
          {t("pricingHowBankWorks")}
        </h3>
        <p className="text-xs text-slate-600 font-normal leading-relaxed mb-6">
          {t("pricingHowBankDesc")}
        </p>

        {/* Modern Structured Bank Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/90 mb-6 font-sans">
          
          {/* Primary Bank Account Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0055B8]">
                {t("pricingPrimaryAccount")}
              </span>
              <span className="text-[11px] font-extrabold text-slate-400">BOC</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-normal">{t("pricingBankName")}</span>
                <strong className="text-[#0F172A] font-black">Bank of Ceylon (BOC)</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 bg-blue-50/70 px-3 rounded-lg border border-blue-100">
                <span className="text-[#0055B8] font-bold text-[11px]">{t("pricingAccountNo")}</span>
                <strong className="font-mono text-sm font-black text-[#0055B8] tracking-wider">0081294821</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-normal">{t("pricingBranch")}</span>
                <span className="text-slate-800 font-bold">Corporate City Office, Colombo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-normal">{t("pricingAccountName")}</span>
                <span className="text-slate-800 font-bold">TenderHub (Pvt) Ltd</span>
              </div>
            </div>
          </div>

          {/* Secondary Bank Account Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {t("pricingSecondaryAccount")}
              </span>
              <span className="text-[11px] font-extrabold text-slate-400">COMBANK</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-normal">{t("pricingBankName")}</span>
                <strong className="text-[#0F172A] font-black">Commercial Bank of Ceylon PLC</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 bg-slate-100/70 px-3 rounded-lg border border-slate-200">
                <span className="text-slate-700 font-bold text-[11px]">{t("pricingAccountNo")}</span>
                <strong className="font-mono text-sm font-black text-[#0F172A] tracking-wider">1000847291</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-normal">{t("pricingBranch")}</span>
                <span className="text-slate-800 font-bold">Kollupitiya Branch</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-normal">{t("pricingAccountName")}</span>
                <span className="text-slate-800 font-bold">TenderHub (Pvt) Ltd</span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-600 font-normal">
            {t("pricingWhatsAppSlip")} <strong className="text-[#0F172A] font-bold font-mono">+94 77 388 7615</strong>
          </div>
          <button
            onClick={() => setShowBankClaim(true)}
            className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            {t("pricingSubmitClaimNow")}
          </button>
        </div>
      </section>

      {/* Interactive Bank Claim Modal (§ 16) - Modern Ultra-Sleek Standard */}
      {showBankClaim && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-7 sm:p-8 border border-slate-200 text-slate-900 animate-fadeIn">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0055B8] block mb-0.5">
                  {t("pricingOfflineSettlement")}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#0F172A] uppercase tracking-tight">
                  {t("pricingFileClaim")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBankClaim(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors font-bold text-sm cursor-pointer"
              >
                &times;
              </button>
            </div>

            {claimSubmitted ? (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-14 h-14 bg-[#EFF6FF] text-[#0055B8] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border border-[#BFDBFE]">
                  &check;
                </div>
                <h4 className="text-lg font-black text-[#0F172A] mb-1">{t("pricingClaimRegistered")}</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal mb-6 leading-relaxed">
                  {t("pricingClaimRegisteredDesc")}
                </p>
                <button
                  type="button"
                  onClick={() => { setClaimSubmitted(false); setShowBankClaim(false); }}
                  className="w-full bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black py-3.5 rounded-xl uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  {t("pricingReturnToPlans")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="flex flex-col gap-4">
                
                {/* 1. Selected Plan (Modern Dropdown) */}
                <div className="flex flex-col gap-1.5 relative" ref={planRef}>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    {t("pricingSelectedPlan")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsPlanOpen(!isPlanOpen)}
                    className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200 focus:bg-white focus:border-[#0055B8] rounded-xl py-3 px-4 text-left transition-all text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between gap-2 cursor-pointer shadow-2xs"
                  >
                    <span className="truncate">{selectedPlan}</span>
                    <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isPlanOpen ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isPlanOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn divide-y divide-slate-50">
                      {PLANS.map((plan, idx) => (
                        <button
                          key={plan}
                          type="button"
                          onClick={() => { setSelectedPlanIndex(idx); setIsPlanOpen(false); }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            selectedPlanIndex === idx ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{plan}</span>
                          {selectedPlanIndex === idx && <span className="w-1.5 h-1.5 rounded-full bg-[#0055B8]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Bank Transferred From */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    {t("pricingBankTransferredFrom")}
                  </label>
                  <input
                    type="text"
                    required
                    value={bankTransferredFrom}
                    onChange={(e) => setBankTransferredFrom(e.target.value)}
                    placeholder={t("pricingBankPlaceholder")}
                    className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                {/* 3. Slip Reference / Transaction ID */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    {t("pricingSlipRef")}
                  </label>
                  <input
                    type="text"
                    required
                    value={slipReference}
                    onChange={(e) => setSlipReference(e.target.value)}
                    placeholder={t("pricingSlipPlaceholder")}
                    className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-mono font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                {/* 4. Confirmation Channel (Modern Dropdown) */}
                <div className="flex flex-col gap-1.5 relative" ref={channelRef}>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    {t("pricingConfirmChannel")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsChannelOpen(!isChannelOpen)}
                    className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200 focus:bg-white focus:border-[#0055B8] rounded-xl py-3 px-4 text-left transition-all text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between gap-2 cursor-pointer shadow-2xs"
                  >
                    <span className="truncate">{confirmChannel}</span>
                    <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isChannelOpen ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isChannelOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn divide-y divide-slate-50">
                      {CHANNELS.map((channel) => (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => { setConfirmChannel(channel); setIsChannelOpen(false); }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            confirmChannel === channel ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{channel}</span>
                          {confirmChannel === channel && <span className="w-1.5 h-1.5 rounded-full bg-[#0055B8]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 mt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowBankClaim(false)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {t("pricingCancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    {t("pricingSubmitClaim")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
