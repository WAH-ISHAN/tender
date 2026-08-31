"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_TENDERS, TenderItem } from "@/data/tenders";
import { useToast } from "@/components/ui/Toaster";
import { useLanguage } from "@/context/LanguageContext";

const CATEGORIES = [
  { id: "construction", name: "Civil Construction & Works", count: "7,767" },
  { id: "it", name: "Computer, Servers & IT", count: "3,694" },
  { id: "suppliers", name: "Registration of Suppliers", count: "3,217" },
  { id: "electrical", name: "Electrical & Power Distribution", count: "2,850" },
  { id: "electronics", name: "Electronic & Telecom Equipment", count: "2,209" },
  { id: "medical", name: "Medical & Pharmaceuticals", count: "1,991" },
  { id: "cleaning", name: "Janitorial & Facilities", count: "1,916" },
  { id: "security", name: "Security & Guarding Services", count: "1,736" },
  { id: "hardware", name: "Hardware & Machinery", count: "1,613" },
  { id: "vehicles", name: "Vehicles & Auto Parts", count: "1,566" },
  { id: "printing", name: "Printing, Media & Advertising", count: "1,230" },
  { id: "solar", name: "Renewable Energy & Solar", count: "186" },
];

const SECTORS = [
  { id: "all", name: "All Procurement Sectors", count: "39,942" },
  { id: "government", name: "Government & Ministries", count: "32,480" },
  { id: "semi-government", name: "Semi-Gov & State Boards", count: "6,725" },
  { id: "private", name: "Private Corporates & Commercial", count: "737" },
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
  const toast = useToast();
  const { t, language } = useLanguage();

  const [keyword, setKeyword] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedValueBand, setSelectedValueBand] = useState<string>("all");
  const [closingWindow, setClosingWindow] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [statusTab, setStatusTab] = useState<"all" | "today" | "live" | "closing" | "suppliers">("live");
  const [sortBy, setSortBy] = useState("closing");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // View Mode: Cards vs Dense List
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  // Bookmarking Watchlist
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set(["SLPA-2026-PT-04"]));

  // Modern Dropdown State
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
    const isSaved = savedTenders.has(id);
    setSavedTenders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.info("Watchlist Updated", "Notice removed from your saved watchlist.");
      } else {
        next.add(id);
        toast.success("Saved to Watchlist", "Notice added to your workspace watchlist.");
      }
      return next;
    });
  };

  const handleStatusTabChange = (tab: "all" | "today" | "live" | "closing" | "suppliers") => {
    setStatusTab(tab);
    if (tab === "suppliers") {
      setSelectedCategory("suppliers");
      setClosingWindow("all");
    } else if (tab === "closing") {
      setClosingWindow("7days");
      setSelectedCategory("all");
    } else if (tab === "today") {
      setClosingWindow("all");
      setSelectedCategory("all");
    } else {
      setClosingWindow("all");
      setSelectedCategory("all");
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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, selectedCategory, selectedProvince, selectedValueBand, sectorFilter, closingWindow, sortBy, statusTab]);

  const totalPages = Math.max(1, Math.ceil(filteredTenders.length / itemsPerPage));
  const paginatedTenders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTenders.slice(start, start + itemsPerPage);
  }, [filteredTenders, currentPage, itemsPerPage]);

  const startIndex = filteredTenders.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredTenders.length);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("tender-results-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setKeyword("");
    setSelectedCategory("all");
    setSelectedProvince("all");
    setSelectedValueBand("all");
    setClosingWindow("all");
    setSectorFilter("all");
    setStatusTab("live");
    setActivePreset(null);
    setCurrentPage(1);
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
      
      {/* 1. HERO BANNER WITH DYNAMIC METRICS OVERLAY & INTEGRATED SEARCH ENGINE */}
      <section className="relative rounded-3xl mb-12 shadow-2xl bg-[#0A1633] text-white border border-slate-800 z-20">
        
        {/* Full Section Background Image Container */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-75 scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2000&auto=format&fit=crop')`,
            }}
          />
          {/* Soft Contrast Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#07132F]/85 via-[#0A1E4A]/65 to-[#07132F]/80" />
        </div>

        <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-14">
          
          {/* Top Hero Header */}
          <div className="max-w-4xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-300">
                {t("heroSubtitle")}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] mb-3">
              {t("heroTitle")}
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed max-w-2xl">
              {t("heroDesc")}
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
                  placeholder={t("searchPlaceholder")}
                  value={keyword}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3.5 pl-4 pr-16 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {keyword && (
                    <button
                      onClick={() => setKeyword("")}
                      className="text-slate-400 hover:text-slate-700 font-black text-lg mr-1 cursor-pointer"
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
                        className="bg-slate-100 hover:bg-blue-50 hover:text-[#0055B8] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-slate-700 cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4 Core Dropdowns + Action CTA */}
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
                      {t("valueBandLabel")}
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

              {/* Modern Closing Window Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "closing" ? null : "closing")}
                  className="w-full bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#0055B8] focus:border-[#0055B8] focus:bg-white rounded-xl p-2.5 sm:p-3 text-left transition-all hover:shadow-sm flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      {t("deadlineLabel")}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0F172A] truncate block">
                      {closingWindow === "all" ? "Any Closing Date" : closingWindow === "3days" ? "Next 3 Days (Urgent)" : closingWindow === "7days" ? "Next 7 Days" : "Next 30 Days"}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${activeDropdown === "closing" ? "rotate-180 text-[#0055B8]" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {activeDropdown === "closing" && (
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

              {/* Action Buttons: Search CTA & Clear Filters */}
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("tender-results-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
                >
                  <span>{t("searchBtn")}</span>
                  <span>&rarr;</span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset all filters"
                    className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all hover:scale-105 active:scale-95 text-xs font-bold cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. MAIN 2-COLUMN STRUCTURAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
        
        {/* LEFT COLUMN: SIDEBAR BREAKDOWNS & TAXONOMY */}
        <aside className="lg:col-span-3 xl:col-span-3 flex flex-col space-y-6 sticky top-28">
          
          {/* Spotlight 1: Prominent "Registration of Suppliers" Action Button */}
          <button
            type="button"
            onClick={() => handleStatusTabChange("suppliers")}
            className={`w-full p-4 rounded-2xl border-2 transition-all text-left shadow-md flex items-center justify-between cursor-pointer hover:-translate-y-0.5 active:scale-98 ${
              selectedCategory === "suppliers"
                ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xl"
                : "bg-white text-slate-900 border-slate-200 hover:border-[#0055B8]"
            }`}
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest block opacity-80">
                OFFICIAL GAZETTE SPECIAL
              </span>
              <span className="text-sm font-black block">
                {t("spotlightSuppliers")}
              </span>
            </div>
            <span className={`px-2.5 py-1 rounded-xl text-xs font-black font-mono ${
              selectedCategory === "suppliers" ? "bg-white/20 text-white" : "bg-[#EFF6FF] text-[#0055B8]"
            }`}>
              3,217
            </span>
          </button>

          {/* Spotlight 2: Publisher / Buyer Door */}
          <div className="bg-[#0F172A] text-white p-5 rounded-2xl shadow-lg border border-slate-700 hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-300 block mb-1.5">
              FOR PROCURING BODIES
            </span>
            <h4 className="text-sm font-black leading-tight mb-1.5 text-white">
              {t("publishFreeTitle")}
            </h4>
            <p className="text-xs text-slate-300 mb-4 font-normal leading-relaxed">
              Connect with 3,200+ verified Sri Lankan suppliers &amp; CIDA contractors.
            </p>
            <Link
              href="/register"
              className="block text-center bg-[#0055B8] hover:bg-[#004394] text-white font-black text-xs py-2.5 px-3 rounded-xl uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 shadow-md"
            >
              {t("publishFreeBtn")}
            </Link>
          </div>

          {/* Taxonomy Section 1: Tenders By Sectors */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                {t("tendersBySector")}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">39,942</span>
            </div>

            <nav className="flex flex-col gap-1.5 text-xs text-slate-700">
              {SECTORS.map((sec) => {
                const isSelected = sectorFilter === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSectorFilter(sec.id)}
                    className={`py-2 px-3 rounded-xl text-left flex items-center justify-between transition-all hover:translate-x-1 active:scale-98 cursor-pointer ${
                      isSelected
                        ? "bg-[#0055B8] text-white font-black shadow-sm"
                        : "hover:bg-slate-50 font-bold text-slate-700"
                    }`}
                  >
                    <span className="truncate pr-1">{sec.name}</span>
                    <span className={`font-mono text-[11px] ${isSelected ? "text-white" : "text-slate-400"}`}>
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Taxonomy Section 2: Tenders By Categories */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                {t("tendersByCategory")}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">12 Sectors</span>
            </div>

            <nav className="flex flex-col gap-1.5 text-xs text-slate-700">
              {SECTORS.map((sec) => {
                const isSelected = sectorFilter === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSectorFilter(sec.id)}
                    className={`py-2 px-3 rounded-xl text-left flex items-center justify-between transition-all hover:translate-x-1 active:scale-98 cursor-pointer ${
                      isSelected
                        ? "bg-[#0055B8] text-white font-black shadow-sm"
                        : "hover:bg-slate-50 font-bold text-slate-700"
                    }`}
                  >
                    <span className="truncate pr-1">{sec.name}</span>
                    <span className={`font-mono text-[11px] ${isSelected ? "text-white" : "text-slate-400"}`}>
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Taxonomy Section 2: Tenders By Categories */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                TENDERS BY CATEGORY
              </span>
              <span className="text-[11px] text-slate-400 font-mono">12 Sectors</span>
            </div>

            <nav className="flex flex-col gap-1.5 text-xs text-slate-700 max-h-96 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`py-2 px-3 rounded-xl text-left flex items-center justify-between transition-all hover:translate-x-1 active:scale-98 cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#0055B8] text-white font-black shadow-sm"
                    : "hover:bg-slate-50 font-bold text-slate-700"
                }`}
              >
                <span>All Categories</span>
                <span className="font-mono text-[11px] opacity-80">39,942</span>
              </button>

              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-2 px-3 rounded-xl text-left flex items-center justify-between transition-all hover:translate-x-1 active:scale-98 cursor-pointer ${
                      isSelected
                        ? "bg-[#0055B8] text-white font-black shadow-sm"
                        : "hover:bg-slate-50 font-bold text-slate-700"
                    }`}
                  >
                    <span className="truncate pr-1">{cat.name}</span>
                    <span className={`font-mono text-[11px] ${isSelected ? "text-white" : "text-slate-400"}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

        </aside>

        {/* RIGHT COLUMN: DIRECT TENDER RESULTS */}
        <main className="lg:col-span-9 xl:col-span-9">

          {/* 3. QUICK STATUS TABS RIBBON (Top Filter Bar) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-2 mb-6 shadow-sm flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: "live", label: "Live Tenders", count: "366" },
              { id: "today", label: "Today's Tenders", count: "12" },
              { id: "closing", label: "Closing This Week", count: "41" },
              { id: "suppliers", label: "Supplier Registrations", count: "3,217" },
              { id: "all", label: "All Gazette Notices", count: "39,942" },
            ].map((tab) => {
              const isActive = statusTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleStatusTabChange(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#0055B8] text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-100 font-bold"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-slate-600 font-bold"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

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
                
                {/* Modern Capsule View Switcher (Rule #8) */}
                <div className="inline-flex p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode("cards")}
                    className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === "cards"
                        ? "bg-[#0055B8] text-white shadow-xs"
                        : "text-slate-600 hover:text-black font-bold"
                    }`}
                  >
                    <span>Card Grid</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === "list"
                        ? "bg-[#0055B8] text-white shadow-xs"
                        : "text-slate-600 hover:text-black font-bold"
                    }`}
                  >
                    <span>Dense List</span>
                  </button>
                </div>

                {/* Modern Sort Dropdown */}
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === "sort" ? null : "sort")}
                    className="bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-[#0055B8] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <span className="text-slate-400 font-normal">Sort:</span>
                    <span className="font-black">
                      {sortBy === "closing" ? "Closing Soon" : sortBy === "newest" ? "Newest First" : sortBy === "amountDesc" ? "Highest Budget" : "Lowest Budget"}
                    </span>
                    <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {activeDropdown === "sort" && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn divide-y divide-slate-50">
                      {[
                        { id: "closing", label: "Closing Soon (Urgent)" },
                        { id: "newest", label: "Newest Published" },
                        { id: "amountDesc", label: "Highest Budget (LKR)" },
                        { id: "amountAsc", label: "Lowest Budget (LKR)" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => { setSortBy(item.id); setActiveDropdown(null); }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            sortBy === item.id ? "bg-[#EFF6FF] text-[#0055B8] font-black" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{item.label}</span>
                          {sortBy === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#0055B8]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </section>

          {/* 5. TENDER CATALOGUE: CARDS GRID VS DENSE LIST */}
          {viewMode === "cards" ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-8 items-stretch">
              {paginatedTenders.map((tender, index) => {
                const isFirst = index === 0 && currentPage === 1;
                const isSaved = savedTenders.has(tender.id);

                return (
                  <Link
                    key={tender.id}
                    href={`/tender/${tender.id}`}
                    className={`bg-white rounded-2xl p-6 flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer group min-h-[290px] no-underline block transform-gpu ${
                      isFirst ? "border-2 border-[#0055B8] shadow-lg" : "border-2 border-slate-200/90 hover:border-[#0055B8]"
                    }`}
                  >
                    <div>
                      {/* Top Authority & Urgency Row */}
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
                            className="p-1.5 rounded-lg bg-[#F1F5F9] hover:bg-white border border-[#E2E8F0] text-slate-400 hover:text-[#0055B8] transition-all hover:scale-110 active:scale-90 shadow-2xs cursor-pointer"
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

                      {/* Main Title */}
                      <h4 className="text-[15px] sm:text-base font-extrabold text-[#0F172A] leading-snug mb-3.5 group-hover:text-[#0055B8] transition-colors line-clamp-2">
                        {tender.title}
                      </h4>

                      {/* Key Meta Badges */}
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

                    {/* Bottom Budget & Action */}
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
            <section className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden mb-8 shadow-lg">
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
                    {paginatedTenders.map((tender) => {
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

          {/* 6. MODERN LOAD BALANCED PAGINATION CONTROL BAR */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-16">
            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="font-bold text-[#0F172A]">{startIndex}</strong> to <strong className="font-bold text-[#0F172A]">{endIndex}</strong> of <strong className="font-bold text-[#0055B8]">{filteredTenders.length}</strong> Notices
            </div>

            {/* Page Navigation Switcher */}
            <div className="flex items-center gap-1.5 self-center sm:self-auto">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                &larr; Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#0055B8] text-white shadow-md scale-105"
                      : "bg-[#F8FAFC] text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                Next &rarr;
              </button>
            </div>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="text-slate-400 font-medium">Per Page:</span>
              <div className="inline-flex p-0.5 bg-[#F1F5F9] rounded-xl border border-slate-200">
                {[6, 12, 24].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => { setItemsPerPage(size); setCurrentPage(1); }}
                    className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                      itemsPerPage === size ? "bg-[#0055B8] text-white shadow-xs" : "text-slate-600 hover:text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
