import { Request, Response } from 'express';
import { CATEGORIES_DATA, LOCATIONS_DATA } from '../data/mockDb';

export const getCategories = (req: Request, res: Response) => {
  res.json({
    success: true,
    total: CATEGORIES_DATA.length,
    data: CATEGORIES_DATA
  });
};

export const getLocations = (req: Request, res: Response) => {
  res.json({
    success: true,
    total: LOCATIONS_DATA.length,
    data: LOCATIONS_DATA
  });
};
