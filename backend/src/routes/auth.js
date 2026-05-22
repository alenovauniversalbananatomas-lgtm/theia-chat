import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/auth.js';
import { authRequired } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authRequired, getProfile);

export default router;
