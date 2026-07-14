import express from 'express';
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from '../controllers/quizController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// GET /api/quiz
router.get('/', getQuizzes);

// GET /api/quiz/:id
router.get('/:id', getQuizById);

// POST /api/quiz (admin)
router.post('/', admin, createQuiz);

// PUT /api/quiz/:id (admin)
router.put('/:id', admin, updateQuiz);

// DELETE /api/quiz/:id (admin)
router.delete('/:id', admin, deleteQuiz);

// POST /api/quiz/:id/submit - Protected
router.post('/:id/submit', auth, submitQuiz);

export default router;