import pool from './config/db.mjs';

async function test() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Database connection SUCCESS:', rows);

    // Check if users table exists
    const [tables] = await pool.query("SHOW TABLES LIKE 'users'");
    console.log('Users table check:', tables);
  } catch (err) {
    console.error('Database connection FAILED:', err);
  } finally {
    process.exit(0);
  }
}

test();
