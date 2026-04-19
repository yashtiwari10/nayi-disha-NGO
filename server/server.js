const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/db');

const volunteerRoutes = require('./routes/volunteerRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== DATABASE =====
connectDB();

// ===== DEBUG ROUTE =====
app.get('/debug', (req, res) => {
  const appContents = fs.readdirSync('/app');
  res.json({
    dirname: __dirname,
    appContents: appContents
  });
});

// ===== API ROUTES =====
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/donate', donationRoutes);

// ===== SERVE FRONTEND =====
const frontendPath = path.join(__dirname, 'client/public');
app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ===== SERVER START =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});