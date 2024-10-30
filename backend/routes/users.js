// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register user
router.post('/register', async (req, res) => {
  const { firstName, lastName, phone, email, password, isVeteranOrTeacher } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (firstName, lastName, phone, email, password, isVeteranOrTeacher)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [firstName, lastName, phone, email, hashedPassword, isVeteranOrTeacher === 'yes'];

    await db.query(query, values);
    res.status(201).json({ message: 'Account created successfully! Please login to proceed.' });
  } catch (error) {
    console.error('Error creating user account:', error.message);
    res.status(500).json({ error: 'Error creating user account.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const query =  `SELECT * FROM users WHERE phone = ?`;
    const [results] = await db.query(query, [phone]);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid number or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid number or password' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
