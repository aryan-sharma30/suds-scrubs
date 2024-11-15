// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

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
  const { email, password } = req.body;

  try {
    const query =  `SELECT id, firstName, password FROM users WHERE email = ?`;
    const [results] = await db.query(query, [email]);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful!',userId: user.id, username: user.firstName });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 6-digit OTP
}

function sendEmail(recipientEmail, otp) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: recipientEmail,
      subject: "Surds & Scrubs - Password Recovery OTP",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset='UTF-8">
        <title>Surds & Scrubs - OTP Email</title>

      </head>
      <body>
        <!-- partial:index.partial.html -->
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Surds & Scrubs</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing Surds & Scrubts. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />Surds & Scrubs</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Surds & Scrubs</p>
                <p>Pennsylvania</p>
              </div>
            </div>
          </div>
          <!-- partial -->
      </body>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject("Failed to send email.");
      }
      resolve("Email sent successfully.");
    });
  });
}

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email exists in the database
    const [users] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'Email not found.' });
    }

    // Generate OTP and save it temporarily in the database
    const otp = generateOTP();
    await db.query(`UPDATE users SET otp = ?, otpExpiry = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE email = ?`, [otp, email]);

    // Send OTP email
    await sendEmail(email, otp);
    res.json({ message: "OTP sent to email successfully." });
  } catch (error) {
    console.error("Error in password recovery:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Additional endpoint to verify OTP (optional, if you want to add it)
// You would also have an endpoint to reset the password once OTP is verified.
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [users] = await db.query(`SELECT * FROM users WHERE email = ? AND otp = ? AND otpExpiry > NOW()`, [email, otp]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired OTP.' });
    }

    // OTP is valid; proceed with password reset process
    res.json({ message: 'OTP verified. You may proceed to reset your password.' });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Get scheduled washes for a user
router.get('/scheduled-washes/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `SELECT order_id, packageType, carCompanyAndName, address, slot FROM orders WHERE user_id = ? AND slot > NOW()`;
    const [washes] = await db.query(query, [userId]);

    res.status(200).json({ washes });
  } catch (error) {
    console.error('Error fetching scheduled washes:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/wash-history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `SELECT order_id, packageType, carCompanyAndName, address, slot FROM orders WHERE user_id = ? AND slot < NOW()`;
    const [washes] = await db.query(query, [userId]);

    res.status(200).json({ washes });
  } catch (error) {
    console.error('Error fetching scheduled washes:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/schedule-wash', async (req, res) => {
  const { userId, address, carCompany, seatMat, carType, packageType, slot } = req.body;

  try {
    const query = `INSERT INTO orders (user_id, address, carCompanyAndName, seatMat, carType, packageType, slot)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [userId, address, carCompany, seatMat, carType, packageType, slot];

    await db.query(query, values);
    res.status(201).json({ message: 'Wash scheduled successfully!' });
  } catch (error) {
    console.error('Error scheduling wash:', error.message);
    res.status(500).json({ error: 'Error scheduling wash.' });
  }
});

router.post('/submit-feedback', async (req, res) => {
  const { userId, rating, comments } = req.body;

  

  try {
    const result = await db.query(
      `INSERT INTO ratings (user_id, rating, comments, CREATED_AT) VALUES (?, ?, ?, NOW())`,
      [userId, rating, comments]
    );

    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});


router.delete('/scheduled-wash/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
      const query = `DELETE FROM orders WHERE order_id = ?`;
      await db.query(query, [orderId]);
      res.status(200).json({ message: 'Wash deleted successfully!' });
  } catch (error) {
      console.error('Error deleting scheduled wash:', error.message);
      res.status(500).json({ error: 'Error deleting wash.' });
  }
});

router.put('/scheduled-wash/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { address, carCompanyAndName, packageType, slot } = req.body;

  try {
      const query = `
          UPDATE orders 
          SET address = ?, carCompanyAndName = ?, packageType = ?, slot = ? 
          WHERE order_id = ?`;
      const values = [address, carCompanyAndName, packageType, slot, orderId];

      await db.query(query, values);
      res.status(200).json({ message: 'Wash updated successfully!' });
  } catch (error) {
      console.error('Error updating scheduled wash:', error.message);
      res.status(500).json({ error: 'Error updating wash.' });
  }
});


module.exports = router;
