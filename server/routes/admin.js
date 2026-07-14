import express from 'express';
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getActivityLogs,
  createUser,
  updateUser
} from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// Apply authentication and admin verification middleware to all endpoints
router.use(auth);
router.use(admin);

// GET /api/admin/users
router.get('/users', getAllUsers);

// POST /api/admin/users
router.post('/users', createUser);

// PUT /api/admin/users/:id
router.put('/users/:id', updateUser);

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', updateUserRole);

// DELETE /api/admin/users/:id
router.delete('/users/:id', deleteUser);

// GET /api/admin/logs
router.get('/logs', getActivityLogs);

export default router;
