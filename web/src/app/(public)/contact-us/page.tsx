"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toaster";

type SubnavTab = "contact" | "hq" | "submissions" | "billing";

export default function ContactUsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<SubnavTab>("contact");
  const [department, setDepartment] = useState("General Inquiries & Information");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form fields
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (tab: SubnavTab) => {
    setActiveTab(tab);
    setSubmitted(false);
    if (tab === "contact") setDepartment("General Inquiries & Information");
    else if (tab === "hq") setDepartment("Executive & Institutional Affairs");
    else if (tab === "submissions") setDepartment("Publish a Private Tender Notice");
    else if (tab === "billing") setDepartment("Subscription & Payment Support");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || fullName.trim().length < 2) {
      toast.error("Validation Required", "Please provide your full legal name (minimum 2 characters).");
      return;
    }
    if (!company.trim() || company.trim().length < 2) {
      toast.error("Validation Required", "Please provide your registered company or organization.");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast.error("Invalid Email Format", "Please provide a valid corporate email address.");
      return;
    }
    if (!phone.trim() || phone.replace(/[^0-9+]/g, "").length < 9) {
      toast.error("Invalid Contact Number", "Please provide a valid phone number (+94 ...).");
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      toast.error("Message Too Brief", "Please provide detailed inquiry instructions (minimum 10 characters).");
      return;
    }

    setSubmitted(true);
    toast.success("Inquiry Dispatched", `Your transmission has been forwarded to the ${department} desk.`);
  };

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Mobile & Tablet Horizontal Subnav Tabs (Rule #8 Interactive Navigation) */}
        <div className="lg:hidden col-span-1 flex overflow-x-auto custom-scrollbar gap-2 p-1.5 bg-[#F1F3F7] rounded-2xl border border-slate-200 mb-6">
          {[
            { id: "contact", label: "Contact Desk" },
            { id: "hq", label: "Headquarters" },
            { id: "submissions", label: "Tender Submissions" },
            { id: "billing", label: "Support & Billing" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id as SubnavTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-[#0055B8] shadow-xs"
                  : "text-slate-600 hover:text-black font-bold"
              }`}
            >
              {activeTab === tab.id ? `[${tab.label}]` : tab.label}
            </button>
          ))}
        </div>

        {/* Left Subnav (Desktop Interactive Navigation) */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4 pt-4 text-[13px]">
          <button
            type="button"
            onClick={() => handleTabChange("contact")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "contact" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "contact" ? "[Contact Desk]" : "Contact Desk"}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("hq")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "hq" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "hq" ? "[Headquarters]" : "Headquarters"}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("submissions")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "submissions" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "submissions" ? "[Tender Submissions]" : "Tender Submissions"}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("billing")}
            className={`text-left transition-colors cursor-pointer ${
              activeTab === "billing" ? "text-[#0055B8] font-bold" : "text-[#6B7280] hover:text-[#0055B8]"
            }`}
          >
            {activeTab === "billing" ? "[Support & Billing]" : "Support & Billing"}
          </button>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-10">
          
          {/* Dynamic Header according to active subnav */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-[#111827] uppercase leading-none mb-6">
            {activeTab === "contact" && "CONTACT THE DESK"}
            {activeTab === "hq" && "NATIONAL HEADQUARTERS"}
            {activeTab === "submissions" && "TENDER SUBMISSIONS"}
            {activeTab === "billing" && "SUPPORT & BILLING"}
          </h1>

          <p className="text-lg text-[#6B7280] max-w-3xl mb-12 font-normal leading-relaxed">
            {activeTab === "contact" &&
              "Reach our procurement intelligence officers, editorial verification team, or publisher relations desk."}
            {activeTab === "hq" &&
              "Executive operations, state entity protocol, and institutional oversight at World Trade Centre, Colombo."}
            {activeTab === "submissions" &&
              "Submit government gazettes, corporate procurement notices, expression of interest (EOI), and parate auctions."}
            {activeTab === "billing" &&
              "Assistance with offline bank claims, corporate annual subscriptions, invoice receipts, and billing verification."}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Column (Modernized Index Panel) */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-[#111827] mb-6">
                {activeTab === "contact" && "Submit an Inquiry"}
                {activeTab === "hq" && "Institutional Executive Inquiry"}
                {activeTab === "submissions" && "Publish a Notice Inquiry"}
                {activeTab === "billing" && "Billing & Account Verification"}
              </h2>

              {submitted ? (
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6 text-center animate-fadeIn">
                  <div className="text-[#0055B8] font-black text-lg mb-2">
                    Inquiry Received Successfully
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-4">
                    Your transmission has been logged. A designated procurement officer from the{" "}
                    <strong className="text-[#0055B8] font-bold">{department}</strong> desk will contact you within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="bg-[#0055B8] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#004394] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6B7280]">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Silva"
                        className="search-input-box w-full rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0055B8] p-3 text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6B7280]">Company Organization</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Silva Enterprises Ltd"
                        className="search-input-box w-full rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0055B8] p-3 text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6B7280]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@silva.lk"
                        className="search-input-box w-full rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0055B8] p-3 text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6B7280]">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+94 77 XXX XXXX"
                        className="search-input-box w-full rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0055B8] p-3 text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Modern Custom Dropdown for Subject / Department */}
                  <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
                    <label className="text-xs font-semibold text-[#6B7280]">Subject / Department</label>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="search-input-box w-full rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200 focus:bg-white focus:border-[#0055B8] p-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all flex items-center justify-between gap-2 cursor-pointer text-left"
                    >
                      <span className="truncate">{department}</span>
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
                        {[
                          "General Inquiries & Information",
                          "Publish a Private Tender Notice",
                          "Subscription & Payment Support",
                          "Executive & Institutional Affairs",
                          "API & Bulk Procurement Data",
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setDepartment(opt);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              department === opt ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span>{opt}</span>
                            {department === opt && <span className="w-1.5 h-1.5 rounded-full bg-[#0055B8]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6B7280]">Your Message</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your request..."
                      className="search-input-box w-full resize-y rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0055B8] p-3 text-xs sm:text-sm font-normal outline-none transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0055B8] hover:bg-[#004394] text-white font-semibold py-3 px-8 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm self-start mt-2 cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Cards Column (Modernized Index Panels) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Central Office Index Card */}
              <div className={`p-8 rounded-2xl border transition-all ${
                activeTab === "hq" ? "bg-white border-[#0055B8] shadow-md ring-2 ring-blue-100" : "bg-[#F3F5F8] border-slate-200/90 shadow-sm"
              }`}>
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#0055B8] mb-2">Central Office</h3>
                <div className="text-lg font-bold text-[#111827] mb-2">TenderHub Procurement Headquarters</div>
                <p className="text-sm text-gray-600 font-normal leading-relaxed mb-4">
                  Level 14, World Trade Centre, Echelon Square, Colombo 01, Sri Lanka.
                </p>
                <div className="text-sm font-semibold text-gray-800 font-mono">
                  Tel: +94 11 200 8000 / +94 11 200 8001
                </div>
                <div className="text-sm text-[#0055B8] mt-1 font-medium">
                  tenders@tenderhub.lk
                </div>
              </div>

              {/* Editorial Desk / Submissions Index Card */}
              <div className={`p-8 rounded-2xl transition-all ${
                activeTab === "submissions" ? "bg-[#004394] shadow-xl ring-2 ring-blue-300 text-white" : "bg-[#0055B8] text-white shadow-md"
              }`}>
                <div className="text-xs uppercase tracking-wider font-bold text-blue-200 mb-2">Editorial Desk</div>
                <div className="text-xl font-bold mb-2">Publish a Tender or RFP</div>
                <p className="text-sm text-blue-100 font-normal leading-relaxed mb-4">
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

              {/* Support & Billing Quick Info (Dynamic when Billing selected) */}
              {activeTab === "billing" && (
                <div className="bg-white border-2 border-[#0055B8] p-6 rounded-2xl shadow-md animate-fadeIn">
                  <div className="text-xs font-black uppercase text-[#0055B8] mb-1">Billing Priority Hotline</div>
                  <div className="text-sm font-bold text-slate-900 mb-2">Direct Bank Claim Verification</div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-3">
                    For faster activation of your Enterprise subscription, attach your bank transfer slip or contact:
                  </p>
                  <div className="font-mono text-xs font-bold text-slate-800">billing@tenderhub.lk</div>
                </div>
              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
