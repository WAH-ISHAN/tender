"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-slate-200 mt-24 text-slate-700">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top 5-Column Institutional Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-200">
          
          {/* Column 1: Brand & National Mission (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="font-display font-black text-2xl tracking-tight text-[#0F172A] block leading-none">
                TENDER<span className="text-[#0055B8]">HUB</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block mt-1">
                {t("brandSubtitle")}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Sri Lanka&apos;s centralized commercial and state procurement gateway. Aggregating national government gazettes, state ministries, municipal councils, corporate RFPs, and verified supplier registrations daily.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0055B8]" />
                <span className="font-semibold text-[#0F172A]">National Competitive Bidding (NCB/ICB) Gateway</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0055B8]" />
                <span className="font-semibold text-[#0F172A]">CIDA &amp; National Procurement Authority Aligned</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0055B8]" />
                <span className="font-semibold text-[#0F172A]">Verified Daily Procurement Gazette Mirror</span>
              </div>
            </div>
          </div>

          {/* Column 2: Procurement Directory (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              Procurement Directory
            </h4>
            <nav className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-[#0055B8] transition-colors">Live Tenders Catalogue</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Government Ministries</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Provincial Councils (9)</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">State Corporations</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Public &amp; Parate Auctions</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Awards &amp; Standstill Archive</Link>
            </nav>
          </div>

          {/* Column 3: Bidders & Contractors (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              Bidders &amp; Suppliers
            </h4>
            <nav className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
              <Link href="/subscriber-pricing" className="hover:text-[#0055B8] transition-colors">Commercial Bidder Plans</Link>
              <Link href="/subscriber-pricing" className="hover:text-[#0055B8] transition-colors">Bank Transfer Claim</Link>
              <Link href="/register" className="hover:text-[#0055B8] transition-colors">Supplier Registration</Link>
              <Link href="/how-it-works" className="hover:text-[#0055B8] transition-colors">Bidding Guide &amp; Rules</Link>
              <Link href="/blog/essential-parts" className="hover:text-[#0055B8] transition-colors">Procurement Knowledge Hub</Link>
            </nav>
          </div>

          {/* Column 4: Procuring Authorities (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              Procuring Authorities
            </h4>
            <nav className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
              <Link href="/register" className="hover:text-[#0055B8] transition-colors">Publisher Free Workspace</Link>
              <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors">Notice Submission Desk</Link>
              <Link href="/how-it-works" className="hover:text-[#0055B8] transition-colors">Audit Trail &amp; Evidence Pack</Link>
              <Link href="/subscriber-pricing" className="hover:text-[#0055B8] transition-colors">Enterprise Partner API</Link>
            </nav>
          </div>

          {/* Column 5: Central Dispatch & Contact (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              Headquarters Desk
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-600">
              <div>
                <span className="font-bold text-[#0F172A] block">Central Dispatch</span>
                <span className="font-mono text-slate-800 font-bold block">+94 11 200 8000</span>
              </div>
              <div className="pt-1">
                <span className="font-bold text-[#0F172A] block">Supplier Support</span>
                <span className="font-mono text-slate-800 font-bold block">+94 11 200 8001</span>
              </div>
              <div className="pt-1">
                <span className="font-bold text-[#0F172A] block">Official Email</span>
                <Link href="mailto:tenders@tenderhub.lk" className="text-[#0055B8] font-bold hover:underline">
                  tenders@tenderhub.lk
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Standards & Compliance Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p className="font-semibold text-slate-700">
              {t("footerCopyright")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors">Gazette Disclaimer</Link>
            <span>&bull;</span>
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors">Help &amp; Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
