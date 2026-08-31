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
  instrumentType: string;
  sector: "government" | "private";
  categoryId: string;
  categoryName: string;
  amount: string;
  amountNumeric: number;
  bidBond: string;
  isPromoted?: boolean;
  isUrgent?: boolean;
  hasDocuments?: boolean;
  description: string;
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
    amount: "LKR 17,000,000",
    amountNumeric: 17000000,
    bidBond: "LKR 200,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
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
    amount: "LKR 48,500,000",
    amountNumeric: 48500000,
    bidBond: "LKR 500,000",
    isPromoted: true,
    isUrgent: false,
    hasDocuments: true,
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
    amount: "LKR 10,000,000",
    amountNumeric: 10000000,
    bidBond: "LKR 150,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
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
    amount: "LKR 32,000,000",
    amountNumeric: 32000000,
    bidBond: "LKR 350,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
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
    amount: "LKR 85,000,000",
    amountNumeric: 85000000,
    bidBond: "LKR 850,000",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
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
    amount: "LKR 6,200,000",
    amountNumeric: 6200000,
    bidBond: "LKR 60,000",
    isPromoted: false,
    isUrgent: true,
    hasDocuments: false,
    description: "Daily hygiene sanitation, waste disposal, and facility maintenance for the 5-story Provincial Secretariat Complex.",
  },
];

export default function HomePage() {
  // Search & Filter State
  const [activeTab, setActiveTab] = useState<"live" | "latest" | "archive" | "suppliers">("live");
  const [keyword, setKeyword] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [closingWindow, setClosingWindow] = useState<string>("all");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sectorFilter, setSectorFilter] = useState<"all" | "government" | "private">("all");
  const [procedureDate, setProcedureDate] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [sortBy, setSortBy] = useState("closing");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Compact Sidebar Category Expansion state
  const [showAllCategories, setShowAllCategories] = useState(false);

  // View Switcher: Cards View vs. Table List View
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  // Accessibility Font Scaler: A / A+ / A++
  const [textZoom, setTextZoom] = useState<"normal" | "large" | "xl">("normal");

  // Interactive Tools: Save/Watch Tender, Quick View Drawer, Alert Selector, Copy Feedback
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const [quickViewTender, setQuickViewTender] = useState<TenderItem | null>(null);
  const [alertDays, setAlertDays] = useState<number | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard Shortcuts: "/" to search, "Esc" to close drawer/dropdown
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

      const matchSector =
        sectorFilter === "all" || item.sector === sectorFilter;

      const matchClosing =
        closingWindow === "all" ||
        (closingWindow === "3days" && item.daysLeft <= 3) ||
        (closingWindow === "7days" && item.daysLeft <= 7) ||
        (closingWindow === "30days" && item.daysLeft <= 30);

      const matchHighValue =
        activePreset !== "highValue" || item.amountNumeric >= 30000000;

      const matchMinBudget =
        !minBudget || item.amountNumeric >= Number(minBudget);

      return matchKeyword && matchCategory && matchProvince && matchSector && matchClosing && matchHighValue && matchMinBudget;
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
  }, [keyword, selectedCategory, selectedProvince, sectorFilter, closingWindow, sortBy, activePreset, minBudget]);

  const handleReset = () => {
    setKeyword("");
    setSelectedCategory("all");
    setSelectedProvince("all");
    setSelectedSource("all");
    setClosingWindow("all");
    setSectorFilter("all");
    setProcedureDate("");
    setMinBudget("");
    setActivePreset(null);
  };

  const hasActiveFilters =
    keyword !== "" ||
    selectedCategory !== "all" ||
    selectedProvince !== "all" ||
    selectedSource !== "all" ||
    sectorFilter !== "all" ||
    closingWindow !== "all" ||
    activePreset !== null ||
    minBudget !== "";

  const visibleCategories = showAllCategories ? CATEGORIES : CATEGORIES.slice(0, 5);

  return (
    <div className={`max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all ${
      textZoom === "large" ? "text-[110%]" : textZoom === "xl" ? "text-[120%]" : "text-[100%]"
    }`}>
      
      {/* 1. TOP INSTITUTIONAL STATUS STRIP */}
      <header className="flex flex-wrap items-center justify-between text-xs pb-3 mb-5 border-b border-[#E2E6ED] gap-3">
        <div className="flex items-center gap-2.5 text-[#374151]">
          <span className="text-[#0055B8] font-extrabold uppercase tracking-wider">NATIONAL PROCUREMENT GAZETTE</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold">Issue No. 2,426</span>
          <span className="text-gray-300">|</span>
          <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider text-[11px]">
            Verified Daily
          </span>
        </div>

        <div className="flex items-center gap-5 text-[#374151]">
          <span className="text-gray-600 font-medium">Hotline: <strong className="text-gray-900">+94 11 278 5141</strong></span>
          <span className="text-gray-300">|</span>
          {savedTenders.size > 0 && (
            <>
              <span className="text-[#0055B8] font-bold">★ {savedTenders.size} Saved</span>
              <span className="text-gray-300">|</span>
            </>
          )}

          {/* Accessibility Font Scaler */}
          <div className="hidden sm:flex items-center bg-[#F1F3F7] p-0.5 rounded border border-[#E2E6ED]">
            <span className="text-[11px] font-bold text-gray-500 px-2 uppercase tracking-wider">Text Size:</span>
            <button
              type="button"
              onClick={() => setTextZoom("normal")}
              title="Standard Font Size"
              className={`px-2 py-0.5 text-xs font-bold rounded ${
                textZoom === "normal" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setTextZoom("large")}
              title="Large Font Size (+10%)"
              className={`px-2 py-0.5 text-xs font-bold rounded ${
                textZoom === "large" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setTextZoom("xl")}
              title="Extra Large Font Size (+20%)"
              className={`px-2 py-0.5 text-xs font-bold rounded ${
                textZoom === "xl" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              A++
            </button>
          </div>
        </div>
      </header>

      {/* 2. HIGH-IMPACT SRI LANKA PROCUREMENT STATS RIBBON (Inspired by Tenders.lk & SmartTenders) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-7">
        <div className="bg-[#0055B8] text-white p-4 rounded-lg shadow-xs flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-blue-200 font-extrabold">Total Tender Archive</span>
          <span className="font-display text-3xl sm:text-4xl font-black mt-1">39,942+</span>
          <span className="text-[11px] text-blue-100 opacity-90 mt-0.5">National Gazette Database</span>
        </div>

        <div className="bg-[#F8F9FB] border-2 border-[#E2E6ED] p-4 rounded-lg shadow-2xs flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-[#4B5563] font-extrabold">Live Active Tenders</span>
          <span className="font-display text-3xl sm:text-4xl font-black text-[#0055B8] mt-1">366</span>
          <span className="text-[11px] text-gray-500 font-semibold mt-0.5">Open for Bidding Today</span>
        </div>

        <div className="bg-[#F8F9FB] border-2 border-[#E2E6ED] p-4 rounded-lg shadow-2xs flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-red-600 font-extrabold">Closing This Week</span>
          <span className="font-display text-3xl sm:text-4xl font-black text-red-600 mt-1">41</span>
          <span className="text-[11px] text-gray-500 font-semibold mt-0.5">Urgent Deadlines</span>
        </div>

        <div className="bg-[#F8F9FB] border-2 border-[#E2E6ED] p-4 rounded-lg shadow-2xs flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-extrabold">Verified Suppliers</span>
          <span className="font-display text-3xl sm:text-4xl font-black text-emerald-800 mt-1">3,217+</span>
          <span className="text-[11px] text-gray-500 font-semibold mt-0.5">Registered Contractors</span>
        </div>
      </section>

      {/* 3. MAIN 2-COLUMN STRUCTURAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: NAVIGATION + BUYER CTA */}
        <aside className="lg:col-span-3 xl:col-span-2 hidden lg:flex flex-col gap-5 sticky top-28">
          
          {/* Buyer CTA Banner (Inspired by SmartTenders / Tenders.lk) */}
          <div className="bg-linear-to-br from-[#0F172A] to-[#1E293B] text-white p-4 rounded-lg shadow-sm border border-gray-700">
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
              href="/contact-us"
              className="block text-center bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-xs py-2 px-3 rounded uppercase tracking-wider transition-colors shadow-xs"
            >
              + Post Tender Notice
            </Link>
          </div>

          {/* Section A: Document Hierarchy */}
          <div className="bg-[#F8F9FB] border border-[#E2E6ED] p-3.5 rounded-lg">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4B5563] block mb-2">
              DOCUMENTS
            </span>
            <nav className="flex flex-col gap-0.5 text-xs font-semibold text-[#374151]">
              <Link href="#" className="py-1.5 px-2 rounded hover:bg-gray-200 transition-colors flex items-center justify-between">
                <span>Development Index</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>
              <Link href="#" className="py-1.5 px-2 rounded hover:bg-gray-200 transition-colors flex items-center justify-between">
                <span>Procurement Gazettes</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>
              <Link href="/tenders-sri-lanka" className="py-1.5 px-2 rounded bg-white text-[#0055B8] font-bold border border-[#E2E6ED] shadow-xs flex items-center justify-between">
                <span>Tenders &amp; Purchases</span>
                <span className="text-[10px] bg-blue-50 text-[#0055B8] px-1 rounded">Active</span>
              </Link>
            </nav>
          </div>

          {/* Section B: Compact Category Navigation */}
          <div className="bg-[#F8F9FB] border border-[#E2E6ED] p-3.5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4B5563]">
                CATEGORIES
              </span>
              <span className="text-[10px] text-gray-400 font-mono">39,942 total</span>
            </div>

            <nav className="flex flex-col gap-0.5 text-xs text-[#374151]">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`py-1.5 px-2 rounded text-left flex items-center justify-between transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[#0055B8] text-white font-bold shadow-xs"
                    : "hover:bg-gray-200 font-semibold"
                }`}
              >
                <span>All Categories</span>
                <span className="opacity-80 font-mono text-[11px]">39,942</span>
              </button>

              {visibleCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-1.5 px-2 rounded text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-[#0055B8] text-white font-bold shadow-xs"
                        : "hover:bg-gray-200 font-semibold"
                    }`}
                  >
                    <span className="truncate pr-1">{cat.name}</span>
                    <span className="opacity-80 font-mono text-[11px] shrink-0">{cat.count}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="mt-1.5 pt-1.5 border-t border-[#E5E7EB] text-left text-xs font-bold text-[#0055B8] hover:underline"
              >
                {showAllCategories ? "− Show less categories" : `+ View all categories (${CATEGORIES.length})`}
              </button>
            </nav>
          </div>

        </aside>

        {/* RIGHT COLUMN: MAIN CONTENT */}
        <main className="lg:col-span-9 xl:col-span-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-xs font-medium text-gray-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0055B8]">Home</Link>
            <span>&rsaquo;</span>
            <span>Procurement Gazettes</span>
            <span>&rsaquo;</span>
            <span className="text-[#0055B8] font-bold">Tenders &amp; Purchases</span>
            {selectedCategory !== "all" && (
              <>
                <span>&rsaquo;</span>
                <span className="text-gray-800 font-bold">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                </span>
              </>
            )}
          </nav>

          {/* Heading and Live/Expired Tabs (Inspired by eTenders.lk) */}
          <section className="mb-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <h1 className="font-display text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight uppercase leading-none">
                TENDERS &amp; PURCHASES
              </h1>
              
              {/* Live / Latest / Expired / Supplier Tabs */}
              <div className="flex items-center gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("live")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    activeTab === "live"
                      ? "bg-[#0055B8] text-white shadow-xs"
                      : "bg-[#F3F5F8] text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  LIVE (366)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("latest")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    activeTab === "latest"
                      ? "bg-[#0055B8] text-white shadow-xs"
                      : "bg-[#F3F5F8] text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  LATEST (41)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("archive")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    activeTab === "archive"
                      ? "bg-[#0055B8] text-white shadow-xs"
                      : "bg-[#F3F5F8] text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  EXPIRED ARCHIVE (39,576)
                </button>
              </div>
            </div>
            
            <p className="text-sm text-[#4B5563] max-w-3xl font-medium">
              National procurement directory. Search gazette tenders, newspaper notices, and corporate RFPs across Sri Lanka.
            </p>
          </section>

          {/* 4. WORKSPACE SEARCH PANEL (With Gazette / Newspaper Source Filter) */}
          <section className="bg-white border-2 border-[#E2E6ED] rounded-xl p-5 sm:p-6 mb-7 shadow-xs">
            
            {/* Primary Search Bar with On-Focus Dropdown for Recent Searches */}
            <div className="mb-4 relative" ref={searchContainerRef}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by tender title, procuring entity, reference code, or keywords..."
                  value={keyword}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-[#F8F9FB] border border-[#D9DFE7] focus:border-[#0055B8] focus:bg-white rounded-lg py-3.5 pl-4 pr-16 text-sm sm:text-base font-semibold text-[#111827] outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                />
                
                {/* Clear & Keyboard shortcut hint */}
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {keyword && (
                    <button
                      onClick={() => setKeyword("")}
                      className="text-gray-400 hover:text-gray-700 font-black text-lg mr-1"
                      title="Clear Search"
                    >
                      &times;
                    </button>
                  )}
                  <kbd className="hidden sm:inline-block bg-gray-200 text-gray-600 text-[10px] font-mono px-1.5 py-0.5 rounded border border-gray-300">
                    /
                  </kbd>
                </div>
              </div>

              {/* On-Focus Popover for Recent Search History */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#D9DFE7] rounded-lg shadow-lg z-30 p-3 animate-fadeIn">
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

            {/* Core 4 Dropdowns (Category, Province, Source Newspaper, Closing Date) + Action CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3.5">
              
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
                      {cat.name} ({cat.count})
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

              {/* Source Newspaper / Gazette (Sri Lanka specific) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#374151] block mb-1">
                  Source / Gazette
                </label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full bg-white border border-[#D9DFE7] focus:border-[#0055B8] rounded-md py-2 px-2.5 text-xs sm:text-sm font-semibold text-[#111827] cursor-pointer outline-none truncate"
                >
                  {SOURCES.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>

              {/* Closing Date Window */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#374151] block mb-1">
                  Closing Date
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

              {/* Action Buttons: Search & Clear */}
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
                className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-colors ${
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
                className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-colors ${
                  activePreset === "gov"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Central Government Only
              </button>
              <button
                type="button"
                onClick={() => applyPreset("highValue")}
                className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-colors ${
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
                className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-colors ${
                  activePreset === "western"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Western Province
              </button>
            </div>

            {/* Expandable Advanced Filters Button */}
            <div className="pt-3 mt-3 border-t border-[#F1F3F7]">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="bg-[#F3F5F8] hover:bg-[#E5E9F0] border border-[#D9DFE7] text-[#0055B8] text-xs font-extrabold px-3.5 py-2 rounded-md flex items-center gap-2 transition-colors uppercase tracking-wider"
              >
                <span>{showAdvanced ? "▲ Collapse Advanced Filters" : "+ More Filters (Sector, Publication Date, Minimum Value)"}</span>
              </button>

              {showAdvanced && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-3 bg-[#F8F9FB] p-4 rounded-lg border border-[#E2E6ED] animate-fadeIn">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B5563] block mb-1">
                      Sector Division
                    </label>
                    <select
                      value={sectorFilter}
                      onChange={(e) => setSectorFilter(e.target.value as any)}
                      className="w-full bg-white border border-[#D9DFE7] rounded py-2 px-3 text-xs sm:text-sm font-semibold"
                    >
                      <option value="all">All Sectors (Government &amp; Private)</option>
                      <option value="government">Government &amp; Public Entities</option>
                      <option value="private">Private &amp; Corporate RFPs</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B5563] block mb-1">
                      Procedure Date Range
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12.10.2026 - 13.11.2026"
                      value={procedureDate}
                      onChange={(e) => setProcedureDate(e.target.value)}
                      className="w-full bg-white border border-[#D9DFE7] rounded py-2 px-3 text-xs sm:text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B5563] block mb-1">
                      Minimum Contract Budget (LKR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 10000000"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      className="w-full bg-white border border-[#D9DFE7] rounded py-2 px-3 text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

          </section>

          {/* 5. RESULTS HEADER & CONTROLS */}
          <section className="mb-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E6ED]">
              
              {/* Distinct Headline & Result Metric */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                  TENDER RESULTS
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#4B5563] font-semibold mt-0.5">
                  <span className="text-[#0055B8] font-bold">{filteredTenders.length} opportunities matching your criteria</span>
                  <span>·</span>
                  <span className="text-gray-500 font-medium">366 live notices</span>
                </div>
              </div>

              {/* View Switcher (Cards vs Table) & Sort Options */}
              <div className="flex items-center gap-3">
                
                {/* List / Cards View Switcher */}
                <div className="segmented-bar p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("cards")}
                    title="Grid Card View"
                    className={`px-3.5 py-1.5 text-xs font-bold rounded ${
                      viewMode === "cards" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Cards View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    title="Dense Table View"
                    className={`px-3.5 py-1.5 text-xs font-bold rounded ${
                      viewMode === "list" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Table View
                  </button>
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-1.5 text-xs text-[#374151]">
                  <span className="font-bold text-gray-500">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#F8F9FB] border border-[#D9DFE7] rounded px-3 py-1.5 text-xs font-bold text-[#111827] cursor-pointer outline-none"
                  >
                    <option value="closing">Closing Soonest</option>
                    <option value="newest">Newly Published</option>
                    <option value="amountDesc">Highest Budget</option>
                    <option value="amountAsc">Lowest Budget</option>
                    <option value="entityAsc">Organization (A–Z)</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Active Filter Tags Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-[#0055B8]">
                <span className="font-bold uppercase tracking-wider text-gray-500 text-[11px]">Active Filters:</span>
                {keyword && (
                  <span className="bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 flex items-center gap-1 font-bold">
                    Keyword: "{keyword}"
                    <button onClick={() => setKeyword("")} className="font-black hover:text-red-600">&times;</button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 flex items-center gap-1 font-bold">
                    {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")} className="font-black hover:text-red-600">&times;</button>
                  </span>
                )}
                {selectedProvince !== "all" && (
                  <span className="bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 flex items-center gap-1 font-bold">
                    {PROVINCES.find(p => p.id === selectedProvince)?.name}
                    <button onClick={() => setSelectedProvince("all")} className="font-black hover:text-red-600">&times;</button>
                  </span>
                )}
                {closingWindow !== "all" && (
                  <span className="bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 flex items-center gap-1 font-bold">
                    Closing in ≤ {closingWindow === "3days" ? "3" : closingWindow === "7days" ? "7" : "30"} Days
                    <button onClick={() => setClosingWindow("all")} className="font-black hover:text-red-600">&times;</button>
                  </span>
                )}
                {sectorFilter !== "all" && (
                  <span className="bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 flex items-center gap-1 font-bold">
                    Sector: {sectorFilter === "government" ? "Government" : "Private"}
                    <button onClick={() => setSectorFilter("all")} className="font-black hover:text-red-600">&times;</button>
                  </span>
                )}
                <button
                  onClick={handleReset}
                  className="font-bold underline hover:text-blue-900 text-xs ml-1"
                >
                  Clear all filters
                </button>
              </div>
            )}

          </section>

          {/* 6. RESULTS DISPLAY: CARDS VIEW OR DENSE TABLE VIEW */}
          {viewMode === "cards" ? (
            /* CARDS VIEW: Natural Eye Flow (Who → What → Source & Location → When & Value → Action) */
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {filteredTenders.map((tender) => {
                const isSaved = savedTenders.has(tender.id);

                if (tender.isPromoted) {
                  // PROMOTED NATIONAL NOTICE (Clean Blue Card with Explicit Label)
                  return (
                    <div
                      key={tender.id}
                      onClick={() => setQuickViewTender(tender)}
                      className="bg-[#0055B8] text-white rounded-lg p-6 flex flex-col justify-between min-h-[280px] shadow-md hover:shadow-lg transition-all cursor-pointer group relative"
                    >
                      <div>
                        {/* 1. Who + Promoted Badge + Countdown */}
                        <div className="flex items-center justify-between text-xs mb-2.5 text-blue-100">
                          <span className="bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                            PROMOTED NATIONAL TENDER
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="bg-emerald-500 text-white font-mono font-black px-2.5 py-0.5 rounded text-xs">
                              {tender.daysLeft} Days Remaining
                            </span>
                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(e, tender.id)}
                              title={isSaved ? "Saved" : "Save Tender"}
                              className="text-white hover:text-yellow-300 text-sm font-bold px-1.5 py-0.5 rounded bg-white/10"
                            >
                              {isSaved ? "★" : "☆"}
                            </button>
                          </div>
                        </div>

                        <div className="text-xs font-extrabold text-blue-200 uppercase tracking-wider mb-2">
                          {tender.entity} · <span className="font-mono text-blue-300">{tender.ref}</span>
                        </div>

                        {/* 2. What (Title) */}
                        <h3 className="text-xl lg:text-2xl font-bold leading-snug mb-3 text-white">
                          {tender.title}
                        </h3>

                        {/* 3. Source & Location */}
                        <div className="text-xs text-blue-100 opacity-95 mb-4 font-mono">
                          <span>{tender.location}</span> · <span>Source: {tender.source}</span>
                        </div>
                      </div>

                      {/* 4. Value & Action */}
                      <div className="pt-4 border-t border-blue-400/30 flex items-end justify-between">
                        <div>
                          <div className="text-[11px] text-blue-200 uppercase font-bold tracking-wider mb-0.5">
                            {tender.contractType} · Closes {tender.endDate}
                          </div>
                          <div className="text-2xl lg:text-3xl font-black text-white font-mono tracking-tight">
                            {tender.amount}
                          </div>
                        </div>
                        
                        <div className="w-10 h-10 flex items-center justify-center text-white text-3xl font-light transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                          ↗
                        </div>
                      </div>
                    </div>
                  );
                }

                // STANDARD TENDER CARD
                return (
                  <div
                    key={tender.id}
                    onClick={() => setQuickViewTender(tender)}
                    className="bg-[#F8F9FB] border-2 border-[#E2E6ED] hover:border-[#0055B8] rounded-lg p-6 flex flex-col justify-between min-h-[280px] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div>
                      {/* 1. Who + Urgency Badge + Save */}
                      <div className="flex items-center justify-between text-xs mb-2.5">
                        <span className="font-extrabold text-xs text-[#0055B8] uppercase tracking-wider truncate pr-2">
                          {tender.entity}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {tender.isUrgent ? (
                            <span className="bg-red-600 text-white font-mono font-black px-2.5 py-0.5 rounded text-xs uppercase tracking-wider">
                              {tender.daysLeft} Days Remaining
                            </span>
                          ) : (
                            <span className="bg-emerald-700 text-white font-mono font-black px-2.5 py-0.5 rounded text-xs">
                              {tender.daysLeft} Days Remaining
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(e, tender.id)}
                            title={isSaved ? "Saved" : "Save Tender"}
                            className="text-gray-400 hover:text-yellow-500 text-base font-bold p-0.5 transition-colors"
                          >
                            {isSaved ? "★" : "☆"}
                          </button>
                        </div>
                      </div>

                      {/* 2. What (Title) */}
                      <h3 className="text-xl lg:text-2xl font-bold leading-snug text-[#0F172A] mb-3 group-hover:text-[#0055B8] transition-colors">
                        {tender.title}
                      </h3>

                      {/* 3. Source & Location */}
                      <div className="text-xs text-[#4B5563] font-medium mb-4 font-mono">
                        <span>{tender.location}</span> · <span>Ref: {tender.ref}</span>
                        <div className="text-gray-500 mt-0.5">Source: {tender.source}</div>
                      </div>
                    </div>

                    {/* 4. Value & Action Button */}
                    <div className="pt-4 border-t border-[#E5E7EB] flex items-end justify-between">
                      <div>
                        <div className="text-[11px] text-[#4B5563] uppercase font-bold tracking-wider mb-0.5">
                          {tender.contractType} · Closes {tender.endDate}
                        </div>
                        <div className="text-2xl lg:text-3xl font-black text-[#0055B8] font-mono tracking-tight">
                          {tender.amount}
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        className="bg-white group-hover:bg-[#0055B8] group-hover:text-white border border-[#D9DFE7] text-[#0055B8] text-xs font-bold px-3 py-2 rounded transition-colors uppercase tracking-wider shadow-2xs"
                      >
                        View Notice &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            /* HIGH-UTILITY COMPARISON TABLE VIEW */
            <section className="bg-white border-2 border-[#E2E6ED] rounded-xl overflow-hidden mb-12 shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8F9FB] border-b-2 border-[#E2E6ED] text-[#4B5563] font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Organization &amp; Ref</th>
                      <th className="py-3.5 px-4">Tender Subject &amp; Scope</th>
                      <th className="py-3.5 px-4">Newspaper / Source</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Closing Deadline</th>
                      <th className="py-3.5 px-4 text-right">Value (LKR)</th>
                      <th className="py-3.5 px-4 text-center">Action</th>
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
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#0055B8]">{tender.entity}</div>
                            <div className="text-xs text-gray-500 font-mono">{tender.ref}</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#0F172A] max-w-sm">
                            {tender.title}
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-gray-600">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                              {tender.source}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                            {tender.location}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs">
                            <span className={tender.daysLeft <= 5 ? "text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded" : "text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded"}>
                              {tender.endDate} ({tender.daysLeft}d remaining)
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-black text-right text-base text-[#0055B8] whitespace-nowrap">
                            {tender.amount}
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2.5">
                              <button
                                type="button"
                                onClick={(e) => toggleBookmark(e, tender.id)}
                                title={isSaved ? "Saved" : "Save Tender"}
                                className="text-gray-400 hover:text-yellow-500 font-bold text-base"
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

          {/* Empty State */}
          {filteredTenders.length === 0 && (
            <div className="text-center py-16 bg-[#F8F9FB] rounded-xl border-2 border-[#E2E6ED] mb-12">
              <h3 className="text-xl font-bold text-[#111827] mb-2">No matching tenders found</h3>
              <p className="text-sm text-gray-600 mb-6 font-medium">
                We couldn't find tenders matching your search filters. Try broadening your keywords or selecting another source.
              </p>
              <button
                onClick={handleReset}
                className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs uppercase tracking-wider font-extrabold px-6 py-3 rounded-md transition-colors shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* 7. CLEAN EUROPEAN NUMERIC PAGINATION */}
          {filteredTenders.length > 0 && (
            <footer className="flex items-center justify-between pt-6 border-t-2 border-[#E2E6ED] text-sm font-bold text-gray-700">
              <div className="text-gray-500 font-medium">
                Page 1 of 42
              </div>
              
              <div className="flex items-center gap-1.5 font-mono text-sm">
                <span className="w-9 h-9 flex items-center justify-center bg-[#0055B8] text-white rounded font-bold">1</span>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">2</button>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">3</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">42</button>
                <button className="px-4 h-9 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-[#0055B8] font-bold">
                  Next &rarr;
                </button>
              </div>
            </footer>
          )}

        </main>
      </div>

      {/* 8. QUICK VIEW SLIDE-OVER DRAWER WITH GAZETTE SOURCES & RFPs */}
      {quickViewTender && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setQuickViewTender(null)}
        >
          <div 
            className="w-full max-w-xl bg-white h-full shadow-2xl p-8 overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E6ED] mb-6">
                <span className="text-xs font-bold text-[#0055B8] uppercase tracking-wider font-mono">
                  REF: {quickViewTender.ref}
                </span>
                <button
                  onClick={() => setQuickViewTender(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-bold text-xl"
                  title="Close (Esc)"
                >
                  &times;
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#0055B8] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                  {quickViewTender.contractType}
                </span>
                <span className="bg-[#F8F9FB] text-gray-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border border-gray-200">
                  {quickViewTender.categoryName}
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded border border-emerald-200">
                  {quickViewTender.daysLeft} Days Remaining
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3 leading-snug">
                {quickViewTender.title}
              </h2>

              <p className="text-base font-bold text-[#0055B8] mb-6">
                {quickViewTender.entity} — {quickViewTender.location}
              </p>

              {/* Data Grid with Source Publication */}
              <div className="grid grid-cols-2 gap-4 p-5 bg-[#F8F9FB] rounded-lg border border-[#E2E6ED] mb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">Contract Value</span>
                  <span className="text-2xl font-black font-mono text-[#0055B8]">{quickViewTender.amount}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">Required Bid Bond</span>
                  <span className="text-lg font-bold font-mono text-gray-800">{quickViewTender.bidBond}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">Closing Date</span>
                  <span className="text-base font-bold text-red-600">{quickViewTender.endDate}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">Publication Source</span>
                  <span className="text-xs font-bold text-gray-800">{quickViewTender.source}</span>
                </div>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                Scope &amp; Specifications
              </h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {quickViewTender.description}
              </p>

              {/* Closing Date Notification Alert */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <span className="text-xs font-bold text-[#0055B8] uppercase tracking-wider block mb-2">
                  Set Closing-Date Reminder:
                </span>
                <div className="flex gap-2">
                  {[7, 3, 1].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setAlertDays(alertDays === d ? null : d)}
                      className={`text-xs px-3 py-1.5 rounded font-bold transition-all uppercase tracking-wider ${
                        alertDays === d
                          ? "bg-[#0055B8] text-white shadow-xs"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {d} Day{d > 1 ? "s" : ""} Prior
                    </button>
                  ))}
                </div>
                {alertDays && (
                  <span className="text-[11px] font-bold text-emerald-800 mt-2 block">
                    Reminder scheduled for {alertDays} day(s) prior to closing date.
                  </span>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E6ED] flex flex-col sm:flex-row gap-3">
              <Link
                href={`/tender/${quickViewTender.id}`}
                className="flex-1 text-center bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-sm py-3.5 px-4 rounded-md uppercase tracking-wider transition-colors shadow-xs"
              >
                View Full RFP &amp; BOQ &rarr;
              </Link>
              <button
                type="button"
                onClick={(e) => copyReference(e, quickViewTender.ref)}
                className="px-4 py-3.5 border-2 border-[#D9DFE7] hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-md uppercase tracking-wider"
              >
                {copiedRef === quickViewTender.ref ? "Copied!" : "Copy Reference"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
