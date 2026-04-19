# 🌿 Nayi Disha NGO
### *Har Kadam Ek Nayi Disha*

> A full-stack web application for an NGO empowering underprivileged communities across India through compassionate action and sustainable change.

🔗 **Live Site:** [nayi-disha-ngo-production.up.railway.app](https://nayi-disha-ngo-production.up.railway.app)

---

## 🚀 Features

- 🏠 **Hero Section** — Animated typing effect, call-to-action buttons
- 📋 **Active Campaigns** — 5 real campaigns with live progress bars and donor stats
- 📊 **Impact Dashboard** — Animated counters showing real impact numbers
- 📖 **Our Story** — Storytelling section with featured beneficiary story
- 💚 **Donation System** — UPI & Card payment interface with form validation
- 🤝 **Volunteer Signup** — Full volunteer registration with skill selection
- 📱 **Fully Responsive** — Mobile-first design across all screen sizes
- 🗄️ **MongoDB Integration** — All donations and volunteer data saved to database

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Deployment | Railway |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```
nayi-disha-NGO/
├── client/
│   └── public/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── script.js
│       └── index.html
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── donationController.js
│   │   └── volunteerController.js
│   ├── models/
│   │   ├── Donation.js
│   │   └── Volunteer.js
│   ├── routes/
│   │   ├── donationRoutes.js
│   │   └── volunteerRoutes.js
│   ├── client/         ← copied for Railway deployment
│   ├── .env            ← not committed (gitignored)
│   ├── package.json
│   └── server.js
├── railway.json
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/yashtiwari10/nayi-disha-NGO.git
cd nayi-disha-NGO
```

### 2. Install dependencies
```bash
cd server
npm install
```

### 3. Create `.env` file inside `server/`
```properties
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run the server
```bash
node server.js
```

### 5. Open in browser
```
http://localhost:5000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/donate` | Save a donation |
| POST | `/api/volunteer` | Register a volunteer |

---

## 📊 Active Campaigns

| Campaign | Location | Goal | Raised |
|----------|----------|------|--------|
| 💧 Clean Water for Rajasthan | Jaipur, RJ | ₹11,00,000 | ₹8,36,500 |
| 📚 Girl Child Education Fund | Patna, BR | ₹12,00,000 | ₹9,46,300 |
| 🍱 Hunger Drive | Lucknow, UP | ₹9,00,000 | ₹7,72,650 |
| 💪 Women Empowerment | Bhopal, MP | ₹10,50,000 | ₹8,11,900 |
| 🌳 Plantation Drive | Guwahati, AS | ₹8,50,000 | ₹6,18,400 |

---

## 🏆 Impact Numbers

- 🌿 **12** Active Campaigns
- 💰 **₹52L+** Funds Raised
- 🙌 **4,800** Volunteers
- 🗺️ **9** States Covered
- 🍱 **38,400** Meals Served
- 🌳 **12,500** Trees Planted

---

## 👨‍💻 Built By

**Yash Tiwari** — GNIOT CSE  
Built with ❤️ for **Webathon 2K26** — GNIOT CSE Tech Club  
NGO ID: **#WB303**

---

## 📄 License

This project is built for educational and hackathon purposes.
