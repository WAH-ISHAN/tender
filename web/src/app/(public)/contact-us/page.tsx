import Link from "next/link";

export default function ContactUsPage() {
  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Subnav */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4 pt-4 text-[13px] text-[#6B7280]">
          <Link href="#" className="text-[#0055B8] font-bold">[Contact Desk]</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Headquarters</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Tender Submissions</Link>
          <Link href="#" className="hover:text-[#0055B8] transition-colors">Support &amp; Billing</Link>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#111827] uppercase leading-none mb-6">
            CONTACT THE DESK
          </h1>
          <p className="text-lg text-[#6B7280] max-w-3xl mb-12 font-normal leading-relaxed">
            Reach our procurement intelligence officers, editorial verification team, or publisher relations desk.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white border border-[#E2E6ED] p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-[#111827] mb-6">Submit an Inquiry</h2>
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6B7280]">Full Name</label>
                    <input type="text" placeholder="John Silva" className="search-input-box w-full" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6B7280]">Company Organization</label>
                    <input type="text" placeholder="Silva Enterprises Ltd" className="search-input-box w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6B7280]">Email Address</label>
                    <input type="email" placeholder="john@silva.lk" className="search-input-box w-full" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6B7280]">Phone Number</label>
                    <input type="tel" placeholder="+94 77 XXX XXXX" className="search-input-box w-full" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6B7280]">Subject / Department</label>
                  <select className="search-input-box w-full cursor-pointer">
                    <option>General Inquiries &amp; Information</option>
                    <option>Publish a Private Tender Notice</option>
                    <option>Subscription &amp; Payment Support</option>
                    <option>API &amp; Bulk Procurement Data</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6B7280]">Your Message</label>
                  <textarea rows={5} placeholder="Describe your request..." className="search-input-box w-full resize-y"></textarea>
                </div>

                <button
                  type="button"
                  className="bg-[#0055B8] hover:bg-[#004394] text-white font-semibold py-3.5 px-8 rounded-md transition-colors shadow-sm self-start mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Direct Contact Cards Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#F3F5F8] p-8 rounded-md border border-[#E2E6ED]">
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#0055B8] mb-2">Central Office</h3>
                <div className="text-lg font-bold text-[#111827] mb-2">Lansu Procurement Headquarters</div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Level 14, World Trade Centre, Echelon Square, Colombo 01, Sri Lanka.
                </p>
                <div className="text-sm font-semibold text-gray-800">
                  Tel: +94 11 200 8000 / +94 11 200 8001
                </div>
                <div className="text-sm text-[#0055B8] mt-1 font-medium">
                  tenders@lansu.lk
                </div>
              </div>

              <div className="bg-[#0055B8] text-white p-8 rounded-md shadow-md">
                <div className="text-xs uppercase tracking-wider font-bold text-blue-200 mb-2">Editorial Desk</div>
                <div className="text-xl font-bold mb-2">Publish a Tender or RFP</div>
                <p className="text-sm text-blue-100 leading-relaxed mb-4">
                  Need to broadcast an Expression of Interest or Vendor Registration to 3,200+ verified Sri Lankan suppliers?
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 font-bold text-sm text-white border-b border-white pb-0.5 hover:text-blue-200 transition-colors"
                >
                  <span>Submit Tender Notice</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
