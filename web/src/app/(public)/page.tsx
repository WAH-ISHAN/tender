"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  count: string;
}

interface TenderItem {
  id: string;
  ref: string;
  title: string;
  entity: string;
  province: string;
  district: string;
  location: string;
  source: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  contractType: string;
  instrumentType: "Tender" | "Quotation" | "EOI" | "RFP" | "Supply Registration" | "Auction";
  sector: "government" | "private" | "donor";
  categoryId: string;
  categoryName: string;
  valueBand: "<5M" | "5M-25M" | "25M-100M" | "100M-500M" | ">500M";
  amount: string;
  amountNumeric: number;
  bidBond: string;
  isPromoted?: boolean;
  isUrgent?: boolean;
  hasDocuments?: boolean;
  docCount?: number;
  description: string;
  isAuction?: boolean;
  isAwarded?: boolean;
}

const CATEGORIES: Category[] = [
  { id: "construction", name: "Civil Construction & Works", count: "7,767" },
  { id: "it", name: "Computer, Servers & IT", count: "3,694" },
  { id: "suppliers", name: "Registration of Suppliers", count: "3,217" },
  { id: "medical", name: "Medical & Pharmaceuticals", count: "1,991" },
  { id: "cleaning", name: "Janitorial & Facilities", count: "1,916" },
  { id: "printing", name: "Printing & Media", count: "1,230" },
  { id: "solar", name: "Renewable Energy & Solar", count: "186" },
  { id: "electrical", name: "Electrical & Power Systems", count: "1,450" },
  { id: "vehicles", name: "Vehicles & Heavy Machinery", count: "980" },
  { id: "agriculture", name: "Agriculture & Food", count: "914" },
];

const PROVINCES = [
  { id: "all", name: "All Provinces (National)" },
  { id: "western", name: "Western Province (Colombo/Gampaha)" },
  { id: "central", name: "Central Province (Kandy)" },
  { id: "southern", name: "Southern Province (Galle/Matara)" },
  { id: "northern", name: "Northern Province (Jaffna)" },
  { id: "north-western", name: "North Western (Kurunegala)" },
];

const VALUE_BANDS = [
  { id: "all", name: "All Value Bands" },
  { id: "<5M", name: "Under Rs. 5 M" },
  { id: "5M-25M", name: "Rs. 5 M – 25 M" },
  { id: "25M-100M", name: "Rs. 25 M – 100 M" },
  { id: "100M-500M", name: "Rs. 100 M – 500 M" },
  { id: ">500M", name: "Over Rs. 500 M" },
];

const SOURCES = [
  "All Sources (Gazettes & Newspapers)",
  "Government Gazette (Weekly)",
  "Daily News",
  "Sunday Observer",
  "Dinamina",
  "Silumina",
  "Thinakaran",
  "Government e-GP Portal",
];

const TENDERS_DATA: TenderItem[] = [
  {
    id: "MOE-2026-SP-01",
    ref: "MOE/2026/SP-01",
    title: "Supply and installation of solar power infrastructure for rural schools",
    entity: "Ministry of Education",
    province: "western",
    district: "Colombo",
    location: "Colombo, Western Province",
    source: "Government Gazette (Issue 2,426)",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 10,
    contractType: "Government Contract",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "solar",
    categoryName: "Renewable Energy & Solar",
    valueBand: "5M-25M",
    amount: "LKR 17,000,000",
    amountNumeric: 17000000,
    bidBond: "LKR 200,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
    docCount: 3,
    description: "Installation of complete on-grid solar photovoltaic systems with battery storage for 50 secondary schools in Western Province.",
  },
  {
    id: "SLPA-2026-PT-04",
    ref: "SLPA/2026/PT-04",
    title: "Repair of southern maritime port infrastructure & docking facilities",
    entity: "Sri Lanka Ports Authority (SLPA)",
    province: "southern",
    district: "Galle",
    location: "Galle, Southern Province",
    source: "Daily News & Sunday Observer",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 12,
    contractType: "Federal Contract",
    instrumentType: "RFP",
    sector: "government",
    categoryId: "construction",
    categoryName: "Civil Construction & Works",
    valueBand: "25M-100M",
    amount: "LKR 48,500,000",
    amountNumeric: 48500000,
    bidBond: "LKR 500,000",
    isPromoted: true,
    isUrgent: false,
    hasDocuments: true,
    docCount: 6,
    description: "Underwater pile rehabilitation, cathode protection renewal, and dock apron concrete resurfacing at Southern Terminal.",
  },
  {
    id: "BOC-IT-26-08",
    ref: "BOC/IT/26/08",
    title: "Procurement of enterprise server hardware and desktop workstations",
    entity: "Bank of Ceylon",
    province: "western",
    district: "Colombo",
    location: "Colombo, Western Province",
    source: "Daily News",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 15,
    contractType: "Banking Procurement",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "it",
    categoryName: "Computer, Servers & IT",
    valueBand: "5M-25M",
    amount: "LKR 10,000,000",
    amountNumeric: 10000000,
    bidBond: "LKR 150,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
    docCount: 2,
    description: "Supply, testing, and commissioning of 120 rackmount enterprise servers and 500 branch terminal workstations.",
  },
  {
    id: "MOH-PH-26-11",
    ref: "MOH/PH/26/11",
    title: "Supply of pharmaceuticals, laboratory reagents and surgical consumables",
    entity: "Ministry of Health",
    province: "western",
    district: "Colombo",
    location: "Colombo, Western Province",
    source: "Government Gazette & Dinamina",
    startDate: "15.08.2026",
    endDate: "20.10.2026",
    daysLeft: 20,
    contractType: "State Procurement",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "medical",
    categoryName: "Medical & Pharmaceuticals",
    valueBand: "25M-100M",
    amount: "LKR 32,000,000",
    amountNumeric: 32000000,
    bidBond: "LKR 350,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
    docCount: 4,
    description: "Annual supply agreement for essential therapeutic reagents, intravenous infusion sets, and disposable surgical supplies.",
  },
  {
    id: "RDA-KY-26-044",
    ref: "RDA/KY/26/044",
    title: "Rehabilitation and asphalt paving of provincial access roads — Kandy",
    entity: "Road Development Authority (RDA)",
    province: "central",
    district: "Kandy",
    location: "Kandy, Central Province",
    source: "Government Gazette",
    startDate: "10.08.2026",
    endDate: "28.09.2026",
    daysLeft: 16,
    contractType: "Highway Contract",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "construction",
    categoryName: "Civil Construction & Works",
    valueBand: "25M-100M",
    amount: "LKR 85,000,000",
    amountNumeric: 85000000,
    bidBond: "LKR 850,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
    docCount: 5,
    description: "Asphalt overlay, drainage culvert reconstruction, and guardrail installation along 14.2 km of provincial highway.",
  },
  {
    id: "SPC-JAN-2026",
    ref: "SPC/JAN/2026",
    title: "Provision of comprehensive facility janitorial & maintenance services",
    entity: "Southern Provincial Council",
    province: "southern",
    district: "Galle",
    location: "Galle, Southern Province",
    source: "Silumina & Thinakaran",
    startDate: "01.09.2026",
    endDate: "15.10.2026",
    daysLeft: 3,
    contractType: "Service Agreement",
    instrumentType: "Quotation",
    sector: "private",
    categoryId: "cleaning",
    categoryName: "Janitorial & Facilities",
    valueBand: "5M-25M",
    amount: "LKR 6,200,000",
    amountNumeric: 6200000,
    bidBond: "LKR 60,000",
    isPromoted: false,
    isUrgent: true,
    hasDocuments: false,
    docCount: 1,
    description: "Daily hygiene sanitation, waste disposal, and facility maintenance for the 5-story Provincial Secretariat Complex.",
  },
];

export default function HomePage() {
  // Search & Filter State
  const [keyword, setKeyword] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedValueBand, setSelectedValueBand] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [closingWindow, setClosingWindow] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<"all" | "government" | "private" | "donor">("all");
  const [sortBy, setSortBy] = useState("closing");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Density & View Mode
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [textZoom, setTextZoom] = useState<"normal" | "large" | "xl">("normal");

  // Interactive Tools
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const [quickViewTender, setQuickViewTender] = useState<TenderItem | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
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
        if (quickViewTender) setQuickViewTender(null);
        if (isSearchFocused) setIsSearchFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quickViewTender, isSearchFocused]);

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

  const copyReference = (e: React.MouseEvent, ref: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
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
    let result = TENDERS_DATA.filter((item) => {
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
    } else if (sortBy === "entityAsc") {
      result.sort((a, b) => a.entity.localeCompare(b.entity));
    }

    return result;
  }, [keyword, selectedCategory, selectedProvince, selectedValueBand, sectorFilter, closingWindow, sortBy, activePreset]);

  const handleReset = () => {
    setKeyword("");
    setSelectedCategory("all");
    setSelectedProvince("all");
    setSelectedValueBand("all");
    setSelectedSource("all");
    setClosingWindow("all");
    setSectorFilter("all");
    setActivePreset(null);
  };

  const hasActiveFilters =
    keyword !== "" ||
    selectedCategory !== "all" ||
    selectedProvince !== "all" ||
    selectedValueBand !== "all" ||
    selectedSource !== "all" ||
    sectorFilter !== "all" ||
    closingWindow !== "all" ||
    activePreset !== null;

  return (
    <div className={`max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all ${
      textZoom === "large" ? "text-[110%]" : textZoom === "xl" ? "text-[120%]" : "text-[100%]"
    }`}>
      


      {/* 2. CINEMATIC HERO BANNER (Clean, High-Contrast Industrial Layout Without Any Cluttering Tags) */}
      <section className="relative rounded-2xl overflow-hidden mb-10 shadow-lg border border-slate-800 bg-[#0A1128] text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#070F26] via-[#0A193F]/90 to-[#070F26]/95" />

        <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-16 max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05] mb-4">
            FIND GOVERNMENT &amp; COMMERCIAL TENDERS
          </h1>

          <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed max-w-2xl">
            Real-time procurement gazettes, ministry purchases, and commercial RFPs across all 9 provinces. Direct specifications, BOQ documents, and deadline alerts.
          </p>
        </div>
      </section>

      {/* 3. MAIN 2-COLUMN STRUCTURAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: NAVIGATION & TAXONOMY */}
        <aside className="lg:col-span-3 xl:col-span-2 hidden lg:flex flex-col gap-5 sticky top-28">
          
          {/* Buyer CTA Banner */}
          <div className="bg-linear-to-br from-[#0F172A] to-[#1E293B] text-white p-4 rounded-xl shadow-sm border border-gray-700">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 block mb-1">
              FOR PROCURING ENTITIES
            </span>
            <h4 className="text-sm font-black leading-tight mb-2">
              Publish Your Tenders Free
            </h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
              Connect with 3,200+ verified Sri Lankan suppliers and contractors.
            </p>
            <Link
              href="/register"
              className="block text-center bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-xs py-2 px-3 rounded uppercase tracking-wider transition-colors shadow-xs"
            >
              + Post Tender Notice
            </Link>
          </div>

          {/* Fixed Value Band Filter */}
          <div className="bg-[#F8F9FB] border border-[#E2E6ED] p-3.5 rounded-xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#4B5563] block mb-2">
              VALUE BANDS
            </span>
            <div className="flex flex-col gap-1 text-xs font-semibold text-[#374151]">
              {VALUE_BANDS.map((band) => {
                const isSelected = selectedValueBand === band.id;
                return (
                  <button
                    key={band.id}
                    type="button"
                    onClick={() => setSelectedValueBand(band.id)}
                    className={`py-1.5 px-2.5 rounded text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-[#0055B8] text-white font-bold shadow-xs"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <span>{band.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Taxonomy */}
          <div className="bg-[#F8F9FB] border border-[#E2E6ED] p-3.5 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#4B5563]">
                CATEGORIES
              </span>
              <span className="text-[11px] text-gray-400 font-mono">39,942</span>
            </div>

            <nav className="flex flex-col gap-1 text-xs text-[#374151]">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`py-1.5 px-2.5 rounded text-left flex items-center justify-between transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[#0055B8] text-white font-bold shadow-xs"
                    : "hover:bg-gray-200 font-semibold"
                }`}
              >
                <span>All Categories</span>
              </button>

              {CATEGORIES.slice(0, 7).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-1.5 px-2.5 rounded text-left flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#0055B8] text-white font-bold shadow-xs"
                      : "hover:bg-gray-200 font-semibold"
                  }`}
                >
                  <span className="truncate pr-1">{cat.name}</span>
                  <span className="opacity-80 font-mono text-[11px]">{cat.count}</span>
                </button>
              ))}
            </nav>
          </div>

        </aside>

        {/* RIGHT COLUMN: SEARCH, FILTERS & TENDER RESULTS */}
        <main className="lg:col-span-9 xl:col-span-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-xs font-medium text-gray-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0055B8]">Home</Link>
            <span>&rsaquo;</span>
            <span>Procurement Gazettes</span>
            <span>&rsaquo;</span>
            <span className="text-[#0055B8] font-bold">Tenders &amp; Purchases</span>
          </nav>

          {/* 4. WORKSPACE SEARCH PANEL */}
          <section className="bg-white border-2 border-[#E2E6ED] rounded-xl p-5 sm:p-6 mb-7 shadow-xs">
            
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
                  className="w-full bg-[#F8F9FB] border border-[#D9DFE7] focus:border-[#0055B8] focus:bg-white rounded-lg py-3 pl-4 pr-16 text-sm font-semibold text-[#111827] outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                />
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {keyword && (
                    <button
                      onClick={() => setKeyword("")}
                      className="text-gray-400 hover:text-gray-700 font-black text-lg mr-1"
                    >
                      &times;
                    </button>
                  )}
                  <kbd className="hidden sm:inline-block bg-gray-200 text-gray-600 text-[10px] font-mono px-1.5 py-0.5 rounded border border-gray-300">
                    /
                  </kbd>
                </div>
              </div>

              {/* On-Focus Popover */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D9DFE7] rounded-lg shadow-lg z-30 p-3 animate-fadeIn">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-2">
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
                        className="bg-[#F3F5F8] hover:bg-blue-50 hover:text-[#0055B8] text-xs font-semibold px-2.5 py-1 rounded transition-colors text-gray-700"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Core 4 Dropdowns (Category, Province, Value Band, Closing Date) + Action CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
              
              {/* Category */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#374151] block mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-[#D9DFE7] focus:border-[#0055B8] rounded-md py-2 px-2.5 text-xs sm:text-sm font-semibold text-[#111827] cursor-pointer outline-none truncate"
                >
                  <option value="all">All Categories ({CATEGORIES.length})</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Province */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#374151] block mb-1">
                  Province
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full bg-white border border-[#D9DFE7] focus:border-[#0055B8] rounded-md py-2 px-2.5 text-xs sm:text-sm font-semibold text-[#111827] cursor-pointer outline-none truncate"
                >
                  {PROVINCES.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Value Band */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#374151] block mb-1">
                  Value Band
                </label>
                <select
                  value={selectedValueBand}
                  onChange={(e) => setSelectedValueBand(e.target.value)}
                  className="w-full bg-white border border-[#D9DFE7] focus:border-[#0055B8] rounded-md py-2 px-2.5 text-xs sm:text-sm font-semibold text-[#111827] cursor-pointer outline-none truncate"
                >
                  {VALUE_BANDS.map((band) => (
                    <option key={band.id} value={band.id}>
                      {band.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Closing Date Window */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#374151] block mb-1">
                  Closing Deadline
                </label>
                <select
                  value={closingWindow}
                  onChange={(e) => setClosingWindow(e.target.value)}
                  className="w-full bg-white border border-[#D9DFE7] focus:border-[#0055B8] rounded-md py-2 px-2.5 text-xs sm:text-sm font-semibold text-[#111827] cursor-pointer outline-none"
                >
                  <option value="all">Any Closing Date</option>
                  <option value="3days">Next 3 Days (Urgent)</option>
                  <option value="7days">Next 7 Days</option>
                  <option value="30days">Next 30 Days</option>
                </select>
              </div>

              {/* Action Buttons: Find & Clear */}
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  className="flex-1 bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs sm:text-sm py-2.5 px-3 rounded-md transition-colors uppercase tracking-wider shadow-xs whitespace-nowrap"
                >
                  Find Tenders
                </button>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-[38px] px-3 border-2 border-[#D9DFE7] hover:bg-gray-100 text-[#374151] text-xs font-extrabold rounded-md transition-colors whitespace-nowrap"
                  >
                    Clear
                  </button>
                )}
              </div>

            </div>

            {/* Quick Filters Row */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#F1F3F7]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B5563] mr-1">
                QUICK FILTERS:
              </span>
              <button
                type="button"
                onClick={() => applyPreset("urgent")}
                className={`text-xs font-bold px-3 py-1 rounded-md border transition-colors ${
                  activePreset === "urgent"
                    ? "bg-red-600 text-white border-red-600 shadow-xs"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Closing in ≤ 7 Days
              </button>
              <button
                type="button"
                onClick={() => applyPreset("gov")}
                className={`text-xs font-bold px-3 py-1 rounded-md border transition-colors ${
                  activePreset === "gov"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Central Government
              </button>
              <button
                type="button"
                onClick={() => applyPreset("highValue")}
                className={`text-xs font-bold px-3 py-1 rounded-md border transition-colors ${
                  activePreset === "highValue"
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                High Value (&gt; 30M LKR)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("western")}
                className={`text-xs font-bold px-3 py-1 rounded-md border transition-colors ${
                  activePreset === "western"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Western Province
              </button>
            </div>

          </section>

          {/* 5. RESULTS HEADER & CONTROLS */}
          <section className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E6ED]">
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight uppercase">
                  TENDER RESULTS
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#4B5563] font-semibold mt-0.5">
                  <span className="text-[#0055B8] font-bold">{filteredTenders.length} opportunities matching your criteria</span>
                  <span>·</span>
                  <span className="text-gray-500 font-medium">366 live notices</span>
                </div>
              </div>

              {/* View Switcher, Density Switcher & Sort Selector */}
              <div className="flex items-center gap-2.5">
                
                {/* Density Switcher */}
                <div className="hidden sm:flex items-center bg-[#F1F3F7] p-0.5 rounded border border-[#E2E6ED] text-xs font-bold">
                  <button
                    onClick={() => setDensity("comfortable")}
                    className={`px-2.5 py-1 rounded ${density === "comfortable" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600"}`}
                  >
                    Comfortable
                  </button>
                  <button
                    onClick={() => setDensity("compact")}
                    className={`px-2.5 py-1 rounded ${density === "compact" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600"}`}
                  >
                    Compact
                  </button>
                </div>

                {/* View Switcher */}
                <div className="segmented-bar p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("cards")}
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      viewMode === "cards" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600"
                    }`}
                  >
                    Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      viewMode === "list" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600"
                    }`}
                  >
                    Table
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F9FB] border border-[#D9DFE7] rounded px-2.5 py-1.5 text-xs font-bold text-[#111827]"
                >
                  <option value="closing">Closing Soonest</option>
                  <option value="newest">Newly Published</option>
                  <option value="amountDesc">Highest Budget</option>
                  <option value="amountAsc">Lowest Budget</option>
                </select>

              </div>

            </div>
          </section>

          {/* 6. RESULTS DISPLAY: CARDS VIEW OR DENSE TABLE VIEW */}
          {viewMode === "cards" ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-14">
              {filteredTenders.map((tender) => {
                const isSaved = savedTenders.has(tender.id);

                return (
                  <div
                    key={tender.id}
                    onClick={() => setQuickViewTender(tender)}
                    className="bg-[#F8F9FB] border-2 border-[#E2E6ED] hover:border-[#0055B8] rounded-xl p-5 flex flex-col justify-between min-h-[280px] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div>
                      {/* Who + Badge */}
                      <div className="flex items-center justify-between text-xs mb-2.5">
                        <span className="font-extrabold text-xs text-[#0055B8] uppercase tracking-wider truncate pr-2">
                          {tender.entity}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`font-mono font-black px-2 py-0.5 rounded text-[11px] ${
                            tender.daysLeft <= 3 ? "bg-red-600 text-white" : "bg-emerald-700 text-white"
                          }`}>
                            {tender.daysLeft}d left
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(e, tender.id)}
                            className="text-gray-400 hover:text-yellow-500 text-base font-bold"
                          >
                            {isSaved ? "★" : "☆"}
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg lg:text-xl font-bold leading-snug text-[#0F172A] mb-2.5 group-hover:text-[#0055B8] transition-colors">
                        {tender.title}
                      </h4>

                      {/* Location & Ref */}
                      <div className="text-xs text-[#4B5563] font-medium mb-4 font-mono">
                        <span>{tender.location}</span> · <span>Ref: {tender.ref}</span>
                        {tender.hasDocuments && (
                          <div className="text-blue-700 font-semibold mt-0.5">
                            📄 {tender.docCount} Content-Addressed Documents
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Value & Action */}
                    <div className="pt-3.5 border-t border-[#E5E7EB] flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-[#4B5563] uppercase font-bold tracking-wider mb-0.5">
                          {tender.contractType} · Closes {tender.endDate}
                        </div>
                        <div className="text-xl lg:text-2xl font-black text-[#0055B8] font-mono tracking-tight">
                          {tender.amount}
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        className="bg-white group-hover:bg-[#0055B8] group-hover:text-white border border-[#D9DFE7] text-[#0055B8] text-xs font-bold px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
                      >
                        Details &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            /* DENSE TABLE VIEW */
            <section className="bg-white border-2 border-[#E2E6ED] rounded-xl overflow-hidden mb-14 shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8F9FB] border-b-2 border-[#E2E6ED] text-[#4B5563] font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className={`px-4 ${density === "compact" ? "py-2" : "py-3.5"}`}>Organization &amp; Ref</th>
                      <th className={`px-4 ${density === "compact" ? "py-2" : "py-3.5"}`}>Scope &amp; Title</th>
                      <th className={`px-4 ${density === "compact" ? "py-2" : "py-3.5"}`}>Category / Type</th>
                      <th className={`px-4 ${density === "compact" ? "py-2" : "py-3.5"}`}>Closing / Status</th>
                      <th className={`px-4 ${density === "compact" ? "py-2" : "py-3.5"} text-right`}>Value (LKR)</th>
                      <th className={`px-4 ${density === "compact" ? "py-2" : "py-3.5"} text-center`}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] font-medium text-[#111827]">
                    {filteredTenders.map((tender) => {
                      const isSaved = savedTenders.has(tender.id);
                      return (
                        <tr 
                          key={tender.id}
                          onClick={() => setQuickViewTender(tender)}
                          className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                        >
                          <td className={`px-4 ${density === "compact" ? "py-2" : "py-3.5"}`}>
                            <div className="font-bold text-[#0055B8]">{tender.entity}</div>
                            {density === "comfortable" && (
                              <div className="text-xs text-gray-500 font-mono">{tender.ref}</div>
                            )}
                          </td>
                          <td className={`px-4 font-bold text-[#0F172A] max-w-sm ${density === "compact" ? "py-2 truncate" : "py-3.5"}`}>
                            {tender.title}
                          </td>
                          <td className={`px-4 text-xs font-semibold text-gray-600 ${density === "compact" ? "py-2" : "py-3.5"}`}>
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                              {tender.categoryName}
                            </span>
                          </td>
                          <td className={`px-4 whitespace-nowrap font-mono text-xs ${density === "compact" ? "py-2" : "py-3.5"}`}>
                            <span className={tender.daysLeft <= 3 ? "text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded" : "text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded"}>
                              {tender.endDate} ({tender.daysLeft}d left)
                            </span>
                          </td>
                          <td className={`px-4 font-mono font-black text-right text-[#0055B8] whitespace-nowrap ${density === "compact" ? "py-2 text-sm" : "py-3.5 text-base"}`}>
                            {tender.amount}
                          </td>
                          <td className={`px-4 text-center whitespace-nowrap ${density === "compact" ? "py-2" : "py-3.5"}`}>
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => toggleBookmark(e, tender.id)}
                                className="text-gray-400 hover:text-yellow-500 font-bold"
                              >
                                {isSaved ? "★" : "☆"}
                              </button>
                              <span className="text-xs font-bold text-[#0055B8] hover:underline">
                                View &rarr;
                              </span>
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

      {/* 7. QUICK VIEW DRAWER */}
      {quickViewTender && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setQuickViewTender(null)}
        >
          <div 
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E6ED] mb-5">
                <span className="text-xs font-bold text-[#0055B8] uppercase tracking-wider font-mono">
                  REF: {quickViewTender.ref}
                </span>
                <button
                  onClick={() => setQuickViewTender(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-bold text-xl"
                >
                  &times;
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#0055B8] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                  {quickViewTender.contractType}
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded border border-emerald-200">
                  {quickViewTender.daysLeft} Days Remaining
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#0F172A] mb-2 leading-snug">
                {quickViewTender.title}
              </h2>

              <p className="text-sm font-bold text-[#0055B8] mb-5">
                {quickViewTender.entity} — {quickViewTender.location}
              </p>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3.5 p-4 bg-[#F8F9FB] rounded-lg border border-[#E2E6ED] mb-5">
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 block mb-0.5">Value</span>
                  <span className="text-xl font-black font-mono text-[#0055B8]">{quickViewTender.amount}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 block mb-0.5">Required Bid Bond</span>
                  <span className="text-base font-bold font-mono text-gray-800">{quickViewTender.bidBond}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 block mb-0.5">Closing Date</span>
                  <span className="text-sm font-bold text-red-600">{quickViewTender.endDate}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 block mb-0.5">Publication Source</span>
                  <span className="text-xs font-bold text-gray-800">{quickViewTender.source}</span>
                </div>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5">
                Scope &amp; Specifications
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-5">
                {quickViewTender.description}
              </p>

            </div>

            <div className="pt-4 border-t border-[#E2E6ED] flex gap-2.5">
              <Link
                href={`/tender/${quickViewTender.id}`}
                className="flex-1 text-center bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-xs py-3 px-3 rounded-md uppercase tracking-wider transition-colors shadow-xs"
              >
                View Full Notice Page &rarr;
              </Link>
              <button
                type="button"
                onClick={(e) => copyReference(e, quickViewTender.ref)}
                className="px-3 py-3 border-2 border-[#D9DFE7] hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-md uppercase tracking-wider"
              >
                {copiedRef === quickViewTender.ref ? "Copied!" : "Copy Ref"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
