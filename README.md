# 🔐 Saraha Anonymous Messaging API

A secure and scalable RESTful API for an anonymous messaging platform, built with Node.js, Express.js, MongoDB, JWT Authentication, Google OAuth, Cloudinary, and modern backend security practices.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)

---

## 🔗 Links

- 📮 API Documentation: [Postman Docs](https://documenter.getpostman.com/view/44975525/2sB3BKFoS7)
- 💻 GitHub Repository: [SarahaApp](https://github.com/lujainIbrahem/SarahaApp)

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
```

---
## ⚙️ Environment Variables

```env
PORT=
DB_URL=
DB_URL_ONLINE=
EMAIL=
PASS=
SALT_ROUND=
ENCRYPT_PHONE=
SIGNATURE=
ACCESS_TOKEN_USER=
ACCESS_TOKEN_ADMIN=
REFRESH_TOKEN_USER=
REFRESH_TOKEN_ADMIN=
CLOUD_NAME=
API_SECRET=
API_KEY=
WEB_CLIENT_ID=
FRONT_ORIGIN=
BASE_URL=
```

---

## 🏗 Project Structure

```text
src
├── Db
├── middleware
├── modules
│   ├── users
│   └── messages
├── utils
├── service
└── config

```

## 📌 API Endpoints

### 👤 Users
- POST /users/signUp
- POST /users/signIn
- POST /users/loginWithGmail
- GET /users/profile
- PATCH /users/updateProfile
- POST /users/logout
- POST /users/refreshToken
- PATCH /users/updatePassword
- PATCH /users/forgetPassword
- PATCH /users/resetPassword
- DELETE /users/freeze/:id
- DELETE /users/unfreeze/:id
- GET /users/getProfileData/:id

### 💬 Messages
- POST /messages/createMessage
- GET /messages/getAllMessage
- GET /messages/getOneMessage/:id

---

## 📮 API Documentation

Explore and test all available endpoints through the Postman Documentation:

[View API Documentation](https://documenter.getpostman.com/view/44975525/2sB3BKFoS7)

---

## 🧠 Project Highlights

- Modular architecture (Controllers / Services / Middleware)
- Secure authentication system using JWT
- Email verification and OTP system
- Token revocation system for secure logout
- Event-driven email handling system
- Clean and scalable project structure
- Strong security practices (Helmet, CORS, Rate Limiting)

---

## 📝 Notes

This project is a backend system for an anonymous social messaging application.

It focuses on:
- Secure authentication using JWT
- Role-based access control (User/Admin)
- Google OAuth integration
- Secure password reset via OTP
- Data encryption for sensitive information (phone numbers)
- Anonymous messaging system between users
- Secure session handling using token revocation
- Scalable and modular architecture

The project follows backend best practices and is designed to be production-ready and easily extendable.

---

## 🚀 Future Improvements

- API Documentation using Swagger
- Docker Support
- Pagination for Messages
- Deployment on Render
- Unit & Integration Testing

  ---

## 📄 License

This project is licensed for educational and portfolio purposes.

---

## 👩‍💻 Author

**lujainIbrahem**
