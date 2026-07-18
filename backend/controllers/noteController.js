import * as store from '../data/store.js';

/**
 * GET /api/notes
 * Returns notes for the authenticated user.
 */
export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await store.getNotesByUserId(userId);
    res.status(200).json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Server error fetching notes' });
  }
};

/**
 * POST /api/notes
 * Creates a new note for the authenticated user.
 */
export const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, type, title, content, createdAt } = req.body;
    if (!id || !type || !title || !content) {
      return res.status(400).json({ message: 'Missing required note fields (id, type, title, content).' });
    }
    
    const newNote = await store.createNote({
      id,
      userId,
      type,
      title,
      content,
      createdAt
    });

    res.status(201).json({ note: newNote });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ message: 'Server error creating note' });
  }
};

/**
 * DELETE /api/notes/:id
 * Deletes a note by id for the authenticated user.
 */
export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const deleted = await store.deleteNote(noteId, userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Note not found or unauthorized.' });
    }
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ message: 'Server error deleting note' });
  }
};
