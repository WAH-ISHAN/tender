import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F3F5F8] border-t border-[#E2E6ED] mt-24">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-[#E2E6ED]">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="24" height="20" viewBox="0 0 28 24" fill="none" className="text-[#0055B8]">
                <path d="M14 0L27.8564 24H0.143594L14 0Z" fill="currentColor" fillOpacity="0.15"/>
                <path d="M14 4L24 22H4L14 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M8 17H20" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="font-bold text-lg tracking-tight text-[#0055B8] uppercase">
                LANSU PROCUREMENT
              </span>
            </Link>
            <p className="text-sm text-[#6B7280] max-w-sm leading-relaxed">
              Sri Lanka's centralized commercial and state procurement gateway. Aggregating national gazettes, corporate RFPs, and supplier registrations daily.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[#6B7280]">
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Find Tenders</Link>
              <Link href="/how-it-works" className="hover:text-[#0055B8] transition-colors">How It Works</Link>
              <Link href="/subscriber-pricing" className="hover:text-[#0055B8] transition-colors">Pricing Plans</Link>
              <Link href="/about-us" className="hover:text-[#0055B8] transition-colors">About Us</Link>
            </div>
          </div>

          {/* Key Sectors */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Top Sectors
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[#6B7280]">
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Construction</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Computer &amp; IT</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Medical Supply</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">Renewable Energy</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Contact Desk
            </h4>
            <div className="text-sm text-[#6B7280] flex flex-col gap-1.5">
              <span className="font-semibold text-[#111827]">World Trade Centre, Colombo 01</span>
              <span>Hotline: +94 11 200 8000</span>
              <span className="text-[#0055B8] font-medium">tenders@lansu.lk</span>
              <span className="text-xs text-gray-400 mt-0.5">Mon - Fri: 08:30 - 17:30 IST</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9CA3AF] gap-4">
          <p>© 2026 Lansu Procurement Portal. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[#6B7280]">
            <Link href="#" className="hover:text-[#0055B8] transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#0055B8] transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#0055B8] transition-colors">Public Gazettes</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
