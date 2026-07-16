import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.mjs';
import * as store from '../data/store.js';

/**
 * POST /api/auth/register
 * Validasi input, periksa user terdaftar, hash password, dan simpan user di DB.
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Validasi field yang wajib diisi
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: 'All fields are required: username, email, password, fullName' });
    }

    // Validasi format username (alfanumerik + underscore, 3-20 karakter)
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return res.status(400).json({ message: 'Username must be 3-20 characters (letters, numbers, underscore)' });
    }

    // Validasi format email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validasi kekuatan password (minimal 6 karakter)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Periksa apakah username sudah terdaftar di database
    const [userByUsername] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    if (userByUsername.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    // Periksa apakah email sudah terdaftar di database
    const [userByEmail] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (userByEmail.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password dengan bcrypt (salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Panggil stored procedure untuk mendaftarkan user baru
    await db.query('CALL sp_register_user(?, ?, ?, ?)', [username, fullName, email, hashedPassword]);

    // Ambil detail data user yang baru saja dibuat (termasuk kolom role)
    const [newUsers] = await db.query('SELECT id, username, fullName, email, bio, totalPoints, streak, role FROM users WHERE email = ?', [email]);
    const newUser = newUsers[0];

    // Otomatis jadikan admin jika user pertama terdaftar
    let userRole = newUser.role || 'user';
    const [allUsersCount] = await db.query('SELECT COUNT(*) AS count FROM users');
    if (allUsersCount[0].count === 1) {
      // Tingkatkan role user pertama menjadi admin secara otomatis untuk kelola panel admin
      userRole = 'admin';
      await db.query('UPDATE users SET role = "admin" WHERE id = ?', [newUser.id]);
      newUser.role = 'admin';
    }

    // Buat JWT token (menyertakan role dan status admin)
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email, role: userRole, isAdmin: userRole === 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Catat log aktivitas pendaftaran user baru
    await store.logActivity(newUser.id, newUser.username, 'REGISTER', `User registered successfully as ${userRole}`);

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        bio: newUser.bio || '',
        totalPoints: newUser.totalPoints || 0,
        streak: newUser.streak || 0,
        role: userRole,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * POST /api/auth/login
 * Memverifikasi kredensial pengguna dan mengembalikan JWT token
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Panggil stored procedure untuk otentikasi login user (mengambil password & role)
    const [storedProcResult] = await db.query('CALL sp_get_user_for_login(?)', [email]);
    const usersList = storedProcResult[0];
    
    if (!usersList || usersList.length === 0) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    const user = usersList[0];

    // Bandingkan password menggunakan bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    const userRole = user.role || 'user';

    // Buat JWT token (menyertakan role dan status admin)
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: userRole, isAdmin: userRole === 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Catat log aktivitas login user
    await store.logActivity(user.id, user.username, 'LOGIN', `User logged in successfully`);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        bio: user.bio || '',
        totalPoints: user.totalPoints || 0,
        streak: user.streak || 0,
        role: userRole,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};