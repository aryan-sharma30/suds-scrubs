// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = connection;
