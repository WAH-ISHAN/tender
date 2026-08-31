"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toaster";

const CATEGORIES = [
  "Civil Construction & Infrastructure",
  "Computer, IT & Server Hardware",
  "Medical Equipment & Pharmaceuticals",
  "Renewable Energy & Solar Power",
  "Janitorial, Security & Facility Services",
  "Printing, Media & Advertising",
];

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || firstName.trim().length < 2) {
      toast.error("Validation Required", "Please enter your first name (minimum 2 characters).");
      return;
    }
    if (!lastName.trim() || lastName.trim().length < 2) {
      toast.error("Validation Required", "Please enter your last name (minimum 2 characters).");
      return;
    }
    if (!businessName.trim() || businessName.trim().length < 3) {
      toast.error("Validation Required", "Please enter your registered legal company name.");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast.error("Invalid Corporate Email", "Please enter a valid business email address.");
      return;
    }
    if (!password || password.length < 8) {
      toast.error("Password Too Weak", "Password must be at least 8 characters in length.");
      return;
    }

    setIsSubmitting(true);
    toast.success(
      "Registration Successful",
      `Welcome ${firstName}! Your supplier workspace for "${businessName}" is ready.`
    );

    setTimeout(() => {
      router.push("/login?registered=true");
    }, 1500);
  };

  return (
    <div className="max-w-[540px] mx-auto px-6 py-16">
      <div className="bg-white border border-slate-200/90 p-8 lg:p-10 rounded-2xl shadow-md">
        
        <h1 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] uppercase mb-2 text-center tracking-tight">
          SUPPLIER REGISTRATION
        </h1>
        <p className="text-xs text-slate-500 font-normal text-center mb-8">
          Register your company to receive daily procurement notifications &amp; tender RFPs
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Kamal"
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Perera"
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Registered Business Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Perera Engineering (Pvt) Ltd"
              className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          {/* Modern Floating Category Dropdown */}
          <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Primary Category of Interest</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200 focus:bg-white focus:border-[#0055B8] rounded-xl py-3 px-4 text-left transition-all text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between gap-2 cursor-pointer shadow-2xs"
            >
              <span className="truncate">{category}</span>
              <svg
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-[#0055B8]" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn divide-y divide-slate-50">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      category === cat ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    {category === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#0055B8]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Corporate Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kamal@perera.lk"
              className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Create Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0055B8] hover:bg-[#004394] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 shadow-md mt-2 uppercase tracking-wider cursor-pointer"
          >
            {isSubmitting ? "Creating Workspace..." : "Complete Free Registration"}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 font-normal mt-8 pt-6 border-t border-slate-200">
          Already have an authorized supplier account?{" "}
          <Link href="/login" className="text-[#0055B8] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
