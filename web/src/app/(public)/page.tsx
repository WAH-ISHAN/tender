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
  // Auction specific fields (§ 14)
  isAuction?: boolean;
  assetClass?: "Land & Property" | "Commercial Real Estate" | "Fleet & Heavy Machinery" | "Industrial Scrap";
  reservePrice?: string;
  depositRequired?: string; // computed deposit e.g. 10%
  auctionMethod?: "Parate Execution" | "Mortgage Foreclosure" | "Vehicle Recovery" | "State Disposal";
  auctionVenue?: string;
  // Award specific fields (§ 20)
  isAwarded?: boolean;
  winningSupplier?: string;
  awardedValue?: string;
  standstillDaysLeft?: number;
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
  // AUCTION ITEMS (§ 14)
  {
    id: "AUC-COMBANK-2026-09",
    ref: "AUC/CB/2026/09",
    title: "Public Auction of Prime Commercial Real Estate under Parate Execution",
    entity: "Commercial Bank of Ceylon PLC",
    province: "western",
    district: "Colombo",
    location: "Kollupitiya, Colombo 03",
    source: "Daily News & Government Gazette",
    startDate: "25.08.2026",
    endDate: "18.10.2026",
    daysLeft: 8,
    contractType: "Parate Auction",
    instrumentType: "Auction",
    sector: "private",
    categoryId: "construction",
    categoryName: "Commercial Real Estate",
    valueBand: "100M-500M",
    amount: "Reserve: LKR 145,000,000",
    amountNumeric: 145000000,
    bidBond: "LKR 14,500,000 (10% Deposit)",
    isPromoted: true,
    isAuction: true,
    assetClass: "Commercial Real Estate",
    reservePrice: "LKR 145,000,000",
    depositRequired: "LKR 14,500,000 (10%)",
    auctionMethod: "Parate Execution",
    auctionVenue: "Commercial Bank Head Office Auditorium, Colombo 01",
    description: "Auction of 3-story commercial building on 24.5 perches prime road frontage under Section 4 of Recovery of Loans by Banks (Special Provisions) Act.",
  },
  {
    id: "AUC-SLTB-FLEET-26",
    ref: "AUC/SLTB/26/02",
    title: "Disposal Auction of 42 Decommissioned Heavy Diesel Buses & Spares",
    entity: "Sri Lanka Transport Board (SLTB)",
    province: "western",
    district: "Gampaha",
    location: "Werellawatta Central Workshop, Gampaha",
    source: "Dinamina & Silumina",
    startDate: "01.09.2026",
    endDate: "05.10.2026",
    daysLeft: 4,
    contractType: "State Disposal Auction",
    instrumentType: "Auction",
    sector: "government",
    categoryId: "vehicles",
    categoryName: "Vehicles & Heavy Machinery",
    valueBand: "5M-25M",
    amount: "Reserve: LKR 22,000,000",
    amountNumeric: 22000000,
    bidBond: "LKR 2,200,000 (10% Deposit)",
    isPromoted: false,
    isUrgent: true,
    isAuction: true,
    assetClass: "Fleet & Heavy Machinery",
    reservePrice: "LKR 22,000,000",
    depositRequired: "LKR 2,200,000 (10%)",
    auctionMethod: "State Disposal",
    auctionVenue: "Werellawatta SLTB Central Yard",
    description: "Public disposal of 42 Leyland Viking buses, engine assemblies, and transmission scrap by open outcry auction.",
  },
  // AWARDED NOTICES PAST STANDSTILL (§ 20)
  {
    id: "AWD-CEB-2026-081",
    ref: "AWD/CEB/2026/081",
    title: "Awarded: Grid Substation Transformer Augmentation Phase II",
    entity: "Ceylon Electricity Board (CEB)",
    province: "central",
    district: "Kandy",
    location: "Polpitiya Complex, Central Province",
    source: "Government Gazette Archive",
    startDate: "01.06.2026",
    endDate: "01.08.2026",
    daysLeft: 0,
    contractType: "Completed Public Award",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "electrical",
    categoryName: "Electrical & Power Systems",
    valueBand: "100M-500M",
    amount: "Award: LKR 312,000,000",
    amountNumeric: 312000000,
    bidBond: "Completed",
    isAwarded: true,
    winningSupplier: "Lanka Transformers Limited (LTL)",
    awardedValue: "LKR 312,000,000",
    standstillDaysLeft: 0,
    description: "Official award notification. Evaluation completed by Standing Cabinet Appointed Procurement Committee (SCAPC). Standstill challenge window expired without dispute.",
  }
];

export default function HomePage() {
  // Domain Tab Switcher: Tenders Catalogue (§ 11) | Auctions Domain (§ 14) | Awards Archive (§ 20)
  const [domainMode, setDomainMode] = useState<"tenders" | "auctions" | "awards">("tenders");
  const [activeTab, setActiveTab] = useState<"live" | "latest" | "archive">("live");

  // Search & Filter State
  const [keyword, setKeyword] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedValueBand, setSelectedValueBand] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [closingWindow, setClosingWindow] = useState<string>("all");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sectorFilter, setSectorFilter] = useState<"all" | "government" | "private" | "donor">("all");
  const [sortBy, setSortBy] = useState("closing");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Density Toggle (§ 24): Comfortable (62px) vs Compact (43px)
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  // View Switcher: Cards View vs. Table List View
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  // Accessibility Font Scaler: A / A+ / A++
  const [textZoom, setTextZoom] = useState<"normal" | "large" | "xl">("normal");

  // Interactive Tools: Save/Watch Tender, Quick View Drawer, Alert Selector, Copy Feedback
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const [quickViewTender, setQuickViewTender] = useState<TenderItem | null>(null);
  const [alertDays, setAlertDays] = useState<number | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Metering (§ 03): 5 Free Notice Views Counter
  const [freeViewsLeft, setFreeViewsLeft] = useState(4);

  // Modals for TenderHub Blueprint features
  const [showBankClaimModal, setShowBankClaimModal] = useState(false);
  const [showWorkspaceDemoModal, setShowWorkspaceDemoModal] = useState(false);
  const [showEvidencePackModal, setShowEvidencePackModal] = useState(false);
  const [showESubmissionReceiptModal, setShowESubmissionReceiptModal] = useState(false);
  const [showAdminConsoleModal, setShowAdminConsoleModal] = useState(false);

  // Interactive Dual-Control Ceremony Simulation State (§ 19)
  const [ceremonyStage, setCeremonyStage] = useState<"sealed" | "started" | "opened">("sealed");
  const [hasCOIDeclared, setHasCOIDeclared] = useState(false);

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
        setShowBankClaimModal(false);
        setShowWorkspaceDemoModal(false);
        setShowEvidencePackModal(false);
        setShowESubmissionReceiptModal(false);
        setShowAdminConsoleModal(false);
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
      // 1. Domain filter (§ 11 & § 14)
      if (domainMode === "auctions" && !item.isAuction) return false;
      if (domainMode === "awards" && !item.isAwarded) return false;
      if (domainMode === "tenders" && (item.isAuction || item.isAwarded)) return false;

      // 2. Keyword filter
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
  }, [domainMode, keyword, selectedCategory, selectedProvince, selectedValueBand, sectorFilter, closingWindow, sortBy, activePreset]);

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
      
      {/* 1. TOP INSTITUTIONAL BAR WITH 5-VIEW FREE METER (§ 03 & § 10) */}
      <header className="flex flex-wrap items-center justify-between text-xs pb-3.5 mb-6 border-b border-[#E2E6ED] gap-4">
        <div className="flex items-center gap-2.5 text-[#374151]">
          <span className="text-[#0055B8] font-extrabold uppercase tracking-wider">TENDERHUB SRI LANKA</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold">Rev 3.0 Platform</span>
          <span className="text-gray-300">|</span>
          
          {/* Free View Meter (§ 03) */}
          <div className="flex items-center gap-1.5 bg-blue-50 text-[#0055B8] px-2.5 py-0.5 rounded border border-blue-200 font-bold">
            <span>Free Views Meter:</span>
            <span className="font-mono text-emerald-700 font-black">{freeViewsLeft} / 5</span>
            <button 
              onClick={() => setShowBankClaimModal(true)}
              className="underline text-[11px] hover:text-blue-900 ml-1"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Action Fast Triggers for Blueprint Modules */}
        <div className="flex items-center gap-4 text-[#374151]">
          
          {/* Interactive Procurement Workspace Modal Trigger (§ 18-20) */}
          <button
            onClick={() => setShowWorkspaceDemoModal(true)}
            className="text-xs font-bold text-[#0055B8] hover:underline flex items-center gap-1"
          >
            🏛️ Buyer Workspace Simulation (7 Stages)
          </button>

          <span className="text-gray-300">|</span>

          {/* Admin Console KPI Trigger (§ 22) */}
          <button
            onClick={() => setShowAdminConsoleModal(true)}
            className="text-xs font-bold text-gray-700 hover:text-[#0055B8] flex items-center gap-1"
          >
            📊 Staff Admin Console
          </button>

          <span className="text-gray-300">|</span>

          {/* Accessibility Font Scaler */}
          <div className="hidden sm:flex items-center bg-[#F1F3F7] p-0.5 rounded border border-[#E2E6ED]">
            <span className="text-[11px] font-bold text-gray-500 px-2 uppercase tracking-wider">Text:</span>
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

      {/* 2. CINEMATIC HERO BANNER BAR (§ 24 FleetOps Tokens) */}
      <section className="relative rounded-2xl overflow-hidden mb-8 shadow-lg border border-slate-800 bg-[#0A1128] text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#070F26] via-[#0A193F]/90 to-[#070F26]/95" />

        <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#0055B8]/80 text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-400/30 mb-3 shadow-xs">
            <span>●</span> Sri Lanka National Procurement &amp; Tender Network
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05] mb-3">
            TENDERS, COMMERCIAL RFPS &amp; AUCTIONS
          </h1>

          <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed max-w-2xl mb-5">
            Deduplicated daily gazette notices, ministry purchases, parate foreclosure auctions, and committee awards across all 9 provinces.
          </p>

          {/* 3 Domain Nav Switcher: Tenders | Auctions | Awards Archive (§ 11 & § 14) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDomainMode("tenders")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                domainMode === "tenders"
                  ? "bg-[#0055B8] text-white shadow-md border border-blue-400"
                  : "bg-white/10 hover:bg-white/20 text-gray-200"
              }`}
            >
              📋 Tenders Catalogue (366 Live)
            </button>
            <button
              type="button"
              onClick={() => setDomainMode("auctions")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                domainMode === "auctions"
                  ? "bg-amber-600 text-white shadow-md border border-amber-400"
                  : "bg-white/10 hover:bg-white/20 text-gray-200"
              }`}
            >
              🔨 Auctions &amp; Parate (2 Lots)
            </button>
            <button
              type="button"
              onClick={() => setDomainMode("awards")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                domainMode === "awards"
                  ? "bg-emerald-700 text-white shadow-md border border-emerald-400"
                  : "bg-white/10 hover:bg-white/20 text-gray-200"
              }`}
            >
              🏆 Awards Archive (Standstill Expired)
            </button>
            
            <button
              onClick={() => setShowBankClaimModal(true)}
              className="ml-auto bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-colors shadow-xs"
            >
              💳 Business Subscription (Rs. 24,000/yr)
            </button>
          </div>

        </div>
      </section>

      {/* 3. MAIN 2-COLUMN STRUCTURAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: TAXONOMY & BUYER MOAT BANNER */}
        <aside className="lg:col-span-3 xl:col-span-2 hidden lg:flex flex-col gap-5 sticky top-28">
          
          {/* Buyer Moat CTA Banner (§ 01) */}
          <div className="bg-linear-to-br from-[#0F172A] to-[#1E293B] text-white p-4 rounded-xl shadow-sm border border-gray-700">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 block mb-1">
              SUPPLY SIDE · BUYERS
            </span>
            <h4 className="text-sm font-black leading-tight mb-2">
              Free Procurement Workspace
            </h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
              Draft, approve under threshold, sell documents, sealed opening, and score as committee.
            </p>
            <button
              onClick={() => setShowWorkspaceDemoModal(true)}
              className="w-full text-center bg-[#0055B8] hover:bg-[#004394] text-white font-bold text-xs py-2 px-3 rounded uppercase tracking-wider transition-colors shadow-xs"
            >
              Open Workspace Demo &rarr;
            </button>
          </div>

          {/* Fixed Value Band Filter (§ 11) */}
          <div className="bg-[#F8F9FB] border border-[#E2E6ED] p-3.5 rounded-xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#4B5563] block mb-2">
              VALUE BANDS (LKR)
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

        {/* RIGHT COLUMN: SEARCH, FILTERS & CATALOGUE LISTINGS */}
        <main className="lg:col-span-9 xl:col-span-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-xs font-medium text-gray-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0055B8]">Home</Link>
            <span>&rsaquo;</span>
            <span>National Directory</span>
            <span>&rsaquo;</span>
            <span className="text-[#0055B8] font-bold uppercase">
              {domainMode === "tenders" ? "Tenders Catalogue" : domainMode === "auctions" ? "Auctions Domain" : "Awards Archive"}
            </span>
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
                    Recent Verified Queries
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["solar infrastructure", "parate execution auction", "road rehabilitation", "pharmaceuticals", "enterprise server hardware"].map((term) => (
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

              {/* Value Band (§ 11 Fixed Boundaries) */}
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
                  Filter Notices
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
                QUICK PRESETS:
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

          {/* 5. RESULTS HEADER & CONTROLS (With Density Toggle § 24) */}
          <section className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E6ED]">
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight uppercase">
                  {domainMode === "tenders" ? "TENDER LISTING" : domainMode === "auctions" ? "AUCTION LOTS" : "AWARDED CONTRACTS"}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#4B5563] font-semibold mt-0.5">
                  <span className="text-[#0055B8] font-bold">{filteredTenders.length} notices found</span>
                  <span>·</span>
                  <span className="text-gray-500 font-medium">Verified by TenderHub</span>
                </div>
              </div>

              {/* View Switcher, Density Switcher & Sort Selector (§ 24) */}
              <div className="flex items-center gap-2.5">
                
                {/* Density Switcher (§ 24) */}
                <div className="hidden sm:flex items-center bg-[#F1F3F7] p-0.5 rounded border border-[#E2E6ED] text-xs font-bold">
                  <button
                    onClick={() => setDensity("comfortable")}
                    className={`px-2.5 py-1 rounded ${density === "comfortable" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600"}`}
                  >
                    Comfortable (62px)
                  </button>
                  <button
                    onClick={() => setDensity("compact")}
                    className={`px-2.5 py-1 rounded ${density === "compact" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600"}`}
                  >
                    Compact (43px)
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
                          {tender.isAuction ? (
                            <span className="bg-amber-600 text-white font-mono font-black px-2 py-0.5 rounded text-[11px] uppercase">
                              AUCTION LOT
                            </span>
                          ) : tender.isAwarded ? (
                            <span className="bg-emerald-700 text-white font-mono font-black px-2 py-0.5 rounded text-[11px] uppercase">
                              AWARDED
                            </span>
                          ) : (
                            <span className={`font-mono font-black px-2 py-0.5 rounded text-[11px] ${
                              tender.daysLeft <= 3 ? "bg-red-600 text-white" : "bg-emerald-700 text-white"
                            }`}>
                              {tender.daysLeft}d left
                            </span>
                          )}
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
                            📄 {tender.docCount} Content-Addressed Documents (SHA-256)
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
            /* DENSE TABLE VIEW (§ 24) */
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

      {/* ========================================================================= */}
      {/* 7. MODALS: QUICK VIEW DRAWER & PAYWALL (§ 10) */}
      {/* ========================================================================= */}
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

              {/* PAYWALL MASKED PANEL TEASER (§ 10) */}
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    🔒 Protected Documents &amp; Contact Details
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                    Free Tier Preview
                  </span>
                </div>
                <p className="text-xs text-amber-800 mb-3 leading-relaxed">
                  Full bidding documents (SHA-256 signed PDFs, BOQ spreadsheets) and direct procurement officer contact numbers are released under the Business Plan.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBankClaimModal(true)}
                    className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider"
                  >
                    Upgrade for Rs. 7,500/Qtr &rarr;
                  </button>
                  <button
                    onClick={() => setShowESubmissionReceiptModal(true)}
                    className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 text-xs font-bold px-3 py-1.5 rounded"
                  >
                    View E-Submission Vault Receipt
                  </button>
                </div>
              </div>

              {/* Scope */}
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

      {/* ========================================================================= */}
      {/* 8. MODAL: BANK TRANSFER SUBSCRIPTION CLAIM (§ 16) */}
      {/* ========================================================================= */}
      {showBankClaimModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div>
                <h3 className="text-lg font-black text-[#0F172A] uppercase">
                  Bank Transfer Subscription Claim
                </h3>
                <span className="text-xs text-gray-500 font-medium">TenderHub Sri Lanka · Section 16 Workflow</span>
              </div>
              <button 
                onClick={() => setShowBankClaimModal(false)}
                className="text-gray-400 hover:text-black font-bold text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Bank Accounts Box */}
            <div className="bg-[#F8F9FB] border border-[#E2E6ED] rounded-lg p-3.5 mb-4 text-xs text-[#374151]">
              <span className="font-bold text-[#0055B8] uppercase block mb-1">Official Bank Account:</span>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>Bank: <strong>Bank of Ceylon (BOC)</strong></div>
                <div>Account No: <strong>0081294821</strong></div>
                <div>Branch: <strong>Corporate City Office</strong></div>
                <div>Account Name: <strong>TenderHub (Pvt) Ltd</strong></div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Bank Transfer Claim filed! Staff will review in payments queue within 2 hours."); setShowBankClaimModal(false); }}>
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Selected Plan</label>
                  <select className="w-full bg-white border border-gray-300 rounded p-2 font-bold text-[#0055B8]">
                    <option>Bidder Business Annual — Rs. 24,000 / Year</option>
                    <option>Bidder Business Quarterly — Rs. 7,500 / 3 Months</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Bank Transferred From</label>
                  <input type="text" placeholder="e.g. Commercial Bank / Sampath" required className="w-full bg-white border border-gray-300 rounded p-2" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Transfer Slip Reference No.</label>
                  <input type="text" placeholder="e.g. TXN-9948210" required className="w-full bg-white border border-gray-300 rounded p-2 font-mono" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Confirmation Channel</label>
                  <select className="w-full bg-white border border-gray-300 rounded p-2">
                    <option>WhatsApp (+94 77 388 7615)</option>
                    <option>Email Slip Confirmation</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 text-[#0055B8] p-3 rounded text-xs mb-4">
                ℹ️ Once submitted, your account enters <strong>Pending Confirmation</strong>. Staff activates full document and e-submission access upon statement verification.
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBankClaimModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0055B8] hover:bg-[#004394] rounded uppercase tracking-wider shadow-xs"
                >
                  Submit Payment Claim &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. MODAL: INTERACTIVE PROCUREMENT WORKSPACE SIMULATION (§ 18, 19, 20) */}
      {/* ========================================================================= */}
      {showWorkspaceDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-5">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
                  SUPPLY-SIDE WORKSPACE DEMO · 7 STAGES
                </span>
                <h3 className="text-xl font-black text-[#0F172A] uppercase">
                  Procurement: SLPA/2026/PT-04 (Rs. 48.5M Dock Repair)
                </h3>
              </div>
              <button 
                onClick={() => setShowWorkspaceDemoModal(false)}
                className="text-gray-400 hover:text-black font-bold text-2xl"
              >
                &times;
              </button>
            </div>

            {/* 7 Stage Lifecycle Stepper (§ 18) */}
            <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-center mb-6">
              {[
                { stage: "0. Draft", active: true },
                { stage: "1. Approved", active: true },
                { stage: "2. Published", active: true },
                { stage: "3. Closed", active: true },
                { stage: "4. Dual Opening", active: ceremonyStage === "opened", current: ceremonyStage !== "opened" },
                { stage: "5. Evaluation", active: hasCOIDeclared },
                { stage: "6. Award", active: false }
              ].map((s, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded border ${
                    s.active 
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300" 
                      : s.current 
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-400 border-gray-200"
                  }`}
                >
                  {s.stage}
                </div>
              ))}
            </div>

            {/* Stage 4: Dual-Control Opening Ceremony (§ 19) */}
            <div className="bg-[#F8F9FB] border-2 border-[#E2E6ED] rounded-xl p-5 mb-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-extrabold text-[#0F172A] uppercase">
                  Stage 4: Dual-Control Sealed Bid Opening Ceremony (§ 19)
                </h4>
                <span className="text-xs font-mono font-bold text-[#0055B8]">
                  Status: {ceremonyStage === "sealed" ? "🔒 Sealed (Query-level Withheld)" : ceremonyStage === "started" ? "⏳ Started by Officer A" : "✅ Dual-Signed & Unsealed"}
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Prior to two officers countersigning, identifying columns (bidder, total_price, security) are never read from database.
              </p>

              {/* Sealed Submissions Table (§ 19) */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                <table className="w-full text-left text-xs font-medium">
                  <thead className="bg-gray-100 border-b text-gray-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Submission Ref</th>
                      <th className="p-2.5">Size</th>
                      <th className="p-2.5">Timestamp</th>
                      <th className="p-2.5">Bidder Identity</th>
                      <th className="p-2.5 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-mono">
                    <tr>
                      <td className="p-2.5 text-[#0055B8] font-bold">SUB-3-0001</td>
                      <td className="p-2.5">2.4 MB</td>
                      <td className="p-2.5">2026-08-23 17:47Z</td>
                      <td className="p-2.5 font-sans">
                        {ceremonyStage === "opened" ? (
                          <strong className="text-emerald-700">Ranmuthu Engineering (Pvt) Ltd</strong>
                        ) : (
                          <span className="text-gray-400 italic font-bold">🔒 Withheld (Sealed)</span>
                        )}
                      </td>
                      <td className="p-2.5 text-right font-black">
                        {ceremonyStage === "opened" ? (
                          <span className="text-[#0055B8]">LKR 46,200,000</span>
                        ) : (
                          <span className="text-gray-400 italic">🔒 Withheld</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-[#0055B8] font-bold">SUB-3-0002</td>
                      <td className="p-2.5">3.8 MB</td>
                      <td className="p-2.5">2026-08-23 18:02Z</td>
                      <td className="p-2.5 font-sans">
                        {ceremonyStage === "opened" ? (
                          <strong className="text-emerald-700">Southern Marine Tech Ltd</strong>
                        ) : (
                          <span className="text-gray-400 italic font-bold">🔒 Withheld (Sealed)</span>
                        )}
                      </td>
                      <td className="p-2.5 text-right font-black">
                        {ceremonyStage === "opened" ? (
                          <span className="text-[#0055B8]">LKR 48,100,000</span>
                        ) : (
                          <span className="text-gray-400 italic">🔒 Withheld</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Controls for Dual Opening */}
              <div className="flex flex-wrap gap-2">
                {ceremonyStage === "sealed" && (
                  <button
                    onClick={() => setCeremonyStage("started")}
                    className="bg-[#0055B8] hover:bg-[#004394] text-white text-xs font-bold px-4 py-2 rounded uppercase"
                  >
                    1. Officer A: Start Opening (Ref: OFF-0129)
                  </button>
                )}
                {ceremonyStage === "started" && (
                  <button
                    onClick={() => setCeremonyStage("opened")}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded uppercase"
                  >
                    2. Officer B: Countersign &amp; Unseal Bids (Ref: OFF-0482)
                  </button>
                )}
                {ceremonyStage === "opened" && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <span>✓ Both officers signed. Bids are now unsealed for the evaluation committee.</span>
                    <button 
                      onClick={() => setHasCOIDeclared(true)}
                      className="ml-auto bg-purple-700 text-white px-3 py-1.5 rounded uppercase"
                    >
                      Sign Conflict-of-Interest &amp; Score &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Evidence Pack Button */}
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setShowEvidencePackModal(true)}
                className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider"
              >
                📜 Export Legal Evidence Pack (§ 20)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. MODAL: LEGAL EVIDENCE PACK (§ 20) */}
      {/* ========================================================================= */}
      {showEvidencePackModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 font-mono text-xs text-gray-800">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <span className="font-bold text-[#0055B8]">TENDERHUB LEGAL EVIDENCE PACK (SHA-256 AUDIT LOG)</span>
              <button onClick={() => setShowEvidencePackModal(false)} className="font-bold text-lg">&times;</button>
            </div>
            
            <div className="space-y-2 bg-gray-50 p-4 rounded border text-[11px] leading-relaxed">
              <div>[2026-08-12 08:30Z] CREATED: SLPA/2026/PT-04 by Officer OFF-0129</div>
              <div>[2026-08-12 11:00Z] APPROVED: Threshold Rs. 48.5M signed by Approver APP-0041</div>
              <div>[2026-08-12 11:05Z] PUBLISHED: Status live on catalogue</div>
              <div>[2026-08-20 14:00Z] ADDENDUM 01: Extended closing date by 2 days due to weather report</div>
              <div>[2026-08-23 17:47Z] SUBMISSION: SUB-3-0001 lodged (SHA-256: e3b0c44298fc1c149afbf4c8996fb924...)</div>
              <div>[2026-08-24 10:00Z] CLOSED: Submissions locked by server clock</div>
              <div>[2026-08-24 10:30Z] OPENED: Dual control signed by OFF-0129 &amp; OFF-0482</div>
              <div>[2026-08-28 16:00Z] AWARDED: Ranmuthu Engineering. Standstill period: 7 Days.</div>
            </div>

            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => { alert("Evidence Pack downloaded as PDF with SHA-256 signature."); setShowEvidencePackModal(false); }}
                className="bg-[#0055B8] text-white px-4 py-2 rounded text-xs font-bold uppercase"
              >
                Download Signed PDF Evidence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. MODAL: E-SUBMISSION RECEIPT (§ 17) */}
      {/* ========================================================================= */}
      {showESubmissionReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 border text-xs">
            <div className="flex items-center justify-between pb-3 border-b mb-3">
              <span className="font-extrabold text-[#0055B8] uppercase">Electronic Submission Receipt (§ 17)</span>
              <button onClick={() => setShowESubmissionReceiptModal(false)} className="font-bold text-lg">&times;</button>
            </div>

            <div className="p-4 bg-gray-50 border rounded-lg font-mono space-y-2 mb-4">
              <div>Receipt ID: <strong>REC-2026-88419</strong></div>
              <div>Tender: <strong>MOE/2026/SP-01 (Solar Schools)</strong></div>
              <div>Lodged By: <strong>Lanka Infrastructure Dynamics (Pvt) Ltd</strong></div>
              <div>Server Timestamp: <strong>2026-08-31 10:14:22 UTC</strong></div>
              <div>Payload Hash: <strong className="text-[10px] block break-all text-[#0055B8]">7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</strong></div>
            </div>

            <p className="text-[11px] text-gray-500 mb-4">
              This receipt is legally binding under Section 11 of the Electronic Transactions Act No. 19 of 2006.
            </p>

            <button 
              onClick={() => setShowESubmissionReceiptModal(false)}
              className="w-full bg-[#0055B8] text-white py-2 rounded font-bold uppercase"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 12. MODAL: STAFF ADMIN CONSOLE KPI MONITOR (§ 22) */}
      {/* ========================================================================= */}
      {showAdminConsoleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 border max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <div>
                <h3 className="text-lg font-black text-[#0F172A] uppercase">Staff Admin Console (§ 22)</h3>
                <span className="text-xs text-gray-500 font-medium">System Health &amp; Ingestion Monitor</span>
              </div>
              <button onClick={() => setShowAdminConsoleModal(false)} className="font-bold text-2xl">&times;</button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-[#F8F9FB] border p-3 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Total Ingested</span>
                <span className="text-2xl font-black font-mono text-[#0055B8]">39,942</span>
              </div>
              <div className="bg-[#F8F9FB] border p-3 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Human Verified</span>
                <span className="text-2xl font-black font-mono text-emerald-700">99.4%</span>
              </div>
              <div className="bg-[#F8F9FB] border p-3 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Payments Waiting Review</span>
                <span className="text-2xl font-black font-mono text-red-600">3 Claims</span>
              </div>
            </div>

            <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2">
              Ingestion Source Baseline Health (§ 12)
            </h4>
            <div className="border rounded-lg overflow-hidden text-xs font-mono mb-4">
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b text-[10px] uppercase text-gray-600">
                  <tr>
                    <th className="p-2">Source</th>
                    <th className="p-2">Weekly Baseline</th>
                    <th className="p-2">Last Fetch</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-2 font-sans font-bold">Government Gazette (Weekly)</td>
                    <td className="p-2">120 notices/wk</td>
                    <td className="p-2">42 mins ago</td>
                    <td className="p-2 text-emerald-700 font-bold">HEALTHY</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-bold">Daily News &amp; Sunday Observer</td>
                    <td className="p-2">85 notices/wk</td>
                    <td className="p-2">18 mins ago</td>
                    <td className="p-2 text-emerald-700 font-bold">HEALTHY</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setShowAdminConsoleModal(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded text-xs font-bold uppercase"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
