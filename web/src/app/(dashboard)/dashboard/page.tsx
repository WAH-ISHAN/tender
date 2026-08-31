"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_TENDERS, TenderItem } from "@/data/tenders";
import { useToast } from "@/components/ui/Toaster";

type DashboardView = "overview" | "related" | "favorites" | "settings";

function SupplierDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const tabParam = searchParams.get("tab") as DashboardView | null;
  const [activeView, setActiveView] = useState<DashboardView>(tabParam || "overview");

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: "Kamal Perera",
    company: "Perera Engineering & Infrastructure (Pvt) Ltd",
    brn: "PV-8849201",
    cidaGrade: "CIDA Grade C3 (Civil & Electro-Mechanical)",
    email: "kamal@pereraengineering.lk",
    phone: "+94 77 388 7615",
    preferredCategory: "Civil Construction & Works",
    whatsappAlerts: true,
    emailDigest: "daily",
  });

  // Watchlist / Bookmarks state
  const [watchlist, setWatchlist] = useState<string[]>([
    "SLPA-2026-PT-04",
    "RDA-2026-KY-044",
    "MOE-2026-SP-01",
  ]);

  // Sector filter for Related Tenders
  const [selectedSector, setSelectedSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (tabParam && ["overview", "related", "favorites", "settings"].includes(tabParam)) {
      setActiveView(tabParam);
    }
  }, [tabParam]);

  const handleLogout = () => {
    // Clear session cookie
    document.cookie = "tenderhub_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    toast.info("Logged Out", "You have been safely signed out of your supplier workspace.");
    setTimeout(() => {
      router.push("/login");
    }, 600);
  };

  const toggleBookmark = (id: string, refCode: string) => {
    if (watchlist.includes(id)) {
      setWatchlist((prev) => prev.filter((item) => item !== id));
      toast.info("Removed from Watchlist", `Tender notice ${refCode} removed from your watchlist.`);
    } else {
      setWatchlist((prev) => [...prev, id]);
      toast.success("Added to Watchlist", `Tender notice ${refCode} saved to your procurement watchlist.`);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile Updated", "Company credentials & notification preferences saved successfully.");
  };

  // Filtered tenders for Related view
  const relatedTenders = MOCK_TENDERS.filter((tender) => {
    const matchesSearch =
      searchQuery === "" ||
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.ref.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector =
      selectedSector === "all" || tender.categoryId.toLowerCase() === selectedSector.toLowerCase();
    return matchesSearch && matchesSector;
  });

  // Watched tenders for Favorites view
  const favoriteTenders = MOCK_TENDERS.filter((tender) => watchlist.includes(tender.id));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Top Corporate Workspace Banner */}
      <div className="bg-[#0A1633] text-white border-b border-slate-800">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-200">
                  SUPPLIER ENTERPRISE WORKSPACE
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-[11px] font-bold text-slate-300">
                  CIDA ID: {userProfile.brn}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                {userProfile.company}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-normal mt-1">
                Authorized Officer: <strong className="text-white font-bold">{userProfile.name}</strong> &bull; {userProfile.cidaGrade}
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2.5 rounded-2xl text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block">
                  SUBSCRIPTION TIER
                </span>
                <span className="text-xs font-black text-white">Business Bidder (Annual Active)</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2.5 bg-white/10 hover:bg-white text-white hover:text-[#0F172A] border border-white/20 font-black text-xs rounded-2xl transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: PROFILE & NAVIGATION CONTROLS */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0055B8] text-white flex items-center justify-center font-display text-2xl font-black mx-auto mb-3 shadow-md">
                KP
              </div>
              <h2 className="text-base font-black text-[#0F172A] leading-tight">
                {userProfile.name}
              </h2>
              <p className="text-xs text-[#0055B8] font-bold mt-0.5">
                Authorized Supplier
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-normal space-y-1">
                <div>{userProfile.company}</div>
                <div className="font-mono text-slate-700 font-bold">{userProfile.email}</div>
              </div>
            </div>

            {/* Sidebar Navigation Menu */}
            <nav className="bg-white border border-slate-200/90 rounded-3xl p-3 shadow-md divide-y divide-slate-100">
              {[
                { id: "overview", label: "Dashboard Overview" },
                { id: "related", label: "Related Live Tenders" },
                { id: "favorites", label: "Favourite / Watchlist", badge: watchlist.length },
                { id: "settings", label: "Company & User Details" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id as DashboardView)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                    activeView === item.id
                      ? "bg-[#EFF6FF] text-[#0055B8] shadow-2xs"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-bold"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#0055B8] text-white">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-slate-400 font-bold">&rsaquo;</span>
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Logout</span>
                <span className="text-slate-400 font-bold">&rsaquo;</span>
              </button>
            </nav>

            {/* Procurement Hotline Card */}
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-5 text-xs shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0055B8] block mb-1">
                PROCUREMENT HELPDESK
              </span>
              <div className="font-black text-slate-900 text-sm mb-1">CIDA &amp; Bidding Support</div>
              <p className="text-slate-600 font-normal leading-relaxed mb-3">
                Have questions regarding bid bonds, eligibility criteria, or parate auctions?
              </p>
              <div className="font-mono text-xs font-bold text-slate-900">+94 11 200 8000</div>
            </div>

          </aside>

          {/* RIGHT MAIN CONTENT PANEL */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* VIEW 1: DASHBOARD OVERVIEW */}
            {activeView === "overview" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* 4 High-Impact Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl shadow-md">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      MATCHING NOTICES
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#0055B8]">
                      {MOCK_TENDERS.length} Live
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal mt-1 block">In your target categories</span>
                  </div>

                  <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl shadow-md">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      CLOSING THIS WEEK
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                      4 Notices
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal mt-1 block">Action required soon</span>
                  </div>

                  <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl shadow-md">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      ACTIVE WATCHLIST
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#0055B8]">
                      {watchlist.length} Saved
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal mt-1 block">Tracked procurement bids</span>
                  </div>

                  <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl shadow-md">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      PIPELINE VALUE
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#0F172A] font-mono">
                      LKR 285.4M
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal mt-1 block">Aggregate tender opportunities</span>
                  </div>
                </div>

                {/* Welcome Intelligence Briefing */}
                <div className="bg-white border border-slate-200/90 p-7 sm:p-8 rounded-3xl shadow-md">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-2">
                    Welcome to TenderHub National Procurement Gateway
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6 max-w-4xl">
                    TenderHub aggregates, verifies, and delivers high-value government gazettes, municipal tenders, provincial notices, and corporate RFPs across all 9 provinces in Sri Lanka. All notices are validated daily at 05:00 AM with cryptographic SHA-256 evidence packs.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveView("related")}
                      className="px-5 py-2.5 bg-[#0055B8] hover:bg-[#004394] text-white font-black text-xs rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider cursor-pointer"
                    >
                      Browse Related Live Tenders &rarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView("favorites")}
                      className="px-5 py-2.5 bg-[#F1F5F9] hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                      View Watchlist ({watchlist.length})
                    </button>
                  </div>
                </div>

                {/* Top Recommended Live Tenders Feed */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#0F172A]">
                      Priority Tenders for Your Contractor Profile
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveView("related")}
                      className="text-xs font-black text-[#0055B8] hover:underline"
                    >
                      View All Related Tenders &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {MOCK_TENDERS.slice(0, 4).map((tender) => {
                      const isSaved = watchlist.includes(tender.id);
                      return (
                        <div
                          key={tender.id}
                          className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
                              <span className="text-[#0055B8] font-black uppercase text-[11px] truncate">
                                {tender.entity}
                              </span>
                              <span className="bg-[#EFF6FF] text-[#0055B8] font-bold text-[11px] px-2.5 py-0.5 rounded-lg border border-[#BFDBFE]">
                                {tender.daysLeft}d left
                              </span>
                            </div>

                            <h4 className="text-sm font-black text-[#0F172A] mb-2 leading-snug line-clamp-2">
                              {tender.title}
                            </h4>

                            <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                              <span className="bg-[#F1F5F9] text-[#0055B8] font-bold px-2.5 py-1 rounded-xl text-[11px] border border-slate-200">
                                {tender.categoryName}
                              </span>
                              <span className="text-slate-400 font-mono text-[11px]">
                                {tender.ref}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block">Est. Budget</span>
                              <span className="text-sm font-black text-[#0F172A] font-mono">{tender.amount}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleBookmark(tender.id, tender.ref)}
                                className={`p-2 rounded-xl border transition-all text-xs font-bold ${
                                  isSaved ? "bg-[#EFF6FF] text-[#0055B8] border-[#BFDBFE]" : "bg-[#F8FAFC] text-slate-400 border-slate-200 hover:text-[#0055B8]"
                                }`}
                              >
                                {isSaved ? "Saved" : "Save"}
                              </button>
                              <Link
                                href={`/tender/${tender.id}`}
                                className="px-3.5 py-2 bg-[#0055B8] hover:bg-[#004394] text-white font-black text-xs rounded-xl shadow-xs transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
                              >
                                Dossier &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: RELATED LIVE TENDERS */}
            {activeView === "related" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white border border-slate-200/90 p-6 sm:p-7 rounded-3xl shadow-md">
                  <h2 className="text-xl font-black text-[#0F172A] mb-2">
                    Related Live Procurement Opportunities
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                    Procurement notices matching your CIDA contractor registration categories, provincial operational areas, and business scope.
                  </p>

                  {/* Search & Sector Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-7">
                      <input
                        type="text"
                        placeholder="Search related tenders by title, ref code, or ministry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                      />
                    </div>
                    <div className="sm:col-span-5 flex items-center gap-2 overflow-x-auto pb-1">
                      {[
                        { id: "all", label: "All Sectors" },
                        { id: "construction", label: "Civil Works" },
                        { id: "solar", label: "Solar & Energy" },
                        { id: "it", label: "IT & Servers" },
                      ].map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => setSelectedSector(sec.id)}
                          className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                            selectedSector === sec.id
                              ? "bg-[#0055B8] text-white shadow-xs"
                              : "bg-[#F1F5F9] text-slate-700 hover:bg-slate-200 border border-slate-200"
                          }`}
                        >
                          {sec.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tender Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {relatedTenders.map((tender) => {
                    const isSaved = watchlist.includes(tender.id);
                    return (
                      <div
                        key={tender.id}
                        className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
                            <span className="text-[#0055B8] font-black uppercase text-[11px] truncate">
                              {tender.entity}
                            </span>
                            <span className="bg-[#EFF6FF] text-[#0055B8] font-bold text-[11px] px-2.5 py-0.5 rounded-lg border border-[#BFDBFE]">
                              {tender.daysLeft}d left
                            </span>
                          </div>

                          <h3 className="text-base font-black text-[#0F172A] mb-2 leading-snug">
                            {tender.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                            <span className="bg-[#F1F5F9] text-[#0055B8] font-bold px-3 py-1 rounded-xl text-xs border border-slate-200">
                              {tender.categoryName}
                            </span>
                            <span className="bg-[#F1F5F9] text-slate-700 font-semibold px-3 py-1 rounded-xl text-xs border border-slate-200">
                              {tender.district}
                            </span>
                            <span className="text-slate-400 font-mono text-[11px]">
                              {tender.ref}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">Est. Budget</span>
                            <span className="text-base font-black text-[#0F172A] font-mono">{tender.amount}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleBookmark(tender.id, tender.ref)}
                              className={`p-2.5 rounded-xl border text-xs font-black transition-all ${
                                isSaved ? "bg-[#EFF6FF] text-[#0055B8] border-[#BFDBFE]" : "bg-[#F8FAFC] text-slate-600 border-slate-200 hover:text-[#0055B8]"
                              }`}
                            >
                              {isSaved ? "Saved" : "Save"}
                            </button>
                            <Link
                              href={`/tender/${tender.id}`}
                              className="px-4 py-2.5 bg-[#0055B8] hover:bg-[#004394] text-white font-black text-xs rounded-xl shadow-xs transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
                            >
                              View Dossier &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW 3: FAVOURITES / WATCHLIST */}
            {activeView === "favorites" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white border border-slate-200/90 p-6 sm:p-7 rounded-3xl shadow-md flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#0F172A]">
                      Your Procurement Watchlist ({watchlist.length})
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                      Monitored tenders with real-time submission countdowns and bid security bond criteria.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveView("related")}
                    className="px-4 py-2 bg-[#EFF6FF] text-[#0055B8] border border-[#BFDBFE] font-black text-xs rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    + Add More Tenders
                  </button>
                </div>

                {favoriteTenders.length === 0 ? (
                  <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center shadow-md">
                    <div className="text-slate-400 font-bold text-lg mb-2">Your Watchlist is Currently Empty</div>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-md mx-auto mb-6">
                      Click the &quot;Save&quot; button on any tender to pin it to your workspace for deadline alerts and bidding tracking.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveView("related")}
                      className="px-6 py-3 bg-[#0055B8] text-white font-black text-xs rounded-xl uppercase tracking-wider shadow-md"
                    >
                      Browse Available Tenders
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteTenders.map((tender) => (
                      <div
                        key={tender.id}
                        className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#0055B8] font-black text-xs uppercase">{tender.entity}</span>
                            <span className="text-slate-300">&bull;</span>
                            <span className="font-mono text-xs text-slate-500">{tender.ref}</span>
                          </div>
                          <h3 className="text-base font-black text-[#0F172A] leading-snug">
                            {tender.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-normal">
                            <span>Deadline: <strong className="font-bold text-[#0055B8]">{tender.endDate} ({tender.daysLeft}d left)</strong></span>
                            <span>&bull;</span>
                            <span>Bid Bond: <strong className="font-bold text-slate-900">{tender.bidBond}</strong></span>
                            <span>&bull;</span>
                            <span>Fee: <strong className="font-bold text-slate-900">{tender.docFee}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleBookmark(tender.id, tender.ref)}
                            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-red-700 bg-[#F8FAFC] border border-slate-200 rounded-xl transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                          <Link
                            href={`/tender/${tender.id}`}
                            className="px-5 py-2.5 bg-[#0055B8] hover:bg-[#004394] text-white font-black text-xs rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
                          >
                            Full Dossier &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: COMPANY & USER DETAILS / SETTINGS */}
            {activeView === "settings" && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-10 shadow-md animate-fadeIn">
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-2">
                  Company Profile &amp; Intelligence Alerts
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-8">
                  Keep your authorized company registration, CIDA contractor grading, and automated alert delivery channels up to date.
                </p>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  
                  {/* Company Name & Registration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        Registered Business Name
                      </label>
                      <input
                        type="text"
                        required
                        value={userProfile.company}
                        onChange={(e) => setUserProfile({ ...userProfile, company: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        Business Reg Number (BRN) / PV
                      </label>
                      <input
                        type="text"
                        required
                        value={userProfile.brn}
                        onChange={(e) => setUserProfile({ ...userProfile, brn: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-mono font-bold text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Authorized Officer & CIDA Grade */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        Authorized Procurement Officer
                      </label>
                      <input
                        type="text"
                        required
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        CIDA Contractor Grading
                      </label>
                      <input
                        type="text"
                        required
                        value={userProfile.cidaGrade}
                        onChange={(e) => setUserProfile({ ...userProfile, cidaGrade: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        Corporate Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        Direct Mobile / WhatsApp Alerts
                      </label>
                      <input
                        type="tel"
                        required
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-mono font-bold text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Alert Delivery Settings */}
                  <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 space-y-3">
                    <div className="text-xs font-black uppercase tracking-wider text-[#0055B8]">
                      Automated Gazette Alert Preferences
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div>
                        <strong className="text-slate-900 font-bold block">WhatsApp Instant Alerts (05:00 AM)</strong>
                        <span className="text-slate-500 font-normal">Receive immediate PDF notice links on publish.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUserProfile({ ...userProfile, whatsappAlerts: !userProfile.whatsappAlerts })}
                        className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                          userProfile.whatsappAlerts ? "bg-[#0055B8] text-white" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {userProfile.whatsappAlerts ? "Active" : "Disabled"}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#0055B8] hover:bg-[#004394] text-white font-black text-xs rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                    <span className="text-xs text-slate-400 font-normal">
                      Last synchronized: Today at 08:30 IST
                    </span>
                  </div>
                </form>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

export default function SupplierDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-8 h-8 border-3 border-[#0055B8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Loading Supplier Workspace...
            </span>
          </div>
        </div>
      }
    >
      <SupplierDashboardContent />
    </Suspense>
  );
}
