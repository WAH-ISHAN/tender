import type { Notice, AuctionLot } from "./types";

const MOCK_NOTICES: Notice[] = [
  {
    id: 1,
    kind: "tender",
    reference: "RDA/CP/2026/114",
    slug: "rda-cp-2026-114-rehabilitation-of-colombo-katunayake-access-road",
    title: "Rehabilitation of Colombo–Katunayake access road shoulders",
    sector: "government",
    category: "Civil & Infrastructure",
    category_slug: "civil-infrastructure",
    district: "Colombo",
    district_slug: "colombo",
    estimated_value: 92000000,
    currency: "LKR",
    closing_at: new Date(Date.now() + 14 * 86400000).toISOString(),
    opening_at: new Date(Date.now() + 14 * 86400000 + 1800000).toISOString(),
    status: "live",
    documents_count: 4,
    is_native: true,
    tier: "paid",
    locked: [],
    summary: "Reconstruction and asphalt overlay of road shoulders along 14.2 km of the expressway approach.",
    buyer: "Road Development Authority",
    published_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    contact_officer: "Eng. K. M. Wickramasinghe (Chief Engineer)",
    contact_phone: "+94 11 286 2795",
    contact_email: "procurement@rda.gov.lk",
    document_fee: 12500,
    bid_security: 920000,
  },
  {
    id: 2,
    kind: "tender",
    reference: "MOH/NB/2026/077",
    slug: "moh-nb-2026-077-construction-of-two-storey-ward-complex",
    title: "Construction of a two-storey ward complex, Base Hospital Negombo",
    sector: "government",
    category: "Civil & Infrastructure",
    category_slug: "civil-infrastructure",
    district: "Gampaha",
    district_slug: "gampaha",
    estimated_value: 340000000,
    currency: "LKR",
    closing_at: new Date(Date.now() + 21 * 86400000).toISOString(),
    opening_at: new Date(Date.now() + 21 * 86400000 + 3600000).toISOString(),
    status: "live",
    documents_count: 6,
    is_native: true,
    tier: "paid",
    locked: [],
    summary: "Construction of 120-bed maternity and pediatric facility with HVAC and medical gas systems.",
    buyer: "Ministry of Health",
    published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    contact_officer: "Dr. A. P. Jayawardena",
    contact_phone: "+94 11 269 4033",
    contact_email: "tenders@health.gov.lk",
    document_fee: 25000,
    bid_security: 3400000,
  },
  {
    id: 3,
    kind: "tender",
    reference: "NWSDB/KL/2026/203",
    slug: "nwsdb-kl-2026-203-laying-of-distribution-mains",
    title: "Laying of 12 km distribution mains, Kalutara North scheme",
    sector: "government",
    category: "Water & Drainage",
    category_slug: "water-drainage",
    district: "Kalutara",
    district_slug: "kalutara",
    estimated_value: 145000000,
    currency: "LKR",
    closing_at: new Date(Date.now() + 6 * 86400000).toISOString(),
    opening_at: new Date(Date.now() + 6 * 86400000 + 1800000).toISOString(),
    status: "closing_soon",
    documents_count: 3,
    is_native: true,
    tier: "paid",
    locked: [],
    summary: "Ductile iron piping installation and pressure testing across Kalutara North municipal zones.",
    buyer: "National Water Supply & Drainage Board",
    published_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    document_fee: 15000,
    bid_security: 1450000,
  },
  {
    id: 4,
    kind: "auction",
    reference: "BOC/PE/2026/318",
    slug: "boc-pe-2026-318-parate-execution-sale-commercial-land-nugegoda",
    title: "Parate execution sale — 42 perch commercial land, Nugegoda",
    sector: "government",
    category: "Property & Land",
    category_slug: "property-land",
    district: "Colombo",
    district_slug: "colombo",
    estimated_value: 78000000,
    currency: "LKR",
    closing_at: new Date(Date.now() + 8 * 86400000).toISOString(),
    opening_at: new Date(Date.now() + 8 * 86400000).toISOString(),
    status: "live",
    documents_count: 2,
    is_native: true,
    tier: "paid",
    locked: [],
    summary: "Public auction under Recovery of Loans by Banks (Special Provisions) Act No. 4 of 1990.",
    buyer: "Bank of Ceylon",
    published_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    auction: {
      lot_no: "LOT-01",
      asset_class: "Commercial Land",
      method: "Parate Execution",
      reserve: 78000000,
      deposit_pct: 10,
      deposit: 7800000,
      venue: "High Level Road, Nugegoda (On-site)",
      auctioneer: "Schokman & Samerawickreme",
      result: null,
      hammer_price: null,
      custody_note: "TenderHub records deposit verification but never takes custody of auction funds.",
    },
  },
  {
    id: 5,
    kind: "auction",
    reference: "PB/VR/2026/205",
    slug: "pb-vr-2026-205-auction-of-repossessed-vehicles",
    title: "Auction of repossessed vehicles — 14 lots, Gampaha yard",
    sector: "government",
    category: "Vehicles & Transport",
    category_slug: "vehicles-transport",
    district: "Gampaha",
    district_slug: "gampaha",
    estimated_value: 3200000,
    currency: "LKR",
    closing_at: new Date(Date.now() + 3 * 86400000).toISOString(),
    opening_at: new Date(Date.now() + 3 * 86400000).toISOString(),
    status: "closing_soon",
    documents_count: 1,
    is_native: true,
    tier: "paid",
    locked: [],
    summary: "Sealed bids and open outcry auction for Toyota, Isuzu and Mitsubishi double cabs and trucks.",
    buyer: "People's Bank",
    published_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    auction: {
      lot_no: "LOT-01-14",
      asset_class: "Commercial Vehicles",
      method: "Vehicle Recovery",
      reserve: 3200000,
      deposit_pct: 15,
      deposit: 480000,
      venue: "People's Bank Regional Yard, Yakkala, Gampaha",
      auctioneer: "E. B. Creasy & Co.",
      result: null,
      hammer_price: null,
      custody_note: "TenderHub records deposit verification but never takes custody of auction funds.",
    },
  },
];

export function getMockResponse(path: string): any | null {
  const url = path.split("?")[0];
  const now = new Date().toISOString();

  // 1. Public Catalogue Notices & Auctions
  if (url === "/api/v1/notices" || url === "/api/v1/auctions") {
    const isAuction = url.includes("auctions");
    const data = MOCK_NOTICES.filter((n) => isAuction ? n.kind === "auction" : n.kind === "tender");
    return {
      data,
      meta: {
        now,
        total: data.length,
        status_counts: { live: data.filter((n) => n.status === "live").length, closing_soon: 1, closed: 140 },
        facets: {
          category: [
            { slug: "civil-infrastructure", label: "Civil & Infrastructure", n: 12 },
            { slug: "water-drainage", label: "Water & Drainage", n: 4 },
            { slug: "property-land", label: "Property & Land", n: 3 },
            { slug: "vehicles-transport", label: "Vehicles & Transport", n: 5 },
          ],
          district: [
            { slug: "colombo", label: "Colombo", n: 14 },
            { slug: "gampaha", label: "Gampaha", n: 6 },
            { slug: "kalutara", label: "Kalutara", n: 4 },
          ],
          sector: [
            { slug: "government", label: "Government", n: 21 },
            { slug: "private", label: "Private", n: 3 },
            { slug: "donor", label: "Donor / Multilateral", n: 2 },
          ],
          value_band: [
            { slug: "under-5m", label: "Under Rs. 5 M", n: 4 },
            { slug: "5m-50m", label: "Rs. 5 M - Rs. 50 M", n: 9 },
            { slug: "50m-500m", label: "Rs. 50 M - Rs. 500 M", n: 11 },
            { slug: "over-500m", label: "Over Rs. 500 M", n: 2 },
          ],
        },
      },
    };
  }

  // 2. Admin System Health
  if (url === "/api/v1/admin/reports/health") {
    return {
      data: {
        catalogue: {
          live: 366,
          archived: 39576,
          added_today: 14,
          verified_pct: 98,
          awaiting_review: 2,
          minutes_since_fetch: 18,
        },
        accounts: {
          bidders: 3840,
          paying_bidders: 482,
          conversion_pct: 12.5,
          publishers: 142,
          awaiting_payment: 3,
          unverified_orgs: 5,
        },
        engagement: {
          active_alert_profiles: 1290,
          tenders_in_pipelines: 840,
          submissions: 412,
          awards: 94,
        },
      },
      meta: { now },
    };
  }

  // 3. Admin Coverage
  if (url === "/api/v1/admin/reports/coverage") {
    return {
      data: [
        { district: "Colombo", n: 148 },
        { district: "Gampaha", n: 64 },
        { district: "Kandy", n: 38 },
        { district: "Galle", n: 26 },
        { district: "Kurunegala", n: 22 },
        { district: "Kalutara", n: 18 },
        { district: "Anuradhapura", n: 14 },
        { district: "Jaffna", n: 12 },
        { district: "Matara", n: 11 },
        { district: "Ratnapura", n: 9 },
        { district: "Badulla", n: 8 },
        { district: "Trincomalee", n: 7 },
      ],
      meta: { now },
    };
  }

  // 4. Admin Payments Queue
  if (url === "/api/v1/admin/payments") {
    return {
      data: [
        {
          id: 101,
          org: "Ranmuthu Engineering (Pvt) Ltd",
          email: "finance@ranmuthu.lk",
          amount: 24000,
          term: "Annual (12 Months)",
          bank: "Commercial Bank PLC",
          slip_ref: "TXN-CB-849201",
          paid_on: "2026-08-30",
          channel: "WhatsApp (+94 77 123 4567)",
          waiting_hours: 4,
          overdue: false,
          state: "claimed",
          created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
        },
        {
          id: 102,
          org: "Lakbima Builders & Contractors",
          email: "info@lakbima.lk",
          amount: 7500,
          term: "Quarterly (3 Months)",
          bank: "Bank of Ceylon",
          slip_ref: "BOC-DEP-39104",
          paid_on: "2026-08-29",
          channel: "Email (billing@tenderhub.lk)",
          waiting_hours: 28,
          overdue: true,
          state: "claimed",
          created_at: new Date(Date.now() - 28 * 3600000).toISOString(),
        },
      ],
      meta: {
        now,
        bank: {
          bank: "Commercial Bank of Ceylon PLC",
          branch: "Colombo Fort Main",
          account_number: "1000 8492 0184",
          account_name: "TenderHub Digital (Pvt) Ltd",
        },
      },
    };
  }

  // 5. Admin Organisations
  if (url === "/api/v1/admin/organisations") {
    return {
      data: [
        { id: 1, name: "Road Development Authority", type: "company", district: "Colombo", cida_grade: "—", plan: "publish", seats: 12, tenders_count: 28, bids_count: 0, verify_state: "verified", created_at: "2026-01-10" },
        { id: 2, name: "Ranmuthu Engineering (Pvt) Ltd", type: "bidder", district: "Colombo", cida_grade: "C1 (Highway/Bridge)", plan: "business", seats: 3, tenders_count: 0, bids_count: 14, verify_state: "verified", created_at: "2026-02-14" },
        { id: 3, name: "Ministry of Health", type: "company", district: "Colombo", cida_grade: "—", plan: "publish", seats: 20, tenders_count: 42, bids_count: 0, verify_state: "verified", created_at: "2026-01-12" },
      ],
      meta: { now },
    };
  }

  // 6. Admin Ingestion Sources
  if (url === "/api/v1/admin/ingest/sources") {
    return {
      data: [
        { id: 1, name: "Government Gazette (Department of Government Printing)", slug: "gov-gazette", baseline_weekly: 84, verified_pct: 100, last_fetch_at: new Date(Date.now() - 25 * 60000).toISOString(), status: "healthy" },
        { id: 2, name: "Road Development Authority E-Procurement Portal", slug: "rda-gov", baseline_weekly: 14, verified_pct: 96, last_fetch_at: new Date(Date.now() - 45 * 60000).toISOString(), status: "healthy" },
        { id: 3, name: "Ceylon Electricity Board Notice Desk", slug: "ceb-lk", baseline_weekly: 18, verified_pct: 94, last_fetch_at: new Date(Date.now() - 110 * 60000).toISOString(), status: "healthy" },
      ],
      meta: { now },
    };
  }

  // 7. Authority Tenders Workspace
  if (url.startsWith("/api/v1/authority/tenders")) {
    const isSingle = url.match(/\/authority\/tenders\/(\d+)$/);
    if (isSingle) {
      return {
        data: {
          id: Number(isSingle[1]),
          reference: "RDA/CP/2026/114",
          title: "Rehabilitation of Colombo–Katunayake access road shoulders",
          stage_idx: 4, // Opened
          status: "opened",
          estimated_value: 92000000,
          currency: "LKR",
          closing_at: new Date(Date.now() - 2 * 86400000).toISOString(),
          opening_at: new Date(Date.now() - 2 * 86400000 + 1800000).toISOString(),
          created_by_id: 1,
          approved_by_id: 2,
          opened_by_a: 1,
          opened_by_b: 3,
          created_at: "2026-08-01",
        },
        meta: {
          now,
          opened: true,
          withheld: [],
        },
      };
    }

    if (url.includes("/submissions")) {
      return {
        data: [
          { id: 1, reference: "SUB-114-01", bidder_name: "Ranmuthu Engineering", total_price: 88400000, has_security: 1, size_bytes: 3840000, status: "opened", received_at: "2026-08-20T10:14:00Z" },
          { id: 2, reference: "SUB-114-02", bidder_name: "Maga Engineering (Pvt) Ltd", total_price: 91200000, has_security: 1, size_bytes: 4120000, status: "opened", received_at: "2026-08-20T10:48:00Z" },
        ],
        meta: { now, opened: true, withheld: [] },
      };
    }

    return {
      data: [
        { id: 1, reference: "RDA/CP/2026/114", title: "Rehabilitation of Colombo–Katunayake access road shoulders", stage_idx: 4, status: "opened", estimated_value: 92000000, closing_at: "2026-09-10T10:00:00Z" },
        { id: 2, reference: "RDA/SP/2026/121", title: "Widening and resurfacing of Galle–Udugama road", stage_idx: 2, status: "published", estimated_value: 265000000, closing_at: "2026-09-24T10:00:00Z" },
        { id: 3, reference: "RDA/NP/2026/158", title: "Reconstruction of Mannar causeway approach", stage_idx: 1, status: "approval", estimated_value: 480000000, closing_at: "2026-10-01T10:00:00Z" },
      ],
      meta: { now },
    };
  }

  // 8. Bidder Feed & Alerts
  if (url === "/api/v1/me/feed") {
    return {
      data: MOCK_NOTICES.slice(0, 3),
      meta: { now },
    };
  }

  if (url === "/api/v1/me/alert-profiles") {
    return {
      data: [
        { id: 1, name: "Civil & Highway Works (Western Province)", categories: ["civil-infrastructure"], districts: ["colombo", "gampaha"], min_value: 10000000, channels: ["email", "whatsapp"], frequency: "instant", matches_30d: 14, est_weekly: 3 },
        { id: 2, name: "Water Supply & Drainage (Islandwide)", categories: ["water-drainage"], districts: [], min_value: 5000000, channels: ["email"], frequency: "daily", matches_30d: 8, est_weekly: 2 },
      ],
      meta: { now },
    };
  }

  // 9. Subscription
  if (url === "/api/v1/me/subscription") {
    return {
      data: {
        plan: "business",
        sub_status: "active",
        renews_at: "2027-08-31",
        seats: 3,
        free_views_used: 5,
        free_view_limit: 5,
      },
      meta: { now },
    };
  }

  return null;
}
