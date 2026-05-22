import express from 'express';
import { registerUser, loginUser, getProfile, refreshTokenHandler, logoutHandler } from '../controllers/auth.js';
import { authRequired } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', logoutHandler);
router.get('/profile', authRequired, getProfile);

export default router;
