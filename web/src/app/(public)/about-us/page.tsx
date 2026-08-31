import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Subnav */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4 pt-4 text-[13px] text-[#6B7280]">
          <Link href="#" className="text-[#0055B8] font-bold">[Company Overview]</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Mission &amp; Mandate</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Data Integrity</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Leadership</Link>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#111827] uppercase leading-none mb-6">
            ABOUT LANSU PROCUREMENT
          </h1>
          <p className="text-lg text-[#6B7280] max-w-3xl mb-12 font-normal leading-relaxed">
            Sri Lanka's centralized commercial and state procurement gateway. We aggregate, verify, and deliver high-value tender opportunities across all 9 provinces with industrial accuracy.
          </p>

          {/* Metric Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-[#F3F5F8] p-6 rounded-md">
              <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">39,900+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Tenders Published</div>
            </div>
            <div className="bg-[#0055B8] text-white p-6 rounded-md">
              <div className="font-display text-4xl lg:text-5xl font-black text-white">100%</div>
              <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold mt-1">Verified Gazettes</div>
            </div>
            <div className="bg-[#F3F5F8] p-6 rounded-md">
              <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">9</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Provinces Covered</div>
            </div>
            <div className="bg-[#F3F5F8] p-6 rounded-md">
              <div className="font-display text-4xl lg:text-5xl font-black text-[#0055B8]">3,200+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Registered Suppliers</div>
            </div>
          </div>

          {/* Editorial Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[#E2E6ED] pt-12">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Our Institutional Mandate</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For over a decade, tracking government procurement and corporate invitations required scouring disparate print gazettes, departmental bulletins, and provincial newspapers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Lansu standardizes the entire national procurement pipeline into a clean, searchable index. Every notice is cross-checked against official procurement reference numbers before release.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Verification &amp; Accuracy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our editorial desk processes gazettes daily across Sinhala, Tamil, and English publications. We extract critical bidding criteria, bid bonds, and submission deadlines so suppliers bid with confidence.
              </p>
              <div className="bg-[#F3F5F8] p-6 rounded-md border-l-4 border-[#0055B8]">
                <p className="text-sm font-medium text-gray-800 italic">
                  "Empowering Sri Lankan enterprises with transparent, immediate access to public and private sector projects."
                </p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
