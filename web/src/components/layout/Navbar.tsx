"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="w-full bg-white border-b border-[#E2E6ED] sticky top-0 z-50 supports-[backdrop-filter]:bg-white/95 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="max-w-[1680px] 2xl:max-w-[1760px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 2xl:px-10 h-16 xs:h-[4.5rem] sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo with National Subtitle - Responsive scaling 320px -> 1920px+ */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="min-w-0">
            <span className="font-display font-black text-lg xs:text-xl sm:text-xl lg:text-2xl 2xl:text-[1.7rem] tracking-tight text-[#0F172A] block leading-none truncate">
              TENDER<span className="text-[#0055B8]">HUB</span>
            </span>
            <span className="text-[7px] xs:text-[8px] sm:text-[10px] font-bold text-gray-500 tracking-wider uppercase block mt-0.5 leading-tight truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none">
              {t("brandSubtitle")}
            </span>
          </div>
        </Link>

        {/* Clean Desktop Navigation (md and up) - Fluid gap scaling */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-7 2xl:gap-8 text-[11px] lg:text-xs xl:text-sm font-bold text-[#374151] shrink-0">
          <Link
            href="/"
            className={`py-6 lg:py-7 transition-colors uppercase tracking-wider ${
              pathname === "/" || pathname === "/tenders-sri-lanka"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navCatalogue")}
          </Link>
          
          <Link
            href="/subscriber-pricing"
            className={`py-6 lg:py-7 transition-colors uppercase tracking-wider ${
              pathname === "/subscriber-pricing"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navPlans")}
          </Link>

          <Link
            href="/how-it-works"
            className={`py-6 lg:py-7 transition-colors uppercase tracking-wider ${
              pathname === "/how-it-works"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navHowItWorks")}
          </Link>

          <Link
            href="/about-us"
            className={`py-6 lg:py-7 transition-colors uppercase tracking-wider ${
              pathname === "/about-us"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navAbout")}
          </Link>

          <Link
            href="/contact-us"
            className={`py-6 lg:py-7 transition-colors uppercase tracking-wider ${
              pathname === "/contact-us"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navContact")}
          </Link>
        </nav>

        {/* Right Section: Interactive Trilingual Switcher + Desktop Doors + Mobile Toggle */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3.5 shrink-0">
          
          {/* Segmented Trilingual Language Switcher - Optimized for 320px -> 1920px */}
          <div className="flex items-center bg-[#F1F3F7] p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-[#E2E6ED] shadow-2xs shrink-0">
            <button 
              type="button"
              onClick={() => setLanguage("en")}
              aria-label="Switch to English"
              className={`px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-1 text-[11px] sm:text-xs rounded-md sm:rounded-lg font-black transition-all cursor-pointer min-h-[28px] sm:min-h-0 min-w-[32px] xs:min-w-[36px] sm:min-w-0 flex items-center justify-center ${
                language === "en" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              EN
            </button>
            <button 
              type="button"
              onClick={() => setLanguage("si")}
              aria-label="Switch to Sinhala"
              className={`px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-1 text-[11px] sm:text-xs rounded-md sm:rounded-lg font-black transition-all cursor-pointer min-h-[28px] sm:min-h-0 min-w-[32px] xs:min-w-[36px] sm:min-w-0 flex items-center justify-center ${
                language === "si" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              සිං
            </button>
            <button 
              type="button"
              onClick={() => setLanguage("ta")}
              aria-label="Switch to Tamil"
              className={`px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-1 text-[11px] sm:text-xs rounded-md sm:rounded-lg font-black transition-all cursor-pointer min-h-[28px] sm:min-h-0 min-w-[32px] xs:min-w-[36px] sm:min-w-0 flex items-center justify-center ${
                language === "ta" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              த
            </button>
          </div>

          {/* Desktop Auth State Doors (Hidden on small mobile) - Responsive from 640px+ */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 shrink-0">
            {pathname.startsWith("/dashboard") || pathname.startsWith("/favorites") || pathname.startsWith("/related-tenders") || pathname.startsWith("/settings") ? (
              <Link
                href="/dashboard"
                className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider shadow-md whitespace-nowrap flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t("navWorkspacePortal")}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-[#0055B8] hover:text-[#004394] bg-[#EFF6FF] hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors uppercase tracking-wider border border-[#BFDBFE] whitespace-nowrap"
                >
                  {t("navBidderLogin")}
                </Link>

                <Link
                  href="/register"
                  className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider shadow-md whitespace-nowrap"
                >
                  {t("navCompanyWorkspace")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger Toggle (md:hidden) - 44px touch target */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>

      </div>

      {/* Responsive Mobile Drawer Menu - Optimized for 320px -> 768px */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 top-16 xs:top-[4.5rem] sm:top-20" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden bg-white border-b border-slate-200 px-3 xs:px-4 sm:px-5 py-5 sm:py-6 shadow-2xl animate-fadeIn space-y-4 relative z-50 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
          <nav className="flex flex-col space-y-1.5 sm:space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 sm:px-3.5 py-3 sm:py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors min-h-[44px] flex items-center ${
                pathname === "/" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
              }`}
            >
              {t("navCatalogue")}
            </Link>
            <Link
              href="/subscriber-pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 sm:px-3.5 py-3 sm:py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors min-h-[44px] flex items-center ${
                pathname === "/subscriber-pricing" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
              }`}
            >
              {t("navPlans")}
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 sm:px-3.5 py-3 sm:py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors min-h-[44px] flex items-center ${
                pathname === "/how-it-works" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
              }`}
            >
              {t("navHowItWorks")}
            </Link>
            <Link
              href="/about-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 sm:px-3.5 py-3 sm:py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors min-h-[44px] flex items-center ${
                pathname === "/about-us" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
              }`}
            >
              {t("navAbout")}
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 sm:px-3.5 py-3 sm:py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors min-h-[44px] flex items-center ${
                pathname === "/contact-us" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
              }`}
            >
              {t("navContact")}
            </Link>
          </nav>

          {/* Mobile Auth Buttons - 44px touch targets */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {pathname.startsWith("/dashboard") || pathname.startsWith("/favorites") || pathname.startsWith("/related-tenders") || pathname.startsWith("/settings") ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-[#0055B8] text-white text-xs font-black py-3.5 rounded-xl uppercase tracking-wider shadow-md flex items-center justify-center gap-2 min-h-[44px] active:scale-[0.98]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t("navWorkspacePortal")}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center text-xs font-bold text-[#0055B8] bg-[#EFF6FF] py-3.5 rounded-xl uppercase tracking-wider border border-[#BFDBFE] min-h-[44px] flex items-center justify-center active:bg-blue-100"
                >
                  {t("navBidderLogin")}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-[#0055B8] text-white text-xs font-black py-3.5 rounded-xl uppercase tracking-wider shadow-md min-h-[44px] flex items-center justify-center active:bg-[#004394]"
                >
                  {t("navCompanyWorkspace")}
                </Link>
              </>
            )}
          </div>
        </div>
        </>
      )}
    </header>
  );
}
