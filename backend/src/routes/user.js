import express from 'express';
import { authRequired } from '../middleware/auth.js';
import { updateProfile } from '../controllers/user.js';
const router = express.Router();

router.use(authRequired);
router.put('/profile', updateProfile);

export default router;
