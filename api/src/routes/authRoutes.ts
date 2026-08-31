import { Router } from 'express';
import { register, login, toggleFavorite } from '../controllers/authController';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/favorites', toggleFavorite);

export default router;
