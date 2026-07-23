import db from '../config/db.mjs';
import * as store from '../data/store.js';

/**
 * GET /api/user/profile
 * Rute terproteksi. Mengembalikan detail profil pengguna saat ini.
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Panggil stored procedure untuk mengambil data user berdasarkan ID
    const [storedProcResult] = await db.query('CALL sp_get_user_by_id(?)', [userId]);
    const userList = storedProcResult[0];

    if (!userList || userList.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userList[0];

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        bio: user.bio || '',
        totalPoints: user.totalPoints || 0,
        streak: user.streak || 0,
        role: user.role || 'user',
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

/**
 * PUT /api/user/profile
 * Rute terproteksi. Memperbarui kolom profil.
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, bio, username } = req.body;

    // Panggil stored procedure untuk mengambil detail data user saat ini
    const [storedProcResult] = await db.query('CALL sp_get_user_by_id(?)', [userId]);
    const userList = storedProcResult[0];

    if (!userList || userList.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = userList[0];

    // Validasi username jika diubah
    let newUsername = currentUser.username;
    if (username && username !== currentUser.username) {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        return res.status(400).json({ message: 'Username must be 3-20 characters (letters, numbers, underscore)' });
      }

      // Periksa apakah username baru sudah digunakan oleh user lain
      const [usernameTaken] = await db.query('SELECT id FROM users WHERE username = ? AND id != ?', [username, userId]);
      if (usernameTaken.length > 0) {
        return res.status(409).json({ message: 'Username already taken' });
      }
      newUsername = username;
    }

    const newFullName = fullName !== undefined ? fullName : currentUser.fullName;
    const newBio = bio !== undefined ? bio : currentUser.bio;

    // Panggil stored procedure untuk memperbarui profil user
    await db.query('CALL sp_update_user(?, ?, ?, ?)', [userId, newUsername, newFullName, newBio]);

    // Ambil data user yang telah diperbarui
    const [updatedUserListResult] = await db.query('CALL sp_get_user_by_id(?)', [userId]);
    const updatedUser = updatedUserListResult[0][0];

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        bio: updatedUser.bio || '',
        totalPoints: updatedUser.totalPoints || 0,
        streak: updatedUser.streak || 0,
        role: updatedUser.role || 'user',
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

/**
 * GET /api/user/certificates
 * Rute terproteksi. Mengembalikan daftar sertifikat yang diperoleh pengguna.
 */
export const getUserCertificates = async (req, res) => {
  try {
    const userId = req.user.id;
    const certificates = await store.getCertificates(userId);

    res.status(200).json({ certificates: certificates || [] });
  } catch (error) {
    console.error('Get user certificates error:', error);
    res.status(500).json({ message: 'Server error fetching certificate history' });
  }
};

/**
 * GET /api/user/activity
 * Rute terproteksi. Mengembalikan daftar log aktivitas pengguna saat ini.
 */
export const getUserActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      'SELECT id, action, details, created_at AS createdAt FROM activity_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 100',
      [userId]
    );
    res.status(200).json({ activity: rows || [] });
  } catch (error) {
    console.error('Get user activity error:', error);
    res.status(500).json({ message: 'Server error fetching activity logs' });
  }
};