import * as store from '../data/store.js';

/**
 * GET /api/materials/:slug
 * Returns admin-added material/terminal sections for a topic (shared for all users).
 */
export const getMaterials = async (req, res) => {
  try {
    const slug = req.params.slug;
    const sections = await store.getMaterials(slug);
    res.status(200).json({ sections });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ message: 'Server error fetching materials' });
  }
};

/**
 * POST /api/materials/:slug  (admin)
 * Adds a material or terminal section (shared for all users).
 */
export const addMaterial = async (req, res) => {
  try {
    const slug = req.params.slug;
    const { title, description, type, points, code, language, codeTitle } = req.body;
    if (!title || !type) {
      return res.status(400).json({ message: 'Title and type are required.' });
    }
    const section = {
      id: `${slug}-${type}-${Date.now()}`,
      source: 'custom',
      type,
      title: title.trim(),
      description: description ? description.trim() : '',
    };
    if (type === 'terminal') {
      section.code = code || '';
      section.language = language || 'bash';
      section.codeTitle = codeTitle || 'Terminal tambahan';
    } else {
      const pts = Array.isArray(points)
        ? points
        : String(points || '')
            .split('\n')
            .map((p) => p.trim())
            .filter(Boolean);
      section.points = pts;
    }
    const sections = await store.addMaterial(slug, section);

    // Log admin activity
    const adminUser = req.admin || req.user || {};
    await store.logActivity(
      adminUser.id,
      adminUser.username || 'admin',
      type === 'terminal' ? 'ADD_TERMINAL' : 'ADD_MATERIAL',
      `Added ${type} "${title}" for topic "${slug}"`
    );

    res.status(201).json({ sections });
  } catch (error) {
    console.error('Add material error:', error);
    res.status(500).json({ message: 'Server error adding material' });
  }
};

/**
 * DELETE /api/materials/:slug/:id  (admin)
 */
export const deleteMaterial = async (req, res) => {
  try {
    const ok = await store.deleteMaterial(req.params.slug, req.params.id);
    if (!ok) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Log admin activity
    const adminUser = req.admin || req.user || {};
    await store.logActivity(
      adminUser.id,
      adminUser.username || 'admin',
      'DELETE_MATERIAL',
      `Deleted section ID "${req.params.id}" from topic "${req.params.slug}"`
    );

    res.status(200).json({ message: 'Material deleted' });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({ message: 'Server error deleting material' });
  }
};