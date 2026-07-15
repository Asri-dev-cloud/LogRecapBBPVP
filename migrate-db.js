import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env configuration from server directory
dotenv.config({ path: path.join(__dirname, 'server', '.env') });

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const port = parseInt(process.env.DB_PORT) || 3306;

async function migrate() {
  console.log('Starting MySQL database migration...');

  let connection;
  try {
    // Connect without database initially, to ensure the database can be created
    connection = await mysql.createConnection({
      host,
      user,
      password,
      port,
      multipleStatements: true // critical for running multi-statement files
    });

    console.log(`Connected to MySQL server at ${host}:${port}`);

    // Read LogRecap.sql schema file
    const sqlPath = path.join(__dirname, 'LogRecap.sql');
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`File LogRecap.sql not found at ${sqlPath}`);
    }

    let sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Clean SQL: mysql2 multipleStatements does not support DELIMITER commands
    // Remove "DELIMITER //" and "DELIMITER ;"
    sqlContent = sqlContent.replace(/DELIMITER\s+\/\/|DELIMITER\s+;/gi, '');
    // Replace "//" with ";" at the end of procedures
    sqlContent = sqlContent.replace(/\/\//g, ';');

    console.log('Executing LogRecap.sql queries...');
    await connection.query(sqlContent);
    console.log('LogRecap.sql executed successfully.');

    console.log('Database, tables, and stored procedures setup completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

migrate();
