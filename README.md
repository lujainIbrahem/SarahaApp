# 🔐 Social App Backend (Saraha App)

Backend API for a secure social media / anonymous messaging application built with Node.js, Express, and MongoDB.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT Authentication (Access & Refresh Tokens)
- Role-based Authorization (User / Admin)
- Google OAuth Login
- Email Verification System
- Password Reset with OTP
- Secure Logout (Token Revocation System)

### 👤 User Management
- User Registration & Login
- Get & Update Profile
- Update Password
- Soft Delete (Freeze / Unfreeze Account)
- Get Public User Profile Data

### 💬 Messaging System
- Send Anonymous Messages
- Get All Messages for User
- Get Single Message

### 📁 File Handling
- Image Upload using Multer
- Cloud Storage Integration (Cloudinary)

### 🔒 Security & Middleware
- Password Hashing (bcrypt)
- Data Encryption (Phone numbers)
- Rate Limiting (express-rate-limit)
- Security Headers (Helmet)
- CORS Protection
- Input Validation (Joi)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Multer
- Cloudinary
- Nodemailer
- Joi
- Crypto-js

---

## 📦 Installation

```bash
git clone https://github.com/lujainIbrahem/SarahaApp.git
cd SarahaApp
npm install
npm run start
