const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const connectDB = require('./config/db');

const volunteerRoutes = require('./routes/volunteerRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== DATABASE =====
connectDB();

// ===== API ROUTES =====
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/donate', donationRoutes);

// ===== SERVE FRONTEND =====
app.use(express.static('C:\\Users\\yt436\\Documents\\Coding\\nayi-disha-NGO\\client\\public'));

app.use((req, res) => {
  res.sendFile('C:\\Users\\yt436\\Documents\\Coding\\nayi-disha-NGO\\client\\public\\index.html');
});

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});