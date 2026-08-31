import { Router } from 'express';
import { getCategories, getLocations } from '../controllers/categoryController';

const router = Router();

router.get('/categories', getCategories);
router.get('/locations', getLocations);

export default router;
