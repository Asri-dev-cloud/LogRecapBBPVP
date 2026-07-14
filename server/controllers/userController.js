import db from '../config/db.js';

/**
 * GET /api/user/profile
 * Protected route. Returns current user details.
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Call stored procedure to get user by ID
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
 * Protected route. Updates profile fields.
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, bio, username } = req.body;

    // Call stored procedure to get current user details
    const [storedProcResult] = await db.query('CALL sp_get_user_by_id(?)', [userId]);
    const userList = storedProcResult[0];

    if (!userList || userList.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = userList[0];

    // Validate username if being updated
    let newUsername = currentUser.username;
    if (username && username !== currentUser.username) {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        return res.status(400).json({ message: 'Username must be 3-20 characters (letters, numbers, underscore)' });
      }

      // Check if new username is already taken in database
      const [usernameTaken] = await db.query('SELECT id FROM users WHERE username = ? AND id != ?', [username, userId]);
      if (usernameTaken.length > 0) {
        return res.status(409).json({ message: 'Username already taken' });
      }
      newUsername = username;
    }

    const newFullName = fullName !== undefined ? fullName : currentUser.fullName;
    const newBio = bio !== undefined ? bio : currentUser.bio;

    // Call stored procedure to update user
    await db.query('CALL sp_update_user(?, ?, ?, ?)', [userId, newUsername, newFullName, newBio]);

    // Fetch updated user
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
 * Protected route. Returns list of certificates earned by user.
 */
export const getUserCertificates = async (req, res) => {
  try {
    const userId = req.user.id;

    // Call stored procedure to get user certificates
    const [storedProcResult] = await db.query('CALL sp_get_user_certificates(?)', [userId]);
    const certificates = storedProcResult[0];

    res.status(200).json({ certificates: certificates || [] });
  } catch (error) {
    console.error('Get user certificates error:', error);
    res.status(500).json({ message: 'Server error fetching certificate history' });
  }
};