import { NextResponse } from 'next/server';

const MOCK_TENDERS = [
  {
    id: "MOE-2026-SP-01",
    ref: "MOE/2026/SP-01",
    title: "Supply and installation of solar power infrastructure for rural schools",
    entity: "Ministry of Education",
    province: "western",
    location: "Colombo, Western Province",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 10,
    contractType: "Government Contract",
    sector: "government",
    categoryId: "solar",
    categoryName: "Renewable Energy & Solar",
    amount: "LKR 17,000,000",
    amountNumeric: 17000000,
    isPromoted: false,
    isUrgent: false,
    description: "Installation of complete on-grid solar photovoltaic systems with battery storage for 50 secondary schools in Western Province.",
    bidBond: "LKR 200,000"
  },
  {
    id: "SLPA-2026-PT-04",
    ref: "SLPA/2026/PT-04",
    title: "Repair of southern maritime port infrastructure & docking facilities",
    entity: "Sri Lanka Ports Authority (SLPA)",
    province: "southern",
    location: "Galle, Southern Province",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 12,
    contractType: "Federal Contract",
    sector: "government",
    categoryId: "construction",
    categoryName: "Civil Construction & Works",
    amount: "LKR 48,500,000",
    amountNumeric: 48500000,
    isPromoted: true,
    isUrgent: false,
    description: "Underwater pile rehabilitation, cathode protection renewal, and dock apron concrete resurfacing at Southern Terminal.",
    bidBond: "LKR 500,000"
  },
  {
    id: "BOC-IT-26-08",
    ref: "BOC/IT/26/08",
    title: "Procurement of enterprise server hardware and desktop workstations",
    entity: "Bank of Ceylon",
    province: "western",
    location: "Colombo, Western Province",
    startDate: "12.08.2026",
    endDate: "12.10.2026",
    daysLeft: 15,
    contractType: "Banking Procurement",
    sector: "government",
    categoryId: "it",
    categoryName: "Computer, Servers & IT",
    amount: "LKR 10,000,000",
    amountNumeric: 10000000,
    isPromoted: false,
    isUrgent: false,
    description: "Supply, testing, and commissioning of 120 rackmount enterprise servers and 500 branch terminal workstations.",
    bidBond: "LKR 150,000"
  },
  {
    id: "MOH-PH-26-11",
    ref: "MOH/PH/26/11",
    title: "Supply of pharmaceuticals, laboratory reagents and surgical consumables",
    entity: "Ministry of Health",
    province: "western",
    location: "Colombo, Western Province",
    startDate: "15.08.2026",
    endDate: "20.10.2026",
    daysLeft: 20,
    contractType: "State Procurement",
    sector: "government",
    categoryId: "medical",
    categoryName: "Medical & Pharmaceuticals",
    amount: "LKR 32,000,000",
    amountNumeric: 32000000,
    isPromoted: false,
    isUrgent: false,
    description: "Annual supply agreement for essential therapeutic reagents, intravenous infusion sets, and disposable surgical supplies.",
    bidBond: "LKR 350,000"
  },
  {
    id: "RDA-KY-26-044",
    ref: "RDA/KY/26/044",
    title: "Rehabilitation and asphalt paving of provincial access roads — Kandy",
    entity: "Road Development Authority (RDA)",
    province: "central",
    location: "Kandy, Central Province",
    startDate: "10.08.2026",
    endDate: "28.09.2026",
    daysLeft: 16,
    contractType: "Highway Contract",
    sector: "government",
    categoryId: "construction",
    categoryName: "Civil Construction & Works",
    amount: "LKR 85,000,000",
    amountNumeric: 85000000,
    isPromoted: false,
    isUrgent: false,
    description: "Asphalt overlay, drainage culvert reconstruction, and guardrail installation along 14.2 km of provincial highway.",
    bidBond: "LKR 850,000"
  },
  {
    id: "SPC-JAN-2026",
    ref: "SPC/JAN/2026",
    title: "Provision of comprehensive facility janitorial & maintenance services",
    entity: "Southern Provincial Council",
    province: "southern",
    location: "Galle, Southern Province",
    startDate: "01.09.2026",
    endDate: "15.10.2026",
    daysLeft: 3,
    contractType: "Service Agreement",
    sector: "private",
    categoryId: "cleaning",
    categoryName: "Janitorial & Facilities",
    amount: "LKR 6,200,000",
    amountNumeric: 6200000,
    isPromoted: false,
    isUrgent: true,
    description: "Daily hygiene sanitation, waste disposal, and facility maintenance for the 5-story Provincial Secretariat Complex.",
    bidBond: "LKR 60,000"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();
  const sector = searchParams.get('sector');
  const categoryId = searchParams.get('categoryId');
  const province = searchParams.get('province');

  let results = [...MOCK_TENDERS];

  if (q) {
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.entity.toLowerCase().includes(q) ||
        t.ref.toLowerCase().includes(q)
    );
  }

  if (sector && sector !== 'all') {
    results = results.filter((t) => t.sector === sector);
  }

  if (categoryId && categoryId !== 'all') {
    results = results.filter((t) => t.categoryId === categoryId);
  }

  if (province && province !== 'all') {
    results = results.filter((t) => t.province === province);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
    metrics: { liveCount: 366, closingThisWeek: 41, totalPublished: 39942 }
  });
}
