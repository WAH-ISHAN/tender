"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [lang, setLang] = useState<"En" | "Si" | "Ta">("En");
  const pathname = usePathname();

  const navLinks = [
    { name: "Find Tenders", href: "/tenders-sri-lanka" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/subscriber-pricing" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <header className="w-full bg-white border-b border-[#E2E6ED] sticky top-0 z-50">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" className="text-[#0055B8]">
              <path d="M14 0L27.8564 24H0.143594L14 0Z" fill="currentColor" fillOpacity="0.15"/>
              <path d="M14 4L24 22H4L14 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M8 17H20" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="font-bold text-lg lg:text-xl tracking-tight text-[#0055B8] uppercase">
              LANSU PROCUREMENT
            </span>
          </div>
        </Link>

        {/* Clean Essential Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[14px] font-medium text-[#111827]">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/tenders-sri-lanka" && pathname === "/");

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`py-7 transition-colors ${
                  isActive
                    ? "text-[#0055B8] font-bold border-b-2 border-[#0055B8]"
                    : "text-gray-700 hover:text-[#0055B8]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Segmented Language Switcher + Quick Auth */}
        <div className="flex items-center gap-5">
          
          {/* Segmented Control Language Switcher */}
          <div className="segmented-bar p-1">
            <button 
              onClick={() => setLang("En")}
              className={`px-2.5 py-1 text-xs rounded font-bold transition-all ${
                lang === "En" 
                  ? "bg-white text-[#0055B8] shadow-xs" 
                  : "text-gray-600 hover:text-black"
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang("Si")}
              className={`px-2.5 py-1 text-xs rounded font-bold transition-all ${
                lang === "Si" 
                  ? "bg-white text-[#0055B8] shadow-xs" 
                  : "text-gray-600 hover:text-black"
              }`}
            >
              සිං
            </button>
            <button 
              onClick={() => setLang("Ta")}
              className={`px-2.5 py-1 text-xs rounded font-bold transition-all ${
                lang === "Ta" 
                  ? "bg-white text-[#0055B8] shadow-xs" 
                  : "text-gray-600 hover:text-black"
              }`}
            >
              த
            </button>
          </div>

          {/* Quick Auth Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-gray-700 hover:text-[#0055B8] px-2 py-2 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-bold px-4 py-2.5 rounded transition-colors shadow-xs uppercase tracking-wider"
            >
              Register Free
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
