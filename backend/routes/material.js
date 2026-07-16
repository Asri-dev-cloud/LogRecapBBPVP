import express from 'express';
import {
  getMaterials,
  addMaterial,
  deleteMaterial,
} from '../controllers/materialController.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// GET /api/materials/:slug
router.get('/:slug', getMaterials);

// POST /api/materials/:slug (admin)
router.post('/:slug', admin, addMaterial);

// DELETE /api/materials/:slug/:id (admin)
router.delete('/:slug/:id', admin, deleteMaterial);

export default router;