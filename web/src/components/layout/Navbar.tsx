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
    <header className="w-full bg-white border-b border-[#E2E6ED] sticky top-0 z-50">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo with National Subtitle */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div>
            <span className="font-display font-black text-xl lg:text-2xl tracking-tight text-[#0F172A] block leading-none">
              TENDER<span className="text-[#0055B8]">HUB</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 tracking-wider uppercase block mt-0.5">
              {t("brandSubtitle")}
            </span>
          </div>
        </Link>

        {/* Clean Desktop Navigation (md and up) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs sm:text-sm font-bold text-[#374151]">
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
        <div className="flex items-center gap-2 sm:gap-3.5">
          
          {/* Segmented Trilingual Language Switcher */}
          <div className="flex items-center bg-[#F1F3F7] p-0.5 sm:p-1 rounded-xl border border-[#E2E6ED] shadow-2xs">
            <button 
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 sm:px-2.5 py-1 text-xs rounded-lg font-black transition-all cursor-pointer ${
                language === "en" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              EN
            </button>
            <button 
              type="button"
              onClick={() => setLanguage("si")}
              className={`px-2 sm:px-2.5 py-1 text-xs rounded-lg font-black transition-all cursor-pointer ${
                language === "si" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              සිං
            </button>
            <button 
              type="button"
              onClick={() => setLanguage("ta")}
              className={`px-2 sm:px-2.5 py-1 text-xs rounded-lg font-black transition-all cursor-pointer ${
                language === "ta" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              த
            </button>
          </div>

          {/* Desktop Auth State Doors (Hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-2.5">
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

          {/* Mobile Menu Hamburger Toggle (md:hidden) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
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

      {/* Responsive Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 py-6 shadow-2xl animate-fadeIn space-y-4">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors ${
                pathname === "/" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("navCatalogue")}
            </Link>
            <Link
              href="/subscriber-pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors ${
                pathname === "/subscriber-pricing" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("navPlans")}
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors ${
                pathname === "/how-it-works" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("navHowItWorks")}
            </Link>
            <Link
              href="/about-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors ${
                pathname === "/about-us" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("navAbout")}
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors ${
                pathname === "/contact-us" ? "bg-[#EFF6FF] text-[#0055B8]" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("navContact")}
            </Link>
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {pathname.startsWith("/dashboard") || pathname.startsWith("/favorites") || pathname.startsWith("/related-tenders") || pathname.startsWith("/settings") ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-[#0055B8] text-white text-xs font-black py-3 rounded-xl uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t("navWorkspacePortal")}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center text-xs font-bold text-[#0055B8] bg-[#EFF6FF] py-3 rounded-xl uppercase tracking-wider border border-[#BFDBFE]"
                >
                  {t("navBidderLogin")}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-[#0055B8] text-white text-xs font-black py-3 rounded-xl uppercase tracking-wider shadow-md"
                >
                  {t("navCompanyWorkspace")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
