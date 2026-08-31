import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="max-w-[540px] mx-auto px-6 py-16">
      <div className="bg-white border border-[#E2E6ED] p-8 lg:p-10 rounded-lg shadow-sm">
        
        <h1 className="font-display text-4xl font-black text-[#111827] uppercase mb-2 text-center">
          SUPPLIER REGISTRATION
        </h1>
        <p className="text-xs text-[#6B7280] text-center mb-8">
          Register your company to receive daily procurement notifications &amp; tender RFPs
        </p>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280]">First Name</label>
              <input type="text" placeholder="Kamal" className="search-input-box w-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280]">Last Name</label>
              <input type="text" placeholder="Perera" className="search-input-box w-full" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6B7280]">Registered Business Name</label>
            <input type="text" placeholder="Perera Engineering (Pvt) Ltd" className="search-input-box w-full" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6B7280]">Primary Category of Interest</label>
            <select className="search-input-box w-full cursor-pointer">
              <option>Civil Construction &amp; Infrastructure</option>
              <option>Computer, IT &amp; Server Hardware</option>
              <option>Medical Equipment &amp; Pharmaceuticals</option>
              <option>Renewable Energy &amp; Solar Power</option>
              <option>Janitorial, Security &amp; Facility Services</option>
              <option>Printing, Media &amp; Advertising</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6B7280]">Corporate Email Address</label>
            <input type="email" placeholder="kamal@perera.lk" className="search-input-box w-full" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6B7280]">Create Password</label>
            <input type="password" placeholder="••••••••" className="search-input-box w-full" />
          </div>

          <button
            type="button"
            className="w-full bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-sm py-3.5 rounded-md transition-colors shadow-sm mt-2 uppercase tracking-wider"
          >
            Complete Free Registration
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 mt-8 pt-6 border-t border-[#E2E6ED]">
          Already have an authorized supplier account?{" "}
          <Link href="/login" className="text-[#0055B8] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
