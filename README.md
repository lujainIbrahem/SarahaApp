# 🔐 Saraha Anonymous Messaging API

A secure and scalable RESTful API for an anonymous messaging platform built using **Node.js**, **Express.js**, **MongoDB**, and modern backend security practices.

The platform allows users to receive anonymous messages while maintaining strong authentication, authorization, and privacy-focused security mechanisms.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)

---

## 🔗 Links

* 💻 GitHub Repository: https://github.com/lujainIbrahem/SarahaApp
* 📮 Postman Documentation: https://documenter.getpostman.com/view/44975525/2sB3BKFoS7

---

## 🚀 Features

### 👤 User Management

* User Registration
* User Login
* Google OAuth Authentication
* Profile Management
* Password Update
* Account Freeze & Unfreeze
* Public Profile Access

---

### 💬 Anonymous Messaging

* Send Anonymous Messages
* Retrieve All Messages
* Retrieve Single Message
* Secure Message Storage

---

### 📁 File Handling

* Image Upload using Multer
* Cloudinary Integration
* Cloud-based Media Storage

---

## 🔐 Security Features

### Authentication

* JWT Authentication
* Access Token
* Refresh Token
* Google OAuth Login

### Authorization

* Role-Based Access Control (RBAC)
* User Authorization
* Admin Authorization

### Password Security

* Password Hashing using bcrypt
* Secure Password Comparison

### Account Security

* Email Verification
* OTP Verification
* Password Reset System
* Token Revocation System

### API Security

* Helmet
* CORS Protection
* Rate Limiting
* Input Validation using Joi

### Data Security

* Phone Number Encryption
* Secure Session Handling

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT
* bcrypt
* Crypto-js

### Validation

* Joi

### File Upload

* Multer
* Cloudinary

### Email Services

* Nodemailer

---

## 🗄 Database Models

### User

Stores user information including:

* Username
* Email
* Password
* Profile Data
* Account Status
* Authentication Provider

### Message

Stores anonymous messages sent between users.

### OTP

Stores verification and password reset codes.

### Revoked Token

Stores invalidated sessions for secure logout functionality.

---

## 🔄 Authentication Flow

```text
User Login
      ↓
Validate Credentials
      ↓
Generate Access Token
      ↓
Generate Refresh Token
      ↓
Access Protected Endpoints
```

---

## 💬 Messaging Workflow

```text
Anonymous User
        ↓
Send Message
        ↓
Message Stored
        ↓
Target User Login
        ↓
Retrieve Messages
```

---

## ⚡ Architecture Highlights

* RESTful API Design
* Modular Architecture
* Middleware-Based Validation
* Event-Driven Email Handling
* Secure Authentication Flow
* Clean Project Structure
* Scalable Backend Design

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

---

## 📦 Installation

```bash
git clone https://github.com/lujainIbrahem/SarahaApp.git

cd SarahaApp

npm install

npm run start
```

---

## ⚙ Environment Variables

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
API_KEY=
API_SECRET=

WEB_CLIENT_ID=

FRONT_ORIGIN=

BASE_URL=
```

---

## 📌 Main API Endpoints

### Authentication

* POST /users/signUp
* POST /users/signIn
* POST /users/loginWithGmail
* POST /users/logout
* POST /users/refreshToken

### User Management

* GET /users/profile
* PATCH /users/updateProfile
* PATCH /users/updatePassword
* DELETE /users/freeze/:id
* DELETE /users/unfreeze/:id

### Password Recovery

* PATCH /users/forgetPassword
* PATCH /users/resetPassword

### Messages

* POST /messages/createMessage
* GET /messages/getAllMessage
* GET /messages/getOneMessage/:id

---

## 📮 API Documentation

Explore and test all endpoints through Postman Documentation:

https://documenter.getpostman.com/view/44975525/2sB3BKFoS7

---

## 🎯 Key Concepts Implemented

* JWT Authentication
* Refresh Token Strategy
* Google OAuth Integration
* Email Verification
* OTP System
* Role-Based Authorization
* Anonymous Messaging
* Cloud Storage Integration
* Secure Logout Using Token Revocation
* Phone Number Encryption
* Security Best Practices

---

## 🚀 Future Improvements

* Swagger Documentation
* Docker Support
* Unit Testing
* Integration Testing
* Message Reactions
* Message Search
* Real-Time Notifications

---

## 👩‍💻 Author

**Lujain Ibrahim**

Backend Developer

GitHub:
https://github.com/lujainIbrahem

---

## 📄 License

This project is licensed for educational and portfolio purposes.

