const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const volunteerRoutes = require('./routes/volunteerRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/donate', donationRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});