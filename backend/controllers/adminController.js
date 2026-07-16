import db from '../config/db.mjs';
import * as store from '../data/store.js';
import bcrypt from 'bcryptjs';

/**
 * GET /api/admin/users
 * Mengembalikan daftar semua pengguna terdaftar (khusus admin).
 */
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, username, fullName, email, bio, totalPoints, streak, role, created_at AS createdAt FROM users ORDER BY id ASC'
    );
    res.status(200).json({ users: rows });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error fetching user list' });
  }
};

/**
 * PUT /api/admin/users/:id/role
 * Memperbarui role pengguna: 'admin' atau 'user' (khusus admin).
 */
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!role || (role !== 'user' && role !== 'admin')) {
      return res.status(400).json({ message: 'Invalid role. Must be either "user" or "admin".' });
    }

    const [existing] = await db.query('SELECT id, username FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);

    // Catat log tindakan administratif
    const adminUser = req.admin || req.user || {};
    await store.logActivity(
      adminUser.id,
      adminUser.username || 'admin',
      'CHANGE_ROLE',
      `Changed role of user "${existing[0].username}" (ID: ${id}) to "${role}"`
    );

    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error updating user role' });
  }
};

/**
 * DELETE /api/admin/users/:id
 * Menghapus akun pengguna sepenuhnya (khusus admin).
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query('SELECT id, username FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Panggil stored procedure untuk menghapus user
    await db.query('CALL sp_delete_user(?)', [id]);

    // Catat log tindakan administratif
    const adminUser = req.admin || req.user || {};
    await store.logActivity(
      adminUser.id,
      adminUser.username || 'admin',
      'DELETE_USER',
      `Deleted user account: "${existing[0].username}" (ID: ${id})`
    );

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

/**
 * GET /api/admin/logs
 * Mengembalikan log aktivitas backend untuk panel Super Admin.
 */
export const getActivityLogs = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, user_id AS userId, username, action, details, created_at AS createdAt FROM activity_logs ORDER BY created_at DESC LIMIT 200'
    );
    res.status(200).json({ logs: rows });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ message: 'Server error fetching activity logs' });
  }
};

/**
 * POST /api/admin/users
 * Membuat pengguna baru (khusus admin).
 */
export const createUser = async (req, res) => {
  try {
    const { username, email, password, fullName, role } = req.body;
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: 'All fields are required: username, email, password, fullName' });
    }
    const [userByUsername] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    if (userByUsername.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    const [userByEmail] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (userByEmail.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const [result] = await db.query(
      'INSERT INTO users (username, fullName, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [username, fullName, email, hashedPassword, role || 'user']
    );
    
    const adminUser = req.admin || req.user || {};
    await store.logActivity(
      adminUser.id,
      adminUser.username || 'admin',
      'CREATE_USER',
      `Created new user: "${username}" (ID: ${result.insertId})`
    );

    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error creating user' });
  }
};

/**
 * PUT /api/admin/users/:id
 * Memperbarui detail data pengguna yang sudah ada (khusus admin).
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, fullName, email, role, totalPoints, streak, password } = req.body;
    
    const [existing] = await db.query('SELECT id, username FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updates = [];
    const values = [];
    
    if (username) { updates.push('username = ?'); values.push(username); }
    if (fullName) { updates.push('fullName = ?'); values.push(fullName); }
    if (email) { updates.push('email = ?'); values.push(email); }
    if (role) { updates.push('role = ?'); values.push(role); }
    if (totalPoints !== undefined) { updates.push('totalPoints = ?'); values.push(totalPoints); }
    if (streak !== undefined) { updates.push('streak = ?'); values.push(streak); }
    
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updates.push('password = ?');
      values.push(hashedPassword);
    }

    if (updates.length > 0) {
      values.push(id);
      await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
    }

    const adminUser = req.admin || req.user || {};
    await store.logActivity(
      adminUser.id,
      adminUser.username || 'admin',
      'UPDATE_USER',
      `Updated user details for: "${username || existing[0].username}" (ID: ${id})`
    );

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error updating user' });
  }
};
