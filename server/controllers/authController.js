import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import * as store from '../data/store.js';

/**
 * POST /api/auth/register
 * Validates inputs, checks for existing user, hashes password, and saves user in DB
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Validate required fields
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: 'All fields are required: username, email, password, fullName' });
    }

    // Validate username format (alphanumeric + underscore, 3-20 chars)
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return res.status(400).json({ message: 'Username must be 3-20 characters (letters, numbers, underscore)' });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password strength (min 6 chars)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if username already exists in database
    const [userByUsername] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    if (userByUsername.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    // Check if email already exists in database
    const [userByEmail] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (userByEmail.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password with bcrypt (salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Call stored procedure to register user
    await db.query('CALL sp_register_user(?, ?, ?, ?)', [username, fullName, email, hashedPassword]);

    // Fetch the newly created user details (with role)
    const [newUsers] = await db.query('SELECT id, username, fullName, email, bio, totalPoints, streak, role FROM users WHERE email = ?', [email]);
    const newUser = newUsers[0];

    // Check if we should auto-upgrade first user to admin (or we can keep default)
    // To make it easy to test, if they are the only user or the email contains admin, or first user:
    let userRole = newUser.role || 'user';
    const [allUsersCount] = await db.query('SELECT COUNT(*) AS count FROM users');
    if (allUsersCount[0].count === 1) {
      // Upgrade first registered user to admin automatically so they can manage the panel
      userRole = 'admin';
      await db.query('UPDATE users SET role = "admin" WHERE id = ?', [newUser.id]);
      newUser.role = 'admin';
    }

    // Generate JWT token (including role and isAdmin)
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email, role: userRole, isAdmin: userRole === 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Log registration activity
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
 * Verifies credentials and returns JWT token
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Call stored procedure to get user for login (which now returns role column)
    const [storedProcResult] = await db.query('CALL sp_get_user_for_login(?)', [email]);
    const usersList = storedProcResult[0];
    
    if (!usersList || usersList.length === 0) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    const user = usersList[0];

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    const userRole = user.role || 'user';

    // Generate JWT token (including role and isAdmin)
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: userRole, isAdmin: userRole === 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Log login activity
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