const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export interface Tender {
  id: string;
  ref: string;
  title: string;
  entity: string;
  province: string;
  district?: string;
  location: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  contractType: string;
  instrumentType?: string;
  sector: "government" | "private";
  categoryId: string;
  categoryName: string;
  amount: string;
  amountNumeric: number;
  bidBond: string;
  isPromoted?: boolean;
  isUrgent?: boolean;
  status?: "live" | "closed" | "archive";
  description: string;
  documents?: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  publishedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number | string;
  subcategories?: string[];
}

export interface TenderFilters {
  q?: string;
  sector?: string;
  categoryId?: string;
  province?: string;
  closingWindow?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const apiClient = {
  // Fetch Tenders with filters
  async getTenders(filters: TenderFilters = {}): Promise<{ total: number; data: Tender[]; metrics?: any }> {
    try {
      const params = new URLSearchParams();
      if (filters.q) params.set('q', filters.q);
      if (filters.sector && filters.sector !== 'all') params.set('sector', filters.sector);
      if (filters.categoryId && filters.categoryId !== 'all') params.set('categoryId', filters.categoryId);
      if (filters.province && filters.province !== 'all') params.set('province', filters.province);
      if (filters.closingWindow && filters.closingWindow !== 'all') params.set('closingWindow', filters.closingWindow);
      if (filters.sortBy) params.set('sortBy', filters.sortBy);
      if (filters.page) params.set('page', String(filters.page));
      if (filters.limit) params.set('limit', String(filters.limit));

      const res = await fetch(`${API_BASE_URL}/tenders?${params.toString()}`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend offline or unreachable, using local fallback:', err);
      return {
        total: 6,
        data: [],
        metrics: { liveCount: 366, closingThisWeek: 41, totalPublished: 39942 }
      };
    }
  },

  // Fetch Tender by ID
  async getTenderById(id: string): Promise<Tender | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/tenders/${id}`, {
        next: { revalidate: 300 },
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('API error fetching tender by ID:', err);
      return null;
    }
  },

  // Fetch Categories Taxonomy
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error('Failed to fetch categories');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('API error fetching categories:', err);
      return [];
    }
  },

  // Fetch National Stats
  async getStats(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/stats`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) throw new Error('Failed to fetch stats');
      const json = await res.json();
      return json.data;
    } catch (err) {
      return { liveNotices: 366, closingThisWeek: 41, publishedToday: 12, totalArchive: 39942 };
    }
  },

  // User Auth - Login
  async login(credentials: { email: string; password: string }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  },

  // User Auth - Register
  async register(userData: any): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await res.json();
  },

  // Toggle Favorite
  async toggleFavorite(tenderId: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/auth/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenderId }),
    });
    return await res.json();
  }
};
