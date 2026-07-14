import express from 'express';
import { getProfile, updateProfile, getUserCertificates } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/user/profile - Protected
router.get('/profile', auth, getProfile);

// PUT /api/user/profile - Protected
router.put('/profile', auth, updateProfile);

// GET /api/user/certificates - Protected
router.get('/certificates', auth, getUserCertificates);

export default router;