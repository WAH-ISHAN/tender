"use client";
import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Subnav */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4 pt-4 text-[13px] text-[#6B7280]">
          <Link href="#" className="text-[#0055B8] font-bold">[Pricing &amp; Plans]</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Supplier Panel</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Corporate Accounts</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">API Integration</Link>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#111827] uppercase leading-none mb-6">
            SUBSCRIPTION PLANS &amp; RATES
          </h1>
          <p className="text-lg text-[#6B7280] max-w-3xl mb-8 font-normal leading-relaxed">
            Choose the procurement intelligence package suited for your business scale. All subscriptions include full access to government and private gazettes.
          </p>

          {/* Billing Toggle Pills */}
          <div className="flex gap-3 mb-12">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`pill-tab ${billingCycle === "annual" ? "active" : ""}`}
            >
              Annual Billing (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`pill-tab ${billingCycle === "monthly" ? "active" : ""}`}
            >
              Monthly Billing
            </button>
          </div>

          {/* 3 Tier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch">
            
            {/* Free Tier */}
            <div className="bg-[#F3F5F8] p-8 rounded-md flex flex-col justify-between border border-[#E2E6ED]">
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">Standard Access</h3>
                <p className="text-xs text-gray-500 mb-6">For individual contractors and small suppliers.</p>
                <div className="font-display text-4xl lg:text-5xl font-black text-[#111827] mb-8">
                  FREE
                </div>
                
                <ul className="text-sm text-gray-600 flex flex-col gap-3 pb-8 border-b border-[#E2E6ED]">
                  <li className="flex items-center gap-2">✓ Browse all published public tenders</li>
                  <li className="flex items-center gap-2">✓ Basic category and sector filtering</li>
                  <li className="flex items-center gap-2">✓ 24-hour delayed notice updates</li>
                  <li className="flex items-center gap-2 text-gray-400">✕ Real-time email alerts</li>
                </ul>
              </div>

              <Link
                href="/register"
                className="mt-8 w-full block text-center py-3 bg-white border border-[#D9DFE7] hover:border-[#0055B8] hover:text-[#0055B8] text-[#111827] font-semibold text-sm rounded-md transition-colors"
              >
                Register Free
              </Link>
            </div>

            {/* Professional Tier (Solid Blue Highlighted Card!) */}
            <div className="bg-[#0055B8] text-white p-8 rounded-md flex flex-col justify-between shadow-xl relative md:-translate-y-2">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Most Popular
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                <p className="text-xs text-blue-100 mb-6">For growing commercial suppliers and contractors.</p>
                <div className="font-display text-4xl lg:text-5xl font-black text-white mb-1">
                  {billingCycle === "annual" ? "2 800 LKR" : "3 500 LKR"}
                </div>
                <span className="text-xs text-blue-200 block mb-8">per month, billed {billingCycle}</span>
                
                <ul className="text-sm text-blue-100 flex flex-col gap-3 pb-8 border-b border-blue-400/30">
                  <li className="flex items-center gap-2 text-white font-medium">✓ Instant live access to all gazettes</li>
                  <li className="flex items-center gap-2 text-white font-medium">✓ Real-time SMS &amp; Email alerts</li>
                  <li className="flex items-center gap-2 text-white font-medium">✓ Downloadable original tender PDFs</li>
                  <li className="flex items-center gap-2 text-white font-medium">✓ Multi-province advanced search filter</li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-between px-6 py-3.5 bg-white text-[#0055B8] hover:bg-gray-100 font-bold text-sm rounded-md transition-colors shadow-sm"
                >
                  <span>Subscribe Now</span>
                  <span className="text-lg">↗</span>
                </Link>
              </div>
            </div>

            {/* Corporate Tier */}
            <div className="bg-[#F3F5F8] p-8 rounded-md flex flex-col justify-between border border-[#E2E6ED]">
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">Enterprise Desk</h3>
                <p className="text-xs text-gray-500 mb-6">For large corporations and multi-bid teams.</p>
                <div className="font-display text-4xl lg:text-5xl font-black text-[#111827] mb-1">
                  {billingCycle === "annual" ? "9 600 LKR" : "12 000 LKR"}
                </div>
                <span className="text-xs text-gray-500 block mb-8">per month, up to 10 team seats</span>
                
                <ul className="text-sm text-gray-600 flex flex-col gap-3 pb-8 border-b border-[#E2E6ED]">
                  <li className="flex items-center gap-2">✓ Everything in Professional</li>
                  <li className="flex items-center gap-2">✓ 10 Team member seats &amp; sub-accounts</li>
                  <li className="flex items-center gap-2">✓ Dedicated account manager</li>
                  <li className="flex items-center gap-2">✓ API data access &amp; weekly digests</li>
                </ul>
              </div>

              <Link
                href="/contact-us"
                className="mt-8 w-full block text-center py-3 bg-white border border-[#D9DFE7] hover:border-[#0055B8] hover:text-[#0055B8] text-[#111827] font-semibold text-sm rounded-md transition-colors"
              >
                Contact Enterprise Desk
              </Link>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
