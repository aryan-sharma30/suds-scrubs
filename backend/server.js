// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
