"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_TENDERS, TenderItem } from "@/data/tenders";

const CATEGORIES = [
  { id: "construction", name: "Civil Construction & Works", count: "7,767" },
  { id: "it", name: "Computer, Servers & IT", count: "3,694" },
  { id: "suppliers", name: "Registration of Suppliers", count: "3,217" },
  { id: "medical", name: "Medical & Pharmaceuticals", count: "1,991" },
  { id: "cleaning", name: "Janitorial & Facilities", count: "1,916" },
  { id: "energy", name: "Renewable Energy & Solar", count: "1,248" },
  { id: "consultancy", name: "Consultancy & Legal", count: "982" },
  { id: "transport", name: "Transport & Logistics", count: "890" },
  { id: "security", name: "Security & Guarding", count: "743" },
  { id: "food", name: "Food, Catering & Agri", count: "650" },
];

const PROVINCES = [
  { id: "all", name: "All Provinces (National)" },
  { id: "western", name: "Western Province" },
  { id: "central", name: "Central Province" },
  { id: "southern", name: "Southern Province" },
  { id: "north-western", name: "North Western Province" },
  { id: "northern", name: "Northern Province" },
  { id: "eastern", name: "Eastern Province" },
  { id: "sabaragamuwa", name: "Sabaragamuwa Province" },
  { id: "uva", name: "Uva Province" },
  { id: "north-central", name: "North Central Province" },
];

const VALUE_BANDS = [
  { id: "all", name: "All Value Bands" },
  { id: "<5M", name: "Under Rs. 5M (Micro/SME)" },
  { id: "5M-25M", name: "Rs. 5M - 25M (Standard)" },
  { id: "25M-100M", name: "Rs. 25M - 100M (Corporate)" },
  { id: "100M-500M", name: "Rs. 100M - 500M (Major Works)" },
  { id: ">500M", name: "Over Rs. 500M (Mega Projects)" },
];

export default function HomePage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedValueBand, setSelectedValueBand] = useState<string>("all");
  const [closingWindow, setClosingWindow] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<"all" | "government" | "private" | "donor">("all");
  const [sortBy, setSortBy] = useState("closing");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // View Mode: Cards vs Dense List
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  // Bookmarking Watchlist
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());

  // Modern Dropdown State (Category, Province, Value Band, Deadline)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      const inFilter = filterBarRef.current && filterBarRef.current.contains(e.target as Node);
      const inSort = sortDropdownRef.current && sortDropdownRef.current.contains(e.target as Node);
      if (!inFilter && !inSort) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        if (isSearchFocused) setIsSearchFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchFocused]);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedTenders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const applyPreset = (preset: string) => {
    if (activePreset === preset) {
      setActivePreset(null);
      setSectorFilter("all");
      setSelectedProvince("all");
      setClosingWindow("all");
      return;
    }
    setActivePreset(preset);
    if (preset === "urgent") {
      setClosingWindow("7days");
      setSortBy("closing");
    } else if (preset === "gov") {
      setSectorFilter("government");
    } else if (preset === "western") {
      setSelectedProvince("western");
    }
  };

  const filteredTenders = useMemo(() => {
    let result = MOCK_TENDERS.filter((item) => {
      const matchKeyword =
        keyword === "" ||
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.entity.toLowerCase().includes(keyword.toLowerCase()) ||
        item.ref.toLowerCase().includes(keyword.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(keyword.toLowerCase()) ||
        item.source.toLowerCase().includes(keyword.toLowerCase());

      const matchCategory =
        selectedCategory === "all" || item.categoryId === selectedCategory;

      const matchProvince =
        selectedProvince === "all" || item.province === selectedProvince;

      const matchValueBand =
        selectedValueBand === "all" || item.valueBand === selectedValueBand;

      const matchSector =
        sectorFilter === "all" || item.sector === sectorFilter;

      const matchClosing =
        closingWindow === "all" ||
        (closingWindow === "3days" && item.daysLeft <= 3) ||
        (closingWindow === "7days" && item.daysLeft <= 7) ||
        (closingWindow === "30days" && item.daysLeft <= 30);

      const matchHighValue =
        activePreset !== "highValue" || item.amountNumeric >= 30000000;

      return matchKeyword && matchCategory && matchProvince && matchValueBand && matchSector && matchClosing && matchHighValue;
    });

    if (sortBy === "closing") {
      result.sort((a, b) => a.daysLeft - b.daysLeft);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === "amountDesc") {
      result.sort((a, b) => b.amountNumeric - a.amountNumeric);
    } else if (sortBy === "amountAsc") {
      result.sort((a, b) => a.amountNumeric - b.amountNumeric);
    }

    return result;
  }, [keyword, selectedCategory, selectedProvince, selectedValueBand, sectorFilter, closingWindow, sortBy, activePreset]);

  const handleReset = () => {
    setKeyword("");
    setSelectedCategory("all");
    setSelectedProvince("all");
    setSelectedValueBand("all");
    setClosingWindow("all");
    setSectorFilter("all");
    setActivePreset(null);
  };

  const hasActiveFilters =
    keyword !== "" ||
    selectedCategory !== "all" ||
    selectedProvince !== "all" ||
    selectedValueBand !== "all" ||
    sectorFilter !== "all" ||
    closingWindow !== "all" ||
    activePreset !== null;

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* 1. ELEGANT HERO BANNER WITH FULL SECTION BACKGROUND IMAGE & INTEGRATED SEARCH ENGINE */}
      <section className="relative rounded-3xl mb-12 shadow-2xl bg-[#0A1633] text-white border border-slate-800 z-20">
        
        {/* Full Section Background Image Container (Rounded & Isolated so dropdowns never get clipped) */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-75 scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2000&auto=format&fit=crop')`,
            }}
          />
          {/* Soft Contrast Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#07132F]/80 via-[#0A1E4A]/55 to-[#07132F]/75" />
        </div>

        <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-14">
          
          {/* Top Heading */}
          <div className="mb-8 max-w-3xl">
            <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-300 mb-2">
              THE LARGEST COLLECTION OF
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] mb-3">
              TENDERS IN SRI LANKA
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed max-w-2xl">
              We take pride in our verified procurement services which we have had the pleasure of providing to our valued contractors &amp; suppliers across Sri Lanka.
            </p>
          </div>

          {/* FULL INTEGRATED SEARCH & FILTER PANEL INSIDE HERO */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-900 border border-slate-100">
            
            {/* Primary Search Bar */}
            <div className="mb-4 relative" ref={searchContainerRef}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by tender title, procuring entity, reference code, or keywords..."
                  value={keyword}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 pl-4 pr-16 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {keyword && (
                    <button
                      onClick={() => setKeyword("")}
                      className="text-slate-400 hover:text-slate-700 font-black text-lg mr-1"
                    >
                      &times;
                    </button>
                  )}
                  <kbd className="hidden sm:inline-block bg-slate-200 text-slate-600 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300">
                    /
                  </kbd>
                </div>
              </div>

              {/* On-Focus Popover */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-3.5 animate-fadeIn">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Recent Search Queries
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["solar infrastructure", "road rehabilitation", "pharmaceuticals", "enterprise server hardware", "janitorial maintenance"].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setKeyword(term);
                          setIsSearchFocused(false);
                        }}
                        className="bg-slate-100 hover:bg-blue-50 hover:text-[#0055B8] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-slate-700"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4 Core Dropdowns + Action CTA (Modernized Custom UI) */}
            <div ref={filterBarRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-4">
              
              {/* Modern Category Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "category" ? null : "category")}
                  className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#0055B8] focus:border-[#0055B8] focus:bg-white rounded-xl p-2.5 sm:p-3 text-left transition-all hover:shadow-sm flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      CATEGORY
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0F172A] truncate block">
                      {selectedCategory === "all" ? `All Categories (${CATEGORIES.length})` : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${activeDropdown === "category" ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {activeDropdown === "category" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 max-h-64 overflow-y-auto animate-fadeIn divide-y divide-slate-50">
                    <button
                      type="button"
                      onClick={() => { setSelectedCategory("all"); setActiveDropdown(null); }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedCategory === "all" ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>All Categories ({CATEGORIES.length})</span>
                      {selectedCategory === "all" && <span className="w-2 h-2 rounded-full bg-[#0055B8]" />}
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => { setSelectedCategory(cat.id); setActiveDropdown(null); }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat.id ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {selectedCategory === cat.id && <span className="w-2 h-2 rounded-full bg-[#0055B8]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modern Province Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "province" ? null : "province")}
                  className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#0055B8] focus:border-[#0055B8] focus:bg-white rounded-xl p-2.5 sm:p-3 text-left transition-all hover:shadow-sm flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      PROVINCE
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0F172A] truncate block">
                      {PROVINCES.find(p => p.id === selectedProvince)?.name || "All Provinces (National)"}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${activeDropdown === "province" ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {activeDropdown === "province" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 max-h-64 overflow-y-auto animate-fadeIn divide-y divide-slate-50">
                    {PROVINCES.map((prov) => (
                      <button
                        key={prov.id}
                        type="button"
                        onClick={() => { setSelectedProvince(prov.id); setActiveDropdown(null); }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          selectedProvince === prov.id ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{prov.name}</span>
                        {selectedProvince === prov.id && <span className="w-2 h-2 rounded-full bg-[#0055B8]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modern Value Band Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "valueBand" ? null : "valueBand")}
                  className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#0055B8] focus:border-[#0055B8] focus:bg-white rounded-xl p-2.5 sm:p-3 text-left transition-all hover:shadow-sm flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      VALUE BAND
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0F172A] truncate block">
                      {VALUE_BANDS.find(v => v.id === selectedValueBand)?.name || "All Value Bands"}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${activeDropdown === "valueBand" ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {activeDropdown === "valueBand" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 max-h-64 overflow-y-auto animate-fadeIn divide-y divide-slate-50">
                    {VALUE_BANDS.map((band) => (
                      <button
                        key={band.id}
                        type="button"
                        onClick={() => { setSelectedValueBand(band.id); setActiveDropdown(null); }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          selectedValueBand === band.id ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{band.name}</span>
                        {selectedValueBand === band.id && <span className="w-2 h-2 rounded-full bg-[#0055B8]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modern Closing Deadline Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "deadline" ? null : "deadline")}
                  className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#0055B8] focus:border-[#0055B8] focus:bg-white rounded-xl p-2.5 sm:p-3 text-left transition-all hover:shadow-sm flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      CLOSING DEADLINE
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0F172A] truncate block">
                      {closingWindow === "3days" ? "Next 3 Days (Urgent)" :
                       closingWindow === "7days" ? "Next 7 Days" :
                       closingWindow === "30days" ? "Next 30 Days" : "Any Closing Date"}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${activeDropdown === "deadline" ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {activeDropdown === "deadline" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn divide-y divide-slate-50">
                    {[
                      { id: "all", label: "Any Closing Date" },
                      { id: "3days", label: "Next 3 Days (Urgent)" },
                      { id: "7days", label: "Next 7 Days" },
                      { id: "30days", label: "Next 30 Days" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => { setClosingWindow(opt.id); setActiveDropdown(null); }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          closingWindow === opt.id ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {closingWindow === opt.id && <span className="w-2 h-2 rounded-full bg-[#0055B8]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const element = document.getElementById("tender-results-section");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 hover:shadow-md uppercase tracking-wider shadow-sm whitespace-nowrap cursor-pointer"
                >
                  FIND TENDERS
                </button>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-[40px] px-3.5 border-2 border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-extrabold rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

            </div>

            {/* Quick Filters Row */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
                QUICK FILTERS:
              </span>
              <button
                type="button"
                onClick={() => applyPreset("urgent")}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  activePreset === "urgent"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs font-bold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium"
                }`}
              >
                Closing in ≤ 7 Days
              </button>
              <button
                type="button"
                onClick={() => applyPreset("gov")}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  activePreset === "gov"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs font-bold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium"
                }`}
              >
                Central Government
              </button>
              <button
                type="button"
                onClick={() => applyPreset("highValue")}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  activePreset === "highValue"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs font-bold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium"
                }`}
              >
                High Value (&gt; 30M LKR)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("western")}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  activePreset === "western"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs font-bold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium"
                }`}
              >
                Western Province
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 2. MAIN 2-COLUMN STRUCTURAL LAYOUT WITH AMPLE BREATHING ROOM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
        
        {/* LEFT COLUMN: NAVIGATION & TAXONOMY */}
        <aside className="lg:col-span-3 xl:col-span-2 hidden lg:flex flex-col space-y-6 sticky top-28">
          
          {/* Buyer CTA Banner */}
          <div className="bg-[#0F172A] text-white p-5 rounded-2xl shadow-lg border border-slate-700 hover:-translate-y-1 transition-all duration-300">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 block mb-1.5">
              FOR PROCURING ENTITIES
            </span>
            <h4 className="text-sm font-black leading-tight mb-2 text-white">
              Publish Your Tenders Free
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Connect with 3,200+ verified Sri Lankan suppliers and contractors.
            </p>
            <Link
              href="/register"
              className="block text-center bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-xs py-2.5 px-3 rounded-lg uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 shadow-md"
            >
              + Post Tender Notice
            </Link>
          </div>

          {/* Fixed Value Band Filter */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-3">
              VALUE BANDS
            </span>
            <div className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
              {VALUE_BANDS.map((band) => {
                const isSelected = selectedValueBand === band.id;
                return (
                  <button
                    key={band.id}
                    type="button"
                    onClick={() => setSelectedValueBand(band.id)}
                    className={`py-2 px-3 rounded-lg text-left flex items-center justify-between transition-all hover:translate-x-1 active:scale-98 cursor-pointer ${
                      isSelected
                        ? "bg-[#0055B8] text-white font-bold shadow-sm"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{band.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Taxonomy */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                CATEGORIES
              </span>
              <span className="text-[11px] text-slate-400 font-mono">39,942</span>
            </div>

            <nav className="flex flex-col gap-1.5 text-xs text-slate-700">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`py-2 px-3 rounded-lg text-left flex items-center justify-between transition-all hover:translate-x-1 active:scale-98 cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#0055B8] text-white font-bold shadow-sm"
                    : "hover:bg-slate-100 font-semibold"
                }`}
              >
                <span>All Categories</span>
              </button>

              {CATEGORIES.slice(0, 7).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-2 px-3 rounded-lg text-left flex items-center justify-between transition-all hover:translate-x-1 active:scale-98 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#0055B8] text-white font-bold shadow-sm"
                      : "hover:bg-slate-100 font-semibold text-slate-700"
                  }`}
                >
                  <span className="truncate pr-1">{cat.name}</span>
                  <span className="opacity-70 font-mono text-[11px]">{cat.count}</span>
                </button>
              ))}
            </nav>
          </div>

        </aside>

        {/* RIGHT COLUMN: DIRECT TENDER RESULTS */}
        <main className="lg:col-span-9 xl:col-span-10">

          {/* 4. RESULTS HEADER & CONTROLS */}
          <section id="tender-results-section" className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                  Tender Notices ({filteredTenders.length})
                </h3>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  Verified procurement publications
                </span>
              </div>

              {/* View Switcher & Sort Selector */}
              <div className="flex items-center gap-3">
                
                {/* Capsule View Switcher (Exact Screenshot Match) */}
                <div className="inline-flex bg-[#F1F5F9] border border-[#E2E8F0] p-1 rounded-xl shadow-sm">
                  <button
                    type="button"
                    onClick={() => setViewMode("cards")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 ${
                      viewMode === "cards" ? "bg-white text-[#0055B8] shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Grid Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 ${
                      viewMode === "list" ? "bg-white text-[#0055B8] shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Dense List
                  </button>
                </div>

                {/* Modern Custom Sort Dropdown */}
                <div ref={sortDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === "sort" ? null : "sort")}
                    className="bg-[#F1F5F9] hover:bg-white border border-[#E2E8F0] hover:border-[#0055B8] focus:border-[#0055B8] rounded-xl px-4 py-2 text-xs font-black text-slate-800 outline-none shadow-sm cursor-pointer transition-all flex items-center justify-between gap-2.5 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>
                      {sortBy === "closing" ? "Sort: Closing Soonest" :
                       sortBy === "newest" ? "Sort: Newly Published" :
                       sortBy === "amountDesc" ? "Sort: Budget (High to Low)" :
                       "Sort: Budget (Low to High)"}
                    </span>
                    <svg className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${activeDropdown === "sort" ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {activeDropdown === "sort" && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn divide-y divide-slate-50">
                      {[
                        { id: "closing", label: "Sort: Closing Soonest" },
                        { id: "newest", label: "Sort: Newly Published" },
                        { id: "amountDesc", label: "Sort: Budget (High to Low)" },
                        { id: "amountAsc", label: "Sort: Budget (Low to High)" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => { setSortBy(opt.id); setActiveDropdown(null); }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            sortBy === opt.id ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-[#0055B8]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </section>

          {/* 5. RESULTS DISPLAY: DIRECT NAVIGATION TO FULL PAGE ON CLICK */}
          {viewMode === "cards" ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
              {filteredTenders.map((tender, index) => {
                const isSaved = savedTenders.has(tender.id);
                const isFirst = index === 0;

                return (
                  <Link
                    key={tender.id}
                    href={`/tender/${tender.id}`}
                    className={`bg-white rounded-2xl p-6 flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer group min-h-[290px] no-underline block transform-gpu ${
                      isFirst ? "border-2 border-[#0055B8] shadow-lg" : "border-2 border-slate-200/90 hover:border-[#0055B8]"
                    }`}
                  >
                    <div>
                      {/* Top Authority (30% Blue) & Urgency Row */}
                      <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-slate-100 text-xs">
                        <span className="font-extrabold text-[#0055B8] uppercase tracking-wider truncate text-[11px]">
                          {tender.entity}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#F1F5F9] text-[#0055B8] border border-[#E2E8F0] shadow-2xs group-hover:bg-blue-50/80 transition-colors">
                            {tender.daysLeft}d left
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(e, tender.id)}
                            title={isSaved ? "Remove from watchlist" : "Save to watchlist"}
                            className="p-1.5 rounded-lg bg-[#F1F5F9] hover:bg-white border border-[#E2E8F0] text-slate-400 hover:text-[#0055B8] transition-all hover:scale-110 active:scale-90 shadow-2xs"
                          >
                            <svg 
                              className={`w-3.5 h-3.5 ${isSaved ? "fill-[#0055B8] text-[#0055B8]" : "fill-none text-slate-400"}`} 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Main Title (20% Black) */}
                      <h4 className="text-[15px] sm:text-base font-extrabold text-[#0F172A] leading-snug mb-3.5 group-hover:text-[#0055B8] transition-colors line-clamp-2">
                        {tender.title}
                      </h4>

                      {/* Key Meta Badges with Unified Capsule Look */}
                      <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                        <span className="bg-[#F1F5F9] group-hover:bg-blue-50/90 text-[#0055B8] border border-[#E2E8F0] px-3 py-1 rounded-xl font-bold transition-all shadow-2xs group-hover:shadow-xs">
                          {tender.categoryName}
                        </span>
                        <span className="bg-[#F1F5F9] text-slate-700 border border-[#E2E8F0] px-3 py-1 rounded-xl font-semibold shadow-2xs">
                          {tender.district}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px] px-1 py-1">
                          Ref: {tender.ref}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Budget (20% Black) & Action (30% Blue) */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-2">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                          Budget Estimate
                        </div>
                        <div className="text-base sm:text-lg font-black text-[#0F172A] font-mono tracking-tight">
                          {tender.amount}
                        </div>
                      </div>
                      
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F1F5F9] group-hover:bg-[#0055B8] group-hover:text-white text-[#0055B8] font-bold text-xs rounded-xl border border-[#E2E8F0] group-hover:border-[#0055B8] transition-all duration-200 shadow-xs group-hover:translate-x-1 group-hover:shadow-md">
                        <span>View Details</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </section>
          ) : (
            /* DENSE TABLE VIEW WITH DIRECT FULL PAGE LINK */
            <section className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden mb-16 shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-500 font-black uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-5 py-4 w-[22%] min-w-[180px] align-middle">Procuring Entity &amp; Ref</th>
                      <th className="px-5 py-4 w-[32%] min-w-[240px] align-middle">Tender Title</th>
                      <th className="px-5 py-4 w-[18%] min-w-[170px] align-middle text-center">Category</th>
                      <th className="px-5 py-4 w-[14%] min-w-[140px] align-middle text-center">Closing Date</th>
                      <th className="px-5 py-4 w-[10%] min-w-[110px] align-middle text-right">Value (LKR)</th>
                      <th className="px-5 py-4 w-[4%] min-w-[90px] align-middle text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-900">
                    {filteredTenders.map((tender) => {
                      const isSaved = savedTenders.has(tender.id);
                      return (
                        <tr 
                          key={tender.id}
                          onClick={() => router.push(`/tender/${tender.id}`)}
                          className="hover:bg-blue-50/40 cursor-pointer transition-colors duration-150"
                        >
                          <td className="px-5 py-4 align-middle">
                            <div className="font-extrabold text-[#0055B8] leading-snug">{tender.entity}</div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">{tender.ref}</div>
                          </td>
                          
                          <td className="px-5 py-4 align-middle font-black text-[#0F172A] leading-snug">
                            <Link href={`/tender/${tender.id}`} className="hover:text-[#0055B8] transition-colors block">
                              {tender.title}
                            </Link>
                          </td>
                          
                          <td className="px-5 py-4 align-middle text-center whitespace-nowrap">
                            <span className="inline-flex items-center justify-center bg-[#F1F5F9] text-[#0055B8] border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-2xs whitespace-nowrap">
                              {tender.categoryName}
                            </span>
                          </td>
                          
                          <td className="px-5 py-4 align-middle text-center whitespace-nowrap font-mono text-xs">
                            <span className="inline-flex items-center justify-center text-[#0055B8] font-bold bg-[#F1F5F9] px-3 py-1.5 rounded-xl border border-[#E2E8F0] shadow-2xs whitespace-nowrap">
                              {tender.endDate} ({tender.daysLeft}d left)
                            </span>
                          </td>
                          
                          <td className="px-5 py-4 align-middle font-mono font-black text-right text-[#0F172A] whitespace-nowrap text-sm">
                            {tender.amount}
                          </td>
                          
                          <td className="px-5 py-4 align-middle text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={(e) => toggleBookmark(e, tender.id)}
                                title={isSaved ? "Remove from watchlist" : "Save to watchlist"}
                                className="p-2 rounded-xl bg-[#F1F5F9] hover:bg-white border border-[#E2E8F0] text-slate-400 hover:text-[#0055B8] transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer"
                              >
                                <svg 
                                  className={`w-3.5 h-3.5 ${isSaved ? "fill-[#0055B8] text-[#0055B8]" : "fill-none text-slate-400"}`} 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor" 
                                  strokeWidth={2}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </button>
                              <Link 
                                href={`/tender/${tender.id}`}
                                className="px-3.5 py-1.5 bg-[#F1F5F9] hover:bg-[#0055B8] hover:text-white text-[#0055B8] font-black text-xs rounded-xl border border-[#E2E8F0] hover:border-[#0055B8] transition-all shadow-2xs hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
                              >
                                Details &rarr;
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </main>
      </div>

    </div>
  );
}
