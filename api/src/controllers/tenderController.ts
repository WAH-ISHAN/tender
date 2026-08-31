import { Request, Response } from 'express';
import { TENDERS_DATABASE } from '../data/mockDb';
import { QueryFilters } from '../types';

export const getTenders = (req: Request, res: Response) => {
  const {
    q = '',
    sector = 'all',
    categoryId = 'all',
    province = 'all',
    closingWindow = 'all',
    minAmount,
    maxAmount,
    sortBy = 'closing',
    page = 1,
    limit = 10
  } = req.query;

  let results = [...TENDERS_DATABASE];

  // 1. Text keyword search
  if (q && typeof q === 'string') {
    const query = q.toLowerCase();
    results = results.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.entity.toLowerCase().includes(query) ||
      item.ref.toLowerCase().includes(query) ||
      item.categoryName.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    );
  }

  // 2. Sector filter
  if (sector && sector !== 'all') {
    results = results.filter(item => item.sector === sector);
  }

  // 3. Category filter
  if (categoryId && categoryId !== 'all') {
    results = results.filter(item => item.categoryId === categoryId);
  }

  // 4. Province filter
  if (province && province !== 'all') {
    results = results.filter(item => item.province === province);
  }

  // 5. Closing window filter
  if (closingWindow && closingWindow !== 'all') {
    if (closingWindow === '3days') results = results.filter(item => item.daysLeft <= 3);
    else if (closingWindow === '7days') results = results.filter(item => item.daysLeft <= 7);
    else if (closingWindow === '30days') results = results.filter(item => item.daysLeft <= 30);
  }

  // 6. Minimum & Maximum Amount
  if (minAmount) {
    results = results.filter(item => item.amountNumeric >= Number(minAmount));
  }
  if (maxAmount) {
    results = results.filter(item => item.amountNumeric <= Number(maxAmount));
  }

  // 7. Sorting
  if (sortBy === 'closing') {
    results.sort((a, b) => a.daysLeft - b.daysLeft);
  } else if (sortBy === 'newest') {
    results.sort((a, b) => b.id.localeCompare(a.id));
  } else if (sortBy === 'amountDesc') {
    results.sort((a, b) => b.amountNumeric - a.amountNumeric);
  } else if (sortBy === 'amountAsc') {
    results.sort((a, b) => a.amountNumeric - b.amountNumeric);
  } else if (sortBy === 'entityAsc') {
    results.sort((a, b) => a.entity.localeCompare(b.entity));
  }

  // Pagination
  const total = results.length;
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = results.slice(startIndex, startIndex + limitNum);

  res.json({
    success: true,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum) || 1,
    data: paginatedResults,
    metrics: {
      liveCount: 366,
      closingThisWeek: 41,
      totalPublished: 39942
    }
  });
};

export const getTenderById = (req: Request, res: Response) => {
  const { id } = req.params;
  const tender = TENDERS_DATABASE.find(t => t.id === id || t.ref.replace(/\//g, '-') === id);

  if (!tender) {
    return res.status(404).json({
      success: false,
      message: `Tender with ID or Ref '${id}' not found.`
    });
  }

  res.json({
    success: true,
    data: tender
  });
};

export const getStats = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      liveNotices: 366,
      closingThisWeek: 41,
      publishedToday: 12,
      totalArchive: 39942,
      activeSuppliers: 3217
    }
  });
};
