import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Subnav */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4 pt-4 text-[13px] text-[#6B7280]">
          <Link href="#" className="text-[#0055B8] font-bold">[Process Overview]</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Daily Sourcing</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Indexing &amp; Tags</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Bidding Documents</Link>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#111827] uppercase leading-none mb-6">
            WHAT WE DO &amp; HOW IT WORKS
          </h1>
          <p className="text-lg text-[#6B7280] max-w-3xl mb-12 font-normal leading-relaxed">
            A transparent 3-stage intelligence pipeline that gathers procurement notices from across Sri Lanka and transforms them into structured, actionable opportunities.
          </p>

          {/* 3 Step Process Cards matching the visual theme */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Step 1 */}
            <div className="bg-[#F3F5F8] p-8 rounded-md flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="font-display text-6xl font-black text-[#0055B8] opacity-50 mb-4">
                  01
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">
                  Multi-Source Aggregation
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every morning at 05:00 AM, our pipeline ingests government gazettes, 14 national newspapers, provincial council notices, and private corporate RFP publications.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#0055B8] uppercase tracking-wider pt-6 border-t border-[#E2E6ED]">
                Stage 1 — Data Collection
              </div>
            </div>

            {/* Step 2 (Highlighted Solid Blue Card!) */}
            <div className="bg-[#0055B8] text-white p-8 rounded-md flex flex-col justify-between min-h-[300px] shadow-lg">
              <div>
                <div className="font-display text-6xl font-black text-white opacity-40 mb-4">
                  02
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Editorial Classification
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Every notice is indexed with standard classification codes, budget limits in LKR, submission deadlines, bid bond criteria, and exact department addresses.
                </p>
              </div>
              <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider pt-6 border-t border-blue-400/30 flex items-center justify-between">
                <span>Stage 2 — Verification</span>
                <span className="text-xl">↗</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F3F5F8] p-8 rounded-md flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="font-display text-6xl font-black text-[#0055B8] opacity-50 mb-4">
                  03
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">
                  Instant Bidding Alerts
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Suppliers receive real-time email alerts matching their category and province, with downloadable tender PDFs and complete submission instructions.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#0055B8] uppercase tracking-wider pt-6 border-t border-[#E2E6ED]">
                Stage 3 — Delivery
              </div>
            </div>

          </div>

          {/* CTA Box */}
          <div className="bg-[#F3F5F8] border border-[#E2E6ED] p-8 md:p-10 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#111827] mb-2">Ready to explore active tenders?</h3>
              <p className="text-gray-600 text-sm">Browse 366 live procurement procedures updated today.</p>
            </div>
            <Link
              href="/tenders-sri-lanka"
              className="bg-[#0055B8] hover:bg-[#004394] text-white font-semibold px-8 py-3.5 rounded-md transition-colors whitespace-nowrap"
            >
              Explore Tenders &amp; Purchases
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
