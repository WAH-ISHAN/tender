import { Router } from 'express';
import { getTenders, getTenderById, getStats } from '../controllers/tenderController';

const router = Router();

router.get('/tenders', getTenders);
router.get('/tenders/:id', getTenderById);
router.get('/stats', getStats);

export default router;
