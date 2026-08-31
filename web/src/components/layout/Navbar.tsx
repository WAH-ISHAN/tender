"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b border-[#E2E6ED] sticky top-0 z-50">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with National Subtitle */}
        <Link href="/" className="flex items-center gap-3">
          <div>
            <span className="font-display font-black text-xl lg:text-2xl tracking-tight text-[#0F172A] block leading-none">
              TENDER<span className="text-[#0055B8]">HUB</span>
            </span>
            <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
              {t("brandSubtitle")}
            </span>
          </div>
        </Link>

        {/* Clean Essential Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs sm:text-sm font-bold text-[#374151]">
          <Link
            href="/"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/" || pathname === "/tenders-sri-lanka"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navCatalogue")}
          </Link>
          
          <Link
            href="/subscriber-pricing"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/subscriber-pricing"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navPlans")}
          </Link>

          <Link
            href="/how-it-works"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/how-it-works"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navHowItWorks")}
          </Link>

          <Link
            href="/about-us"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/about-us"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navAbout")}
          </Link>

          <Link
            href="/contact-us"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/contact-us"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            {t("navContact")}
          </Link>
        </nav>

        {/* Right Section: Interactive Trilingual Switcher + Stakeholder Doors */}
        <div className="flex items-center gap-3.5">
          
          {/* Segmented Trilingual Language Switcher */}
          <div className="flex items-center bg-[#F1F3F7] p-1 rounded-xl border border-[#E2E6ED] shadow-2xs">
            <button 
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 text-xs rounded-lg font-black transition-all cursor-pointer ${
                language === "en" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              EN
            </button>
            <button 
              type="button"
              onClick={() => setLanguage("si")}
              className={`px-2.5 py-1 text-xs rounded-lg font-black transition-all cursor-pointer ${
                language === "si" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              සිං
            </button>
            <button 
              type="button"
              onClick={() => setLanguage("ta")}
              className={`px-2.5 py-1 text-xs rounded-lg font-black transition-all cursor-pointer ${
                language === "ta" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black font-bold"
              }`}
            >
              த
            </button>
          </div>

          {/* Dynamic Auth State Doors */}
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
              {/* Door 1: Bidder Sign-in */}
              <Link
                href="/login"
                className="text-xs font-bold text-[#0055B8] hover:text-[#004394] bg-[#EFF6FF] hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors uppercase tracking-wider border border-[#BFDBFE]"
              >
                {t("navBidderLogin")}
              </Link>

              {/* Door 2: Company / Procuring Entity Free Workspace */}
              <Link
                href="/register"
                className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-black px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider shadow-md whitespace-nowrap"
              >
                {t("navCompanyWorkspace")}
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}
