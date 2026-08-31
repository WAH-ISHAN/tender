"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [lang, setLang] = useState<"En" | "Si" | "Ta">("En");
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b border-[#E2E6ED] sticky top-0 z-50">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with National Subtitle */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0055B8] flex items-center justify-center text-white shadow-xs">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div>
              <span className="font-display font-black text-xl lg:text-2xl tracking-tight text-[#0F172A] block leading-none">
                TENDER<span className="text-[#0055B8]">HUB</span>
              </span>
              <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                Sri Lanka National Procurement
              </span>
            </div>
          </div>
        </Link>

        {/* Clean Essential Navigation matching Rev 3.0 Blueprint */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs sm:text-sm font-bold text-[#374151]">
          <Link
            href="/"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/" || pathname === "/tenders-sri-lanka"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            Catalogue
          </Link>
          
          <Link
            href="/subscriber-pricing"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/subscriber-pricing"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            Plans &amp; Bank Claim
          </Link>

          <Link
            href="/how-it-works"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/how-it-works"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            How It Works
          </Link>

          <Link
            href="/about-us"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/about-us"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            About
          </Link>

          <Link
            href="/contact-us"
            className={`py-7 transition-colors uppercase tracking-wider ${
              pathname === "/contact-us"
                ? "text-[#0055B8] font-extrabold border-b-2 border-[#0055B8]"
                : "text-gray-700 hover:text-[#0055B8]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Section: Language Switcher + 4 Stakeholder Doors */}
        <div className="flex items-center gap-3.5">
          
          {/* Segmented Language Switcher */}
          <div className="hidden sm:flex items-center bg-[#F1F3F7] p-0.5 rounded border border-[#E2E6ED]">
            <button 
              onClick={() => setLang("En")}
              className={`px-2 py-1 text-xs rounded font-bold transition-all ${
                lang === "En" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang("Si")}
              className={`px-2 py-1 text-xs rounded font-bold transition-all ${
                lang === "Si" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              සිං
            </button>
            <button 
              onClick={() => setLang("Ta")}
              className={`px-2 py-1 text-xs rounded font-bold transition-all ${
                lang === "Ta" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              த
            </button>
          </div>

          {/* Door 1: Bidder Sign-in */}
          <Link
            href="/login"
            className="text-xs font-extrabold text-[#0055B8] hover:text-[#004394] bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors uppercase tracking-wider border border-blue-200"
          >
            Bidder Login
          </Link>

          {/* Door 2: Company / Procuring Entity Free Workspace */}
          <Link
            href="/register"
            className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-extrabold px-3.5 py-2 rounded-md transition-colors uppercase tracking-wider shadow-xs whitespace-nowrap"
          >
            Company Workspace
          </Link>

        </div>

      </div>
    </header>
  );
}
