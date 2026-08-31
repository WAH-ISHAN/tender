export interface Tender {
  id: string;
  ref: string;
  title: string;
  entity: string;
  province: string;
  district: string;
  location: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  contractType: string;
  instrumentType: "Tender" | "Quotation" | "EOI" | "RFP" | "Supply Registration" | "Auction";
  sector: "government" | "private";
  categoryId: string;
  categoryName: string;
  amount: string;
  amountNumeric: number;
  bidBond: string;
  isPromoted?: boolean;
  isUrgent?: boolean;
  status: "live" | "closed" | "archive";
  description: string;
  documents: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  publishedAt: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  subcategories?: string[];
}

export interface Location {
  provinceId: string;
  provinceName: string;
  districts: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  role: "supplier" | "buyer" | "admin";
  plan: "free" | "pro" | "enterprise";
  savedTenderIds: string[];
  createdAt: string;
}

export interface QueryFilters {
  q?: string;
  sector?: "all" | "government" | "private";
  categoryId?: string;
  province?: string;
  closingWindow?: "all" | "3days" | "7days" | "30days";
  minAmount?: number;
  maxAmount?: number;
  sortBy?: "closing" | "newest" | "amountDesc" | "amountAsc" | "entityAsc";
  page?: number;
  limit?: number;
}
