// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port:3306,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your application’s needs
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to the database.');
    connection.release(); // Release connection after testing
  }
});

// Promisify the pool for async/await usage
const promisePool = pool.promise();

module.exports = promisePool;