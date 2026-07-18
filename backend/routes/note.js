import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/notes - Retrieve notes of authenticated user
router.get('/', auth, getNotes);

// POST /api/notes - Create a new note
router.post('/', auth, createNote);

// DELETE /api/notes/:id - Delete a note by ID
router.delete('/:id', auth, deleteNote);

export default router;
