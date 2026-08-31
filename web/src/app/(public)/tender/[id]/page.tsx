import Link from "next/link";

export default function TenderDetailPage() {
  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back Link */}
      <div className="mb-6">
        <Link 
          href="/tenders-sri-lanka" 
          className="text-xs font-semibold text-[#0055B8] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
        >
          &larr; Back to Tenders &amp; Purchases
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Rail Metadata Badges */}
        <aside className="lg:col-span-3 flex flex-col gap-5">
          <div className="bg-[#F3F5F8] p-6 rounded-md border border-[#E2E6ED]">
            <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold mb-1">
              Reference Code
            </div>
            <div className="text-base font-bold text-[#111827] mb-4">
              SLPA/2026/PT-04
            </div>

            <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold mb-1">
              Procuring Entity
            </div>
            <div className="text-sm font-semibold text-[#0055B8] mb-4">
              Sri Lanka Ports Authority (SLPA)
            </div>

            <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold mb-1">
              Estimated Budget
            </div>
            <div className="font-display text-3xl font-black text-[#111827] mb-4">
              48 500 000 LKR
            </div>

            <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold mb-1">
              Submission Deadline
            </div>
            <div className="text-sm font-bold text-red-600">
              12 October 2026 (14:00 hrs)
            </div>
          </div>

          <div className="bg-[#0055B8] text-white p-6 rounded-md shadow-md">
            <div className="text-xs uppercase tracking-wider font-bold text-blue-200 mb-2">Bidding Document</div>
            <p className="text-xs text-blue-100 mb-4 leading-relaxed">
              Complete procurement schedule, bill of quantities (BOQ), and technical specs available.
            </p>
            <button className="w-full bg-white text-[#0055B8] hover:bg-gray-100 font-bold text-xs py-3 px-4 rounded transition-colors uppercase tracking-wider flex items-center justify-between">
              <span>Download RFP PDF</span>
              <span>↓</span>
            </button>
          </div>
        </aside>

        {/* Main Tender Details */}
        <main className="lg:col-span-9 bg-white border border-[#E2E6ED] p-8 lg:p-12 rounded-lg shadow-sm">
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#0055B8] text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
              Federal Contract
            </span>
            <span className="bg-[#F3F5F8] text-gray-700 text-[11px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
              Maritime Infrastructure
            </span>
            <span className="text-xs text-gray-500">
              Published: 12.08.2026
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#111827] uppercase leading-tight mb-8">
            REPAIR OF SOUTHERN MARITIME PORT INFRASTRUCTURE &amp; DOCKING FACILITIES
          </h1>

          {/* Section 1: Overview */}
          <div className="border-t border-[#E2E6ED] pt-8 mb-8">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider mb-4">
              1. Scope of Work
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              The Sri Lanka Ports Authority invites sealed bids from experienced engineering contractors for the comprehensive structural rehabilitation, underwater piling reinforcement, and dock apron resurfacing at the Southern Maritime Terminal.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Work includes cathodic protection replacement, fender installation, and high-load pavement reconstruction over a scheduled 180-day execution period.
            </p>
          </div>

          {/* Section 2: Eligibility */}
          <div className="border-t border-[#E2E6ED] pt-8 mb-8">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider mb-4">
              2. Minimum Eligibility Criteria
            </h2>
            <ul className="text-sm text-gray-600 flex flex-col gap-2.5">
              <li className="flex items-start gap-2">
                <span className="text-[#0055B8] font-bold">•</span>
                <span>Valid registration with CIDA (Construction Industry Development Authority) Grade C2 or above in Maritime / Civil Works.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055B8] font-bold">•</span>
                <span>Minimum annual turnover of not less than LKR 120,000,000 in the last 3 financial years.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055B8] font-bold">•</span>
                <span>Bid security bond of LKR 500,000 issued by a licensed commercial bank in Sri Lanka.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Submission Details */}
          <div className="border-t border-[#E2E6ED] pt-8">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider mb-4">
              3. Submission &amp; Inquiries
            </h2>
            <div className="bg-[#F3F5F8] p-6 rounded-md text-sm text-gray-700 space-y-2">
              <p><strong>Submission Address:</strong> Chairman, Departmental Procurement Committee, SLPA Headquarters, No. 19, Chaithya Road, Colombo 01.</p>
              <p><strong>Inquiry Tel:</strong> +94 11 242 1234 (Chief Port Engineer)</p>
              <p><strong>Official Email:</strong> procurement.marine@slpa.lk</p>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
