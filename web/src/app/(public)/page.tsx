"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";

interface DocFile {
  name: string;
  size: string;
  type: "PDF" | "XLSX" | "DOCX";
  hash: string;
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
  bidBondValidity: string;
  docFee: string;
  cidaGrade: string;
  preBidMeeting: string;
  openingTime: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  submissionAddress: string;
  deliveryPeriod: string;
  paymentTerms: string;
  isPromoted?: boolean;
  isUrgent?: boolean;
  hasDocuments?: boolean;
  docCount?: number;
  description: string;
  technicalSpecs: string[];
  documentsList: DocFile[];
  isAuction?: boolean;
  isAwarded?: boolean;
}

const CATEGORIES = [
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

const TENDERS_DATA: TenderItem[] = [
  {
    id: "MOE-2026-SP-01",
    ref: "MOE/2026/SP-01",
    title: "Supply, Delivery and Installation of Solar Power Infrastructure for Rural Schools",
    entity: "Ministry of Education",
    province: "western",
    district: "Colombo",
    location: "Isurupaya, Battaramulla (Western Province)",
    source: "Government Gazette (Issue No. 2,426)",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 10,
    contractType: "National Competitive Bidding (NCB)",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "solar",
    categoryName: "Renewable Energy & Solar",
    valueBand: "5M-25M",
    amount: "LKR 17,000,000",
    amountNumeric: 17000000,
    bidBond: "LKR 200,000 (Unconditional Bank Guarantee)",
    bidBondValidity: "120 Days from date of bid closing",
    docFee: "LKR 5,000 (Non-refundable cash or bank draft)",
    cidaGrade: "CIDA Grade C4 or above / EM-02 in Renewable Energy Systems",
    preBidMeeting: "20 September 2026 at 10:30 AM (Auditorium, 3rd Floor, Isurupaya)",
    openingTime: "12 October 2026 at 14:30 PM (Auditorium, Isurupaya)",
    contactPerson: "Eng. K. D. M. Perera — Deputy Director (Procurement & Infrastructure)",
    contactPhone: "+94 11 278 5141 / +94 11 278 4812",
    contactEmail: "procurement@moe.gov.lk",
    submissionAddress: "Procurement Division, 3rd Floor, Ministry of Education, Isurupaya, Battaramulla",
    deliveryPeriod: "90 Days from issuance of Letter of Acceptance (LOA)",
    paymentTerms: "20% Mobilization advance against bank guarantee, 70% upon installation testing, 10% retention for 12 months",
    isPromoted: true,
    isUrgent: false,
    hasDocuments: true,
    docCount: 4,
    description: "The Ministry of Education invites sealed bids from eligible contractors for the turnkey engineering, supply, testing, and commissioning of rooftop on-grid solar photovoltaic systems with hybrid battery storage across 50 secondary schools in Western Province.",
    technicalSpecs: [
      "Solar PV Modules: Tier 1 Mono-crystalline PERC 550W+ with IEC 61215/61730 certification",
      "Inverters: 3-Phase Grid-tied hybrid inverters with minimum 98.5% European efficiency",
      "Energy Storage: Lithium Iron Phosphate (LiFePO4) battery packs with 6,000+ cycle life",
      "Mounting Structure: Anodized aluminum / Hot-dip galvanized steel with 140 km/h wind resistance",
      "Remote Monitoring: Cloud-connected IoT telemetry gateway with cellular backup",
    ],
    documentsList: [
      { name: "Section I — Instructions to Bidders & Bidding Data Sheet (ITB)", size: "1.4 MB", type: "PDF", hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
      { name: "Section II — Schedule of Requirements & Technical Specifications", size: "2.8 MB", type: "PDF", hash: "8f4a1c0245a91ee59a2243d9370129bc61e0e84b7218683a483e5898ef3bc102" },
      { name: "Section III — Priced Bill of Quantities (BOQ Form Template)", size: "840 KB", type: "XLSX", hash: "a7c29e112441ff45607a97223450918efb132a89345e672901239856abcf1243" },
      { name: "Section IV — Standard Bid Security & Bank Guarantee Format", size: "420 KB", type: "PDF", hash: "09f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069" },
    ],
  },
  {
    id: "SLPA-2026-PT-04",
    ref: "SLPA/2026/PT-04",
    title: "Repair and Structural Rehabilitation of Southern Maritime Port Infrastructure",
    entity: "Sri Lanka Ports Authority (SLPA)",
    province: "southern",
    district: "Galle",
    location: "Galle Harbour, Southern Province",
    source: "Daily News & Sunday Observer",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 12,
    contractType: "Federal Maritime Contract (ICB/NCB)",
    instrumentType: "RFP",
    sector: "government",
    categoryId: "construction",
    categoryName: "Civil Construction & Works",
    valueBand: "25M-100M",
    amount: "LKR 48,500,000",
    amountNumeric: 48500000,
    bidBond: "LKR 500,000 (Bank Guarantee from Licensed Commercial Bank)",
    bidBondValidity: "150 Days from closing date",
    docFee: "LKR 12,500 (Non-refundable)",
    cidaGrade: "CIDA Grade C2 or above in Maritime / Heavy Civil Construction",
    preBidMeeting: "25 September 2026 at 10:00 AM (SLPA Conference Hall, Galle)",
    openingTime: "12 October 2026 at 14:00 PM (SLPA Head Office, Colombo 01)",
    contactPerson: "Chief Port Civil Engineer — Marine Division",
    contactPhone: "+94 11 248 2000 / +94 91 223 4561",
    contactEmail: "civil.tenders@slpa.lk",
    submissionAddress: "Procurement Division, 6th Floor, Sri Lanka Ports Authority, No. 19 Church Street, Colombo 01",
    deliveryPeriod: "180 Calendar Days",
    paymentTerms: "Milestone-based progress claims verified by supervising marine consultant",
    isPromoted: true,
    isUrgent: false,
    hasDocuments: true,
    docCount: 5,
    description: "The Sri Lanka Ports Authority invites sealed tenders from experienced marine civil contractors for underwater pile rehabilitation, cathodic protection renewal, fender bracket replacement, and heavy-duty concrete apron resurfacing at Galle Port.",
    technicalSpecs: [
      "Underwater Piling: High-density micro-silica underwater concrete encasement with sacrificial zinc anodes",
      "Cathodic Protection: Impressed current cathodic protection (ICCP) renewal with remote telemetry",
      "Quay Apron: 350mm reinforced concrete slab with Grade 40 marine aggregate and epoxy coated rebar",
      "Fender Systems: Heavy marine cone rubber fenders with UHMW-PE low-friction facing pads",
    ],
    documentsList: [
      { name: "SLPA_Tender_Dossier_Volume_I.pdf", size: "4.2 MB", type: "PDF", hash: "912384a1d65dfc2d4b1fa3d677284addd200126d90697f83b1657ff1fc53b92d" },
      { name: "Marine_Civil_BOQ_Priced_Schedule.xlsx", size: "1.6 MB", type: "XLSX", hash: "3a89345e672901239856abcf1243e3b0c44298fc1c149afbf4c8996fb92427ae" },
      { name: "Structural_Engineering_Drawings_Plates.pdf", size: "12.8 MB", type: "PDF", hash: "61e0e84b7218683a483e5898ef3bc1028f4a1c0245a91ee59a2243d9370129bc" },
    ],
  },
  {
    id: "BOC-IT-26-08",
    ref: "BOC/IT/26/08",
    title: "Procurement of Enterprise Server Hardware, Virtualization Clusters & Workstations",
    entity: "Bank of Ceylon",
    province: "western",
    district: "Colombo",
    location: "BOC Tower, Bank of Ceylon Mawatha, Colombo 01",
    source: "Daily News",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 15,
    contractType: "Banking IT Procurement",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "it",
    categoryName: "Computer, Servers & IT",
    valueBand: "5M-25M",
    amount: "LKR 10,000,000",
    amountNumeric: 10000000,
    bidBond: "LKR 150,000",
    bidBondValidity: "90 Days from closing",
    docFee: "LKR 3,500",
    cidaGrade: "Authorized Tier-1 OEM Gold Partner (Dell / HPE / Cisco / Lenovo)",
    preBidMeeting: "18 September 2026 at 11:00 AM (Virtual MS Teams Meeting)",
    openingTime: "12 October 2026 at 15:00 PM (BOC Head Office)",
    contactPerson: "Senior Manager (IT Procurement & Vendor Relations)",
    contactPhone: "+94 11 244 6790",
    contactEmail: "itprocurement@boc.lk",
    submissionAddress: "IT Department, 24th Floor, Bank of Ceylon Tower, Colombo 01",
    deliveryPeriod: "45 Days from purchase order",
    paymentTerms: "100% upon delivery, installation, integration testing, and sign-off",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
    docCount: 3,
    description: "Supply, deployment, and 3-year 24x7 mission-critical onsite maintenance of high-availability enterprise compute rack servers and 500 branch banking workstations.",
    technicalSpecs: [
      "Enterprise Servers: Dual Intel Xeon Gold 6430 / AMD EPYC 9354, 512GB DDR5 ECC RAM, NVMe RAID",
      "Workstations: Intel Core i7 14th Gen, 32GB RAM, 1TB NVMe, Dual 24-inch IPS Monitors, TPM 2.0",
      "Warranty: 3-Year 24x7 4-Hour Onsite Response SLA directly backed by Manufacturer OEM",
    ],
    documentsList: [
      { name: "BOC_Server_Specifications_RFP.pdf", size: "1.8 MB", type: "PDF", hash: "112441ff45607a97223450918efb132a89345e672901239856abcf1243e3b0c4" },
      { name: "Hardware_Compliance_Sheet.xlsx", size: "450 KB", type: "XLSX", hash: "5dfc2d4b1fa3d677284addd200126d90697f83b1657ff1fc53b92dc18148a1d6" },
    ],
  },
  {
    id: "MOH-PH-26-11",
    ref: "MOH/PH/26/11",
    title: "Supply of Essential Pharmaceuticals, Laboratory Reagents & Surgical Consumables",
    entity: "Ministry of Health (MSD)",
    province: "western",
    district: "Colombo",
    location: "Medical Supplies Division, Deans Road, Colombo 10",
    source: "Government Gazette & Dinamina",
    startDate: "15.08.2026",
    endDate: "20.10.2026",
    daysLeft: 20,
    contractType: "State Pharmaceutical Framework Agreement",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "medical",
    categoryName: "Medical & Pharmaceuticals",
    valueBand: "25M-100M",
    amount: "LKR 32,000,000",
    amountNumeric: 32000000,
    bidBond: "LKR 350,000",
    bidBondValidity: "180 Days",
    docFee: "LKR 8,000",
    cidaGrade: "NMRA Registered Manufacturer or Accredited Local Agent",
    preBidMeeting: "28 September 2026 at 10:00 AM (MSD Conference Room)",
    openingTime: "20 October 2026 at 14:00 PM",
    contactPerson: "Director — Medical Supplies Division (MSD)",
    contactPhone: "+94 11 269 4114",
    contactEmail: "dmsd@health.gov.lk",
    submissionAddress: "Tender Box, Medical Supplies Division, No. 357, Deans Road, Colombo 10",
    deliveryPeriod: "Phased quarterly consignments over 12 months",
    paymentTerms: "Letter of Credit (LC) / 30-day payment upon delivery and quality batch release",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
    docCount: 4,
    description: "Annual rate agreement for the supply of WHO-GMP certified therapeutic pharmaceuticals, IV infusion sets, sterile syringes, and chemical diagnostic reagents.",
    technicalSpecs: [
      "Regulatory: Valid NMRA Certificate of Registration & Free Sale Certificate required",
      "Quality Standards: WHO-GMP, British Pharmacopoeia (BP) or United States Pharmacopeia (USP)",
      "Shelf Life: Minimum 75% residual shelf life upon port arrival in Colombo",
    ],
    documentsList: [
      { name: "MSD_Pharma_Schedule_Requirements.pdf", size: "2.1 MB", type: "PDF", hash: "45a91ee59a2243d9370129bc61e0e84b7218683a483e5898ef3bc1028f4a1c02" },
      { name: "Drug_Master_Item_Code_List.xlsx", size: "980 KB", type: "XLSX", hash: "7a97223450918efb132a89345e672901239856abcf1243e3b0c44298fc1c149a" },
    ],
  },
  {
    id: "RDA-KY-26-044",
    ref: "RDA/KY/26/044",
    title: "Rehabilitation, Drainage Culverts and Asphalt Concrete Resurfacing of Provincial Access Roads — Kandy",
    entity: "Road Development Authority (RDA)",
    province: "central",
    district: "Kandy",
    location: "Kandy District, Central Province",
    source: "Government Gazette",
    startDate: "10.08.2026",
    endDate: "28.09.2026",
    daysLeft: 16,
    contractType: "Highway Construction Contract",
    instrumentType: "Tender",
    sector: "government",
    categoryId: "construction",
    categoryName: "Civil Construction & Works",
    valueBand: "25M-100M",
    amount: "LKR 85,000,000",
    amountNumeric: 85000000,
    bidBond: "LKR 850,000",
    bidBondValidity: "120 Days",
    docFee: "LKR 15,000",
    cidaGrade: "CIDA Grade C3 or higher in Highway Construction",
    preBidMeeting: "15 September 2026 at 10:30 AM (RDA Provincial Office, Kandy)",
    openingTime: "28 September 2026 at 14:00 PM",
    contactPerson: "Executive Engineer — RDA Central Province",
    contactPhone: "+94 81 222 3456",
    contactEmail: "rdakandy@rda.gov.lk",
    submissionAddress: "Office of the Provincial Director, RDA, Kandy",
    deliveryPeriod: "240 Calendar Days",
    paymentTerms: "Interim monthly progress measurement claims",
    isPromoted: false,
    isUrgent: false,
    hasDocuments: true,
    docCount: 5,
    description: "Rehabilitation of 14.2 km provincial road network including widening, sub-base preparation, binder course asphalt paving, roadside concrete drain reconstruction, and safety signage.",
    technicalSpecs: [
      "Pavement: 50mm Asphalt Concrete wearing course over 150mm Aggregate Base Course (ABC)",
      "Culverts: Pre-cast reinforced concrete pipe culverts with masonry headwalls",
      "Testing: Daily field compaction tests (BS 1377) and core density analysis",
    ],
    documentsList: [
      { name: "RDA_Road_Rehabilitation_Drawings.pdf", size: "8.5 MB", type: "PDF", hash: "3bc1028f4a1c0245a91ee59a2243d9370129bc61e0e84b7218683a483e5898ef" },
      { name: "RDA_Standard_Highway_BOQ.xlsx", size: "1.2 MB", type: "XLSX", hash: "efb132a89345e672901239856abcf1243e3b0c44298fc1c149afbf4c8996fb92" },
    ],
  },
  {
    id: "SPC-JAN-2026",
    ref: "SPC/JAN/2026",
    title: "Provision of Comprehensive Janitorial, Sanitation & Waste Management Services",
    entity: "Southern Provincial Council",
    province: "southern",
    district: "Galle",
    location: "Chief Secretariat Complex, Galle",
    source: "Silumina & Thinakaran",
    startDate: "01.09.2026",
    endDate: "15.10.2026",
    daysLeft: 3,
    contractType: "Facility Management Agreement",
    instrumentType: "Quotation",
    sector: "private",
    categoryId: "cleaning",
    categoryName: "Janitorial & Facilities",
    valueBand: "5M-25M",
    amount: "LKR 6,200,000",
    amountNumeric: 6200000,
    bidBond: "LKR 60,000",
    bidBondValidity: "90 Days",
    docFee: "LKR 2,500",
    cidaGrade: "Registered Facility Management Provider with 3+ years public sector experience",
    preBidMeeting: "20 September 2026 at 09:30 AM (Southern Provincial Council Auditorium)",
    openingTime: "15 October 2026 at 11:00 AM",
    contactPerson: "Assistant Secretary (Administration & Facilities)",
    contactPhone: "+94 91 223 2145",
    contactEmail: "admin@spc.gov.lk",
    submissionAddress: "Chief Secretariat Complex, Southern Provincial Council, Galle",
    deliveryPeriod: "12 Months Service Contract (Renewable)",
    paymentTerms: "Monthly service invoice upon certification of satisfactory sanitation inspection",
    isPromoted: false,
    isUrgent: true,
    hasDocuments: true,
    docCount: 2,
    description: "Daily hygiene sanitation, floor maintenance, deep disinfection, window cleaning, and waste disposal for the 5-story administrative secretariat complex.",
    technicalSpecs: [
      "Staffing: Minimum 35 trained janitorial personnel with dedicated onsite supervisor",
      "Chemicals: Eco-friendly biodegradable sanitation reagents certified under SLS standards",
      "Equipment: High-pressure floor scrubbers, wet/dry industrial vacuum extractors",
    ],
    documentsList: [
      { name: "SPC_Janitorial_Service_Requirements.pdf", size: "890 KB", type: "PDF", hash: "98fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c442" },
      { name: "Daily_Inspection_Checklist_Schedule.xlsx", size: "320 KB", type: "XLSX", hash: "2901239856abcf1243e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b93" },
    ],
  },
];

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedValueBand, setSelectedValueBand] = useState<string>("all");
  const [closingWindow, setClosingWindow] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<"all" | "government" | "private" | "donor">("all");
  const [sortBy, setSortBy] = useState("closing");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Density & View Mode
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  // Interactive Tools & Quick-View Drawer with 4 Tabs
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const [quickViewTender, setQuickViewTender] = useState<TenderItem | null>(null);
  const [drawerTab, setDrawerTab] = useState<"overview" | "docs" | "cida" | "contact">("overview");
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [downloadSuccessDoc, setDownloadSuccessDoc] = useState<string | null>(null);

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

  const simulateDownload = (docName: string) => {
    setDownloadSuccessDoc(docName);
    setTimeout(() => setDownloadSuccessDoc(null), 2500);
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
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1. eTenders STYLE HERO BANNER WITH INTEGRATED FULL SEARCH FILTER ENGINE */}
      <section className="relative rounded-2xl overflow-hidden mb-8 shadow-xl bg-linear-to-r from-[#0055B8] via-[#0066E0] to-[#004CA3] text-white">
        
        {/* Background Lotus Tower / City Silhouette */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#004DA8]/95 via-[#005BBF]/85 to-[#004DA8]/90 pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-10 lg:px-12 pt-8 pb-7">
          
          {/* Top Heading */}
          <div className="mb-6 max-w-3xl">
            <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-200 mb-1.5">
              THE LARGEST COLLECTION OF
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] mb-2.5">
              TENDERS IN SRI LANKA
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed max-w-2xl">
              We take pride in our verified procurement services which we have had the pleasure of providing to our valued contractors &amp; suppliers across Sri Lanka.
            </p>
          </div>

          {/* FULL INTEGRATED SEARCH & FILTER PANEL INSIDE HERO */}
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-2xl text-gray-900 border border-white/30">
            
            {/* Primary Search Bar */}
            <div className="mb-3 relative" ref={searchContainerRef}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by tender title, procuring entity, reference code, or keywords..."
                  value={keyword}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-[#F8F9FB] border border-[#D9DFE7] focus:border-[#0055B8] focus:bg-white rounded-lg py-2.5 pl-4 pr-16 text-xs sm:text-sm font-semibold text-[#111827] outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
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

            {/* 4 Core Dropdowns + Action CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-2.5">
              
              {/* Category */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#4B5563] block mb-1">
                  CATEGORY
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
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#4B5563] block mb-1">
                  PROVINCE
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
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#4B5563] block mb-1">
                  VALUE BAND
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
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#4B5563] block mb-1">
                  CLOSING DEADLINE
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

              {/* Action Buttons */}
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const element = document.getElementById("tender-results-section");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs sm:text-sm py-2.5 px-3 rounded-md transition-colors uppercase tracking-wider shadow-xs whitespace-nowrap"
                >
                  FIND TENDERS
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
            <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-[#F1F3F7]">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4B5563] mr-1">
                QUICK FILTERS:
              </span>
              <button
                type="button"
                onClick={() => applyPreset("urgent")}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                  activePreset === "urgent"
                    ? "bg-red-600 text-white border-red-600 shadow-xs font-bold"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Closing in ≤ 7 Days
              </button>
              <button
                type="button"
                onClick={() => applyPreset("gov")}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                  activePreset === "gov"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs font-bold"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Central Government
              </button>
              <button
                type="button"
                onClick={() => applyPreset("highValue")}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                  activePreset === "highValue"
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-xs font-bold"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                High Value (&gt; 30M LKR)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("western")}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                  activePreset === "western"
                    ? "bg-[#0055B8] text-white border-[#0055B8] shadow-xs font-bold"
                    : "bg-[#F8F9FB] text-[#374151] border-gray-300 hover:bg-gray-200"
                }`}
              >
                Western Province
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 2. MAIN 2-COLUMN STRUCTURAL LAYOUT */}
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

        {/* RIGHT COLUMN: DIRECT TENDER RESULTS (NO DUPLICATE SEARCH BAR) */}
        <main className="lg:col-span-9 xl:col-span-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-xs font-medium text-gray-500 mb-3 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0055B8]">Home</Link>
            <span>&rsaquo;</span>
            <span>Procurement Gazettes</span>
            <span>&rsaquo;</span>
            <span className="text-[#0055B8] font-bold">National Tenders &amp; RFPs</span>
          </nav>

          {/* 4. RESULTS HEADER & CONTROLS */}
          <section id="tender-results-section" className="mb-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#E2E6ED]">
              
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                  Tender Notices ({filteredTenders.length})
                </h3>
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                  Verified procurement publications
                </span>
              </div>

              {/* View Switcher, Density Switcher & Sort Selector */}
              <div className="flex items-center gap-2">
                
                {/* View Switcher */}
                <div className="flex bg-[#F1F3F7] p-0.5 rounded border border-[#E2E6ED]">
                  <button
                    type="button"
                    onClick={() => setViewMode("cards")}
                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                      viewMode === "cards" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Grid Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                      viewMode === "list" ? "bg-white text-[#0055B8] shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Dense List
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#D9DFE7] rounded px-3 py-1.5 text-xs font-semibold text-[#111827] outline-none"
                >
                  <option value="closing">Sort: Closing Soonest</option>
                  <option value="newest">Sort: Newly Published</option>
                  <option value="amountDesc">Sort: Budget (High to Low)</option>
                  <option value="amountAsc">Sort: Budget (Low to High)</option>
                </select>

              </div>

            </div>
          </section>

          {/* 5. RESULTS DISPLAY: PROFESSIONAL HUMAN-DESIGNED CARDS OR TABLE */}
          {viewMode === "cards" ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
              {filteredTenders.map((tender) => {
                const isSaved = savedTenders.has(tender.id);

                return (
                  <article
                    key={tender.id}
                    onClick={() => { setQuickViewTender(tender); setDrawerTab("overview"); }}
                    className="bg-white border border-[#D9DFE7] hover:border-[#0055B8] rounded-lg p-5 flex flex-col justify-between transition-all hover:shadow-sm cursor-pointer group"
                  >
                    <div>
                      {/* Top Authority & Urgency Row */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-gray-100 text-xs">
                        <span className="font-bold text-[#0055B8] uppercase tracking-wide truncate">
                          {tender.entity}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            tender.daysLeft <= 3
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          }`}>
                            {tender.daysLeft}d left
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(e, tender.id)}
                            title={isSaved ? "Remove from watchlist" : "Save to watchlist"}
                            className="text-gray-400 hover:text-amber-500 font-bold px-1"
                          >
                            {isSaved ? "★" : "☆"}
                          </button>
                        </div>
                      </div>

                      {/* Main Title */}
                      <h4 className="text-[15px] font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#0055B8] transition-colors line-clamp-2">
                        {tender.title}
                      </h4>

                      {/* Key Meta Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-600 mb-4">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">
                          {tender.categoryName}
                        </span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">
                          {tender.district}
                        </span>
                        <span className="text-gray-400 font-mono text-[10px]">
                          Ref: {tender.ref}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Budget & Action */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          Budget Estimate
                        </div>
                        <div className="text-base font-black text-gray-900 font-mono">
                          {tender.amount}
                        </div>
                      </div>
                      
                      <span className="text-xs font-bold text-[#0055B8] group-hover:underline flex items-center gap-1">
                        View Details &rarr;
                      </span>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : (
            /* DENSE TABLE VIEW */
            <section className="bg-white border border-[#D9DFE7] rounded-lg overflow-hidden mb-12 shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8F9FB] border-b border-[#D9DFE7] text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Procuring Entity &amp; Ref</th>
                      <th className="px-4 py-3">Tender Title</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Closing Date</th>
                      <th className="px-4 py-3 text-right">Value (LKR)</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-medium text-gray-900">
                    {filteredTenders.map((tender) => {
                      const isSaved = savedTenders.has(tender.id);
                      return (
                        <tr 
                          key={tender.id}
                          onClick={() => { setQuickViewTender(tender); setDrawerTab("overview"); }}
                          className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="font-bold text-[#0055B8]">{tender.entity}</div>
                            <div className="text-[11px] text-gray-500 font-mono">{tender.ref}</div>
                          </td>
                          <td className="px-4 py-3 font-bold text-gray-900 max-w-sm">
                            {tender.title}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                              {tender.categoryName}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">
                            <span className={tender.daysLeft <= 3 ? "text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200" : "text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"}>
                              {tender.endDate} ({tender.daysLeft}d left)
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono font-black text-right text-gray-900 whitespace-nowrap">
                            {tender.amount}
                          </td>
                          <td className="px-4 py-3 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => toggleBookmark(e, tender.id)}
                                className="text-gray-400 hover:text-amber-500 font-bold"
                              >
                                {isSaved ? "★" : "☆"}
                              </button>
                              <span className="text-xs font-bold text-[#0055B8] hover:underline">
                                Details &rarr;
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
      {/* 6. FULL-FEATURED INSTITUTIONAL TENDER QUICK-VIEW DRAWER (4 TABS) */}
      {/* ========================================================================= */}
      {quickViewTender && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setQuickViewTender(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top Sticky Header */}
              <div className="sticky top-0 bg-white z-20 px-6 py-4 border-b border-[#E2E6ED] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0055B8] uppercase tracking-wider font-mono block">
                    OFFICIAL GAZETTE REF: {quickViewTender.ref}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {quickViewTender.source}
                  </span>
                </div>
                <button
                  onClick={() => setQuickViewTender(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-bold text-xl"
                >
                  &times;
                </button>
              </div>

              {/* Tender Key Title Box */}
              <div className="p-6 pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-[#0055B8] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                    {quickViewTender.contractType}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded border border-emerald-200">
                    ⏳ {quickViewTender.daysLeft} Days Remaining
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">
                    📁 {quickViewTender.categoryName}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-2 leading-snug">
                  {quickViewTender.title}
                </h2>

                <p className="text-xs sm:text-sm font-bold text-[#0055B8] mb-4">
                  {quickViewTender.entity} — {quickViewTender.location}
                </p>

                {/* Primary Data Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-[#F8F9FB] rounded-xl border border-[#E2E6ED] mb-5 font-mono text-xs">
                  <div>
                    <span className="text-[10px] font-sans uppercase font-bold text-gray-500 block mb-0.5">Budget Estimate</span>
                    <span className="text-base font-black text-[#0055B8] block">{quickViewTender.amount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase font-bold text-gray-500 block mb-0.5">Required Bid Bond</span>
                    <span className="text-xs font-bold text-gray-900 block">{quickViewTender.bidBond}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase font-bold text-gray-500 block mb-0.5">Submission Deadline</span>
                    <span className="text-xs font-bold text-red-600 block">{quickViewTender.endDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase font-bold text-gray-500 block mb-0.5">Doc Fee (Non-ref)</span>
                    <span className="text-xs font-bold text-gray-900 block">{quickViewTender.docFee}</span>
                  </div>
                </div>

                {/* 4 Navigation Tabs Inside Drawer */}
                <div className="flex border-b border-[#E2E6ED] mb-5 overflow-x-auto text-xs font-bold">
                  <button
                    onClick={() => setDrawerTab("overview")}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider whitespace-nowrap ${
                      drawerTab === "overview"
                        ? "text-[#0055B8] border-b-2 border-[#0055B8]"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    📋 Overview &amp; Scope
                  </button>
                  <button
                    onClick={() => setDrawerTab("docs")}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 ${
                      drawerTab === "docs"
                        ? "text-[#0055B8] border-b-2 border-[#0055B8]"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    <span>📄 Bidding Docs ({quickViewTender.documentsList.length})</span>
                  </button>
                  <button
                    onClick={() => setDrawerTab("cida")}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider whitespace-nowrap ${
                      drawerTab === "cida"
                        ? "text-[#0055B8] border-b-2 border-[#0055B8]"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    🏛️ CIDA &amp; Bid Bond
                  </button>
                  <button
                    onClick={() => setDrawerTab("contact")}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider whitespace-nowrap ${
                      drawerTab === "contact"
                        ? "text-[#0055B8] border-b-2 border-[#0055B8]"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    📞 How to Bid &amp; Inquiries
                  </button>
                </div>

                {/* TAB 1: OVERVIEW & SCOPE */}
                {drawerTab === "overview" && (
                  <div className="space-y-5 animate-fadeIn">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 mb-2">
                        1. Scope of Work &amp; Deliverables
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#F8F9FB] p-4 rounded-lg border border-[#E2E6ED]">
                        {quickViewTender.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 mb-2">
                        2. Key Technical Standards &amp; Equipment Specifications
                      </h4>
                      <div className="bg-white border border-[#E2E6ED] rounded-lg divide-y divide-gray-100 text-xs">
                        {quickViewTender.technicalSpecs.map((spec, i) => (
                          <div key={i} className="p-3 flex items-start gap-2 text-gray-700">
                            <span className="text-[#0055B8] font-bold">✓</span>
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-blue-50/70 p-3.5 rounded-lg border border-blue-200">
                      <div>
                        <span className="font-bold text-[#0055B8] block mb-0.5">Contract Execution Period:</span>
                        <span className="text-gray-800 font-semibold">{quickViewTender.deliveryPeriod}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#0055B8] block mb-0.5">Commercial Payment Terms:</span>
                        <span className="text-gray-800 font-semibold">{quickViewTender.paymentTerms}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: DOCUMENTS & BOQ */}
                {drawerTab === "docs" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                        Official Bidding Documents &amp; BOQ Schedules
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-mono">
                        SHA-256 Content-Addressed
                      </span>
                    </div>

                    {downloadSuccessDoc && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded font-semibold flex items-center justify-between">
                        <span>✓ Download link minted for <strong>{downloadSuccessDoc}</strong> (Valid for 5 minutes).</span>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      {quickViewTender.documentsList.map((doc, idx) => (
                        <div 
                          key={idx}
                          className="bg-[#F8F9FB] border border-[#E2E6ED] hover:border-[#0055B8] p-3.5 rounded-xl flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                              doc.type === "PDF" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {doc.type}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0F172A] leading-tight mb-1">
                                {doc.name}
                              </div>
                              <div className="text-[11px] text-gray-500 font-mono">
                                <span>{doc.size}</span> · <span className="truncate inline-block max-w-[200px] align-bottom">Hash: {doc.hash.slice(0, 16)}...</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => simulateDownload(doc.name)}
                            className="bg-white hover:bg-[#0055B8] hover:text-white border border-[#D9DFE7] text-[#0055B8] font-bold text-xs px-3 py-1.5 rounded transition-colors whitespace-nowrap shadow-2xs"
                          >
                            Download PDF ↓
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-gray-50 border rounded-lg text-xs text-gray-600">
                      ℹ️ All files are cryptographically mirrored directly from the Ministry Procurement Registry.
                    </div>
                  </div>
                )}

                {/* TAB 3: CIDA & BID BOND */}
                {drawerTab === "cida" && (
                  <div className="space-y-4 animate-fadeIn text-xs">
                    <div className="bg-[#F8F9FB] p-4 rounded-xl border border-[#E2E6ED] space-y-3">
                      <div>
                        <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                          CONTRACTOR CIDA / ICTAD ELIGIBILITY GRADE
                        </span>
                        <div className="text-sm font-extrabold text-[#0055B8]">
                          {quickViewTender.cidaGrade}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                          BID SECURITY / BANK GUARANTEE
                        </span>
                        <div className="text-xs font-bold text-gray-900">
                          {quickViewTender.bidBond}
                        </div>
                        <div className="text-gray-600 mt-0.5">
                          Validity Requirement: <strong>{quickViewTender.bidBondValidity}</strong>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                          DOCUMENT PURCHASE FEE
                        </span>
                        <div className="text-xs font-bold text-gray-900">
                          {quickViewTender.docFee}
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-lg text-amber-900 leading-relaxed">
                      ⚠️ <strong>Mandatory Note:</strong> Bids without a valid original Bank Guarantee or from contractors below the required CIDA registration grade will be rejected at the opening ceremony.
                    </div>
                  </div>
                )}

                {/* TAB 4: HOW TO BID & INQUIRIES */}
                {drawerTab === "contact" && (
                  <div className="space-y-4 animate-fadeIn text-xs">
                    <div className="bg-[#F8F9FB] p-4 rounded-xl border border-[#E2E6ED] space-y-3">
                      <div>
                        <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                          PHYSICAL SUBMISSION TENDER BOX LOCATION
                        </span>
                        <div className="text-xs font-bold text-gray-900 leading-normal">
                          {quickViewTender.submissionAddress}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                          PRE-BID CLARIFICATION CONFERENCE
                        </span>
                        <div className="text-xs font-bold text-[#0055B8]">
                          {quickViewTender.preBidMeeting}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                          SEALED BID OPENING TIME
                        </span>
                        <div className="text-xs font-bold text-emerald-800">
                          {quickViewTender.openingTime}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-[#0055B8]/30 p-4 rounded-xl space-y-2">
                      <span className="font-extrabold uppercase tracking-wider text-[#0055B8] text-[11px] block">
                        DIRECT PROCUREMENT INQUIRIES OFFICER
                      </span>
                      <div className="font-bold text-gray-900">{quickViewTender.contactPerson}</div>
                      <div className="text-gray-700">Telephone: <strong>{quickViewTender.contactPhone}</strong></div>
                      <div className="text-gray-700">Official Email: <strong className="text-[#0055B8]">{quickViewTender.contactEmail}</strong></div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Sticky Bottom Action Buttons */}
            <div className="sticky bottom-0 bg-white z-20 p-4 border-t border-[#E2E6ED] flex gap-2.5">
              <Link
                href={`/tender/${quickViewTender.id}`}
                className="flex-1 text-center bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs py-3 px-3 rounded-md uppercase tracking-wider transition-colors shadow-xs"
              >
                Open Full Gazette Notice Page &rarr;
              </Link>
              <button
                type="button"
                onClick={(e) => copyReference(e, quickViewTender.ref)}
                className="px-4 py-3 border-2 border-[#D9DFE7] hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-md uppercase tracking-wider"
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
