import express from 'express';
import { getProfile, updateProfile, getUserCertificates, getUserActivity } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/user/profile - Protected
router.get('/profile', auth, getProfile);

// PUT /api/user/profile - Protected
router.put('/profile', auth, updateProfile);

// GET /api/user/certificates - Protected
router.get('/certificates', auth, getUserCertificates);

// GET /api/user/activity - Protected
router.get('/activity', auth, getUserActivity);

export default router;