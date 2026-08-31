"use client";
import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "quarterly">("annual");
  const [showBankClaim, setShowBankClaim] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <header className="mb-10 text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#0055B8] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3 inline-block">
          TENDERHUB SRI LANKA · PLANS &amp; ENTITLEMENTS (§ 08 &amp; § 16)
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] uppercase tracking-tight mb-3">
          TRANSPARENT PLANS FOR BIDDERS &amp; BUYERS
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
          Undercutting outdated incumbent flat fees. No card needed — direct bank transfer with WhatsApp confirmation verified by staff in real time.
        </p>

        {/* Term Toggle Pills (§ 16) */}
        <div className="inline-flex p-1 bg-[#F1F3F7] rounded-xl border border-[#E2E6ED] mt-6">
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 text-xs font-extrabold rounded-lg transition-all uppercase tracking-wider ${
              billingCycle === "annual" ? "bg-[#0055B8] text-white shadow-xs" : "text-gray-600 hover:text-black"
            }`}
          >
            Annual Plan (Rs. 24,000 / Year)
          </button>
          <button
            onClick={() => setBillingCycle("quarterly")}
            className={`px-5 py-2 text-xs font-extrabold rounded-lg transition-all uppercase tracking-wider ${
              billingCycle === "quarterly" ? "bg-[#0055B8] text-white shadow-xs" : "text-gray-600 hover:text-black"
            }`}
          >
            Quarterly Seasonal (Rs. 7,500 / 3 Months)
          </button>
        </div>
      </header>

      {/* 4 Plan Cards Matrix (§ 08) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
        
        {/* 1. Free Guest / Tier */}
        <div className="bg-[#F8F9FB] p-6 rounded-xl flex flex-col justify-between border-2 border-[#E2E6ED]">
          <div>
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-1">New Bidder</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Free Starter</h3>
            <p className="text-xs text-gray-500 mb-6">Explore the national catalogue and assess market opportunities.</p>
            
            <div className="font-display text-4xl font-black text-[#0F172A] mb-6">
              Rs. 0
            </div>
            
            <ul className="text-xs text-gray-700 flex flex-col gap-2.5 pb-6 border-b border-[#E2E6ED]">
              <li className="flex items-center gap-2 font-semibold">✓ 5 Free full notice views</li>
              <li className="flex items-center gap-2 font-semibold">✓ Browse all 39,942+ archive notices</li>
              <li className="flex items-center gap-2 font-semibold">✓ Province, Category &amp; Value band filters</li>
              <li className="flex items-center gap-2 font-semibold">✓ View auction lots &amp; parate notices</li>
              <li className="flex items-center gap-2 text-gray-400">✕ Direct contact officer numbers</li>
              <li className="flex items-center gap-2 text-gray-400">✕ SHA-256 downloadable BOQ/PDFs</li>
              <li className="flex items-center gap-2 text-gray-400">✕ Electronic bid submission receipt</li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-6 w-full block text-center py-3 bg-white border border-[#D9DFE7] hover:border-[#0055B8] hover:text-[#0055B8] text-[#0F172A] font-bold text-xs rounded-md transition-colors uppercase tracking-wider shadow-2xs"
          >
            Create Free Account
          </Link>
        </div>

        {/* 2. Business Bidder (Solid Blue Highlight Card) (§ 08 & § 16) */}
        <div className="bg-[#0055B8] text-white p-6 rounded-xl flex flex-col justify-between shadow-xl relative lg:-translate-y-2 border-2 border-blue-400">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full shadow-xs">
            RECOMMENDED FOR CONTRACTORS
          </div>

          <div>
            <div className="text-xs font-extrabold text-blue-200 uppercase tracking-wider mb-1">Commercial Bidder</div>
            <h3 className="text-xl font-bold text-white mb-2">Business Bidder</h3>
            <p className="text-xs text-blue-100 mb-6">Complete procurement intelligence, full document downloads, and e-submission.</p>
            
            <div className="font-display text-4xl font-black text-white mb-0.5">
              {billingCycle === "annual" ? "Rs. 24,000" : "Rs. 7,500"}
            </div>
            <span className="text-xs text-blue-200 block mb-6 font-mono">
              billed {billingCycle === "annual" ? "annually (12 months)" : "quarterly (3 months)"}
            </span>
            
            <ul className="text-xs text-blue-100 flex flex-col gap-2.5 pb-6 border-b border-blue-400/30">
              <li className="flex items-center gap-2 text-white font-bold">✓ Unlimited daily gazette &amp; tender access</li>
              <li className="flex items-center gap-2 text-white font-bold">✓ Signed 5-minute SHA-256 document links</li>
              <li className="flex items-center gap-2 text-white font-bold">✓ Direct procurement officer contact &amp; phone</li>
              <li className="flex items-center gap-2 text-white font-bold">✓ Legally binding E-Submission Receipt</li>
              <li className="flex items-center gap-2 text-white font-bold">✓ Bid Pipeline &amp; Compliance Vault reminders</li>
              <li className="flex items-center gap-2 text-white font-bold">✓ Real-time keyword &amp; category alert feed</li>
            </ul>
          </div>

          <button
            onClick={() => setShowBankClaim(true)}
            className="mt-6 w-full block text-center py-3 bg-white text-[#0055B8] hover:bg-blue-50 font-black text-xs rounded-md transition-colors uppercase tracking-wider shadow-md"
          >
            Claim via Bank Transfer &rarr;
          </button>
        </div>

        {/* 3. Publisher / Procuring Entity Tier (§ 01 The Moat) */}
        <div className="bg-[#F8F9FB] p-6 rounded-xl flex flex-col justify-between border-2 border-emerald-300">
          <div>
            <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-1">Procuring Authorities</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Publisher Workspace</h3>
            <p className="text-xs text-gray-500 mb-6">For ministries, state boards, banks, and private corporates.</p>
            
            <div className="font-display text-4xl font-black text-emerald-700 mb-0.5">
              FREE
            </div>
            <span className="text-xs text-emerald-800 font-semibold block mb-6">
              Free indefinitely to build national supply (§ 01)
            </span>
            
            <ul className="text-xs text-gray-700 flex flex-col gap-2.5 pb-6 border-b border-[#E2E6ED]">
              <li className="flex items-center gap-2 font-bold text-gray-900">✓ 7-Stage Procurement Lifecycle management</li>
              <li className="flex items-center gap-2 font-bold text-gray-900">✓ Separation of duties threshold approvals</li>
              <li className="flex items-center gap-2 font-bold text-gray-900">✓ Dual-Control sealed opening ceremony</li>
              <li className="flex items-center gap-2 font-bold text-gray-900">✓ Conflict-of-interest committee evaluation</li>
              <li className="flex items-center gap-2 font-bold text-gray-900">✓ Numbered addenda &amp; anonymous Q&amp;A</li>
              <li className="flex items-center gap-2 font-bold text-gray-900">✓ Downloadable timestamped Evidence Pack</li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-6 w-full block text-center py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-md transition-colors uppercase tracking-wider shadow-xs"
          >
            Create Company Workspace
          </Link>
        </div>

        {/* 4. Enterprise & Partner API Tier (§ 23) */}
        <div className="bg-[#F8F9FB] p-6 rounded-xl flex flex-col justify-between border-2 border-[#E2E6ED]">
          <div>
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-1">Large Integrators</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Partner API</h3>
            <p className="text-xs text-gray-500 mb-6">Machine-readable feed with hashed API keys and webhooks.</p>
            
            <div className="font-display text-4xl font-black text-[#0F172A] mb-6">
              Custom
            </div>
            
            <ul className="text-xs text-gray-700 flex flex-col gap-2.5 pb-6 border-b border-[#E2E6ED]">
              <li className="flex items-center gap-2 font-semibold">✓ REST Partner API with daily quota</li>
              <li className="flex items-center gap-2 font-semibold">✓ Cursor-paged real-time notice polling</li>
              <li className="flex items-center gap-2 font-semibold">✓ Webhook notifications with HMAC secrets</li>
              <li className="flex items-center gap-2 font-semibold">✓ Dedicated account manager &amp; SLA</li>
              <li className="flex items-center gap-2 font-semibold">✓ Unlimited seats &amp; audit log export</li>
            </ul>
          </div>

          <Link
            href="/contact-us"
            className="mt-6 w-full block text-center py-3 bg-white border border-[#D9DFE7] hover:border-[#0055B8] hover:text-[#0055B8] text-[#0F172A] font-bold text-xs rounded-md transition-colors uppercase tracking-wider shadow-2xs"
          >
            Contact Enterprise Sales
          </Link>
        </div>

      </div>

      {/* Direct Bank Transfer Information Section (§ 16) */}
      <section className="bg-white border-2 border-[#E2E6ED] rounded-xl p-8 max-w-4xl mx-auto shadow-xs">
        <h3 className="text-xl font-black text-[#0F172A] uppercase mb-2">
          How Bank Transfer Activation Works (§ 16)
        </h3>
        <p className="text-xs text-gray-600 mb-6">
          Following standard Sri Lankan commercial practice, payments settle directly to our corporate bank account. Once you submit the claim below, staff verify statement records and activate your subscription in one audited transaction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8F9FB] p-5 rounded-lg border border-[#E2E6ED] mb-6 font-mono text-xs text-[#111827]">
          <div>
            <span className="text-gray-500 font-sans font-bold uppercase text-[10px] block mb-1">PRIMARY BANK ACCOUNT:</span>
            <div>Bank: <strong>Bank of Ceylon (BOC)</strong></div>
            <div>Account No: <strong>0081294821</strong></div>
            <div>Branch: <strong>Corporate City Office, Colombo</strong></div>
            <div>Account Name: <strong>TenderHub (Pvt) Ltd</strong></div>
          </div>
          <div>
            <span className="text-gray-500 font-sans font-bold uppercase text-[10px] block mb-1">SECONDARY BANK ACCOUNT:</span>
            <div>Bank: <strong>Commercial Bank of Ceylon PLC</strong></div>
            <div>Account No: <strong>1000847291</strong></div>
            <div>Branch: <strong>Kollupitiya Branch</strong></div>
            <div>Account Name: <strong>TenderHub (Pvt) Ltd</strong></div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            WhatsApp slip copy directly to: <strong className="text-gray-900">+94 77 388 7615</strong>
          </div>
          <button
            onClick={() => setShowBankClaim(true)}
            className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-bold px-6 py-3 rounded-md uppercase tracking-wider shadow-xs"
          >
            Submit Transfer Claim Now &rarr;
          </button>
        </div>
      </section>

      {/* Interactive Bank Claim Modal (§ 16) */}
      {showBankClaim && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="text-base font-black text-[#0F172A] uppercase">File Subscription Claim (§ 16)</h3>
              <button onClick={() => setShowBankClaim(false)} className="text-gray-400 font-bold text-2xl">&times;</button>
            </div>

            {claimSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Claim Registered in Staff Queue</h4>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  Your slip reference has been registered. Staff will confirm with statement records and activate your subscription.
                </p>
                <button
                  onClick={() => { setClaimSubmitted(false); setShowBankClaim(false); }}
                  className="bg-[#0055B8] text-white text-xs font-bold px-4 py-2 rounded uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setClaimSubmitted(true); }}>
                <div className="space-y-3 mb-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Selected Plan</label>
                    <select className="w-full bg-white border border-gray-300 rounded p-2 font-bold text-[#0055B8]">
                      <option>Bidder Business Annual — Rs. 24,000 / 12 Months</option>
                      <option>Bidder Business Quarterly — Rs. 7,500 / 3 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Bank Transferred From</label>
                    <input type="text" placeholder="e.g. Commercial Bank / Sampath" required className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Slip Reference / Transaction ID</label>
                    <input type="text" placeholder="e.g. TXN-8849102" required className="w-full border p-2 rounded font-mono" />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Confirmation Channel</label>
                    <select className="w-full border p-2 rounded">
                      <option>WhatsApp (+94 77 388 7615)</option>
                      <option>Email Slip</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowBankClaim(false)} className="px-4 py-2 text-xs font-bold text-gray-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-[#0055B8] text-white text-xs font-bold rounded uppercase">
                    Submit Claim &rarr;
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
