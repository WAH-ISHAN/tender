import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-[460px] mx-auto px-6 py-16">
      <div className="bg-white border border-[#E2E6ED] p-8 lg:p-10 rounded-lg shadow-sm">
        
        <h1 className="font-display text-4xl font-black text-[#111827] uppercase mb-2 text-center">
          SUPPLIER PORTAL LOGIN
        </h1>
        <p className="text-xs text-[#6B7280] text-center mb-8">
          Enter your authorized credentials to access live tender gazettes
        </p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6B7280]">Email Address</label>
            <input 
              type="email" 
              placeholder="supplier@company.lk" 
              className="search-input-box w-full"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#6B7280]">Password</label>
              <Link href="#" className="text-xs text-[#0055B8] hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="search-input-box w-full"
            />
          </div>

          <button
            type="button"
            className="w-full bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-sm py-3.5 rounded-md transition-colors shadow-sm mt-2 uppercase tracking-wider"
          >
            Sign In to Portal
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 mt-8 pt-6 border-t border-[#E2E6ED]">
          New contractor or enterprise?{" "}
          <Link href="/register" className="text-[#0055B8] font-bold hover:underline">
            Register for Free
          </Link>
        </div>

      </div>
    </div>
  );
}
