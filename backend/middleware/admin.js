import jwt from 'jsonwebtoken';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || '20424014';

/**
 * Admin middleware.
 * Accepts either a valid JWT that carries isAdmin, OR an
 * x-admin-passcode header matching the configured passcode.
 * This keeps the existing UI passcode working while still
 * protecting the admin endpoints.
 */
const admin = (req, res, next) => {
  try {
    const passcode = req.headers['x-admin-passcode'];
    if (passcode && passcode === ADMIN_PASSCODE) {
      req.admin = { viaPasscode: true };
      return next();
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded && decoded.isAdmin) {
        req.admin = decoded;
        return next();
      }
    }

    return res.status(403).json({ message: 'Admin access required.' });
  } catch (error) {
    return res.status(403).json({ message: 'Admin access required.' });
  }
};

export default admin;