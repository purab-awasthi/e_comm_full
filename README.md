# 🛒 E-Commerce Full Stack Application

## 👤 Author

**Purab Awasthi**
Roll No: 2328110
KIIT University
Full Stack Java Project

---

## 📌 Project Overview

This is a full-stack e-commerce web application built using **Spring Boot (Java)** for the backend and **React (Vite + Tailwind CSS)** for the frontend.

The application allows users to browse products, manage carts, and simulate an online shopping experience with authentication features.

---

## 🚀 Tech Stack

### 🔹 Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router

### 🔹 Backend

* Java (Spring Boot)
* Spring Security
* JWT Authentication (temporarily disabled for deployment)
* Maven

### 🔹 Database

* H2 Database (in-memory for deployment)

---

## ✨ Features

* 🛍️ View products
* 🧾 Add to cart
* 🔐 User authentication (JWT based)
* 📦 Order management
* 🛠️ Admin panel (basic)
* 🌐 REST API integration

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🌍 Deployment

### 🔹 Backend (Render)

* Docker-based deployment
* H2 database used for simplicity
* Environment variable support for PORT

### 🔹 Frontend (Vercel)

* Connected to backend API

---

## 🔗 API Endpoints

| Endpoint        | Description         |
| --------------- | ------------------- |
| `/api/products` | Get all products    |
| `/api/auth/**`  | Authentication APIs |
| `/api/orders`   | Manage orders       |

---

## ⚠️ Notes

* JWT authentication is implemented but temporarily relaxed for deployment.
* H2 database is used instead of MySQL/PostgreSQL for easier deployment.
* Can be upgraded to production-grade DB (PostgreSQL) easily.

---

## 📂 Project Structure

```
e-commerce_full_stack/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│
├── frontend/
│   ├── src/
│   ├── package.json
│
└── README.md
```

---

## 📸 Future Improvements

* Payment gateway integration
* Full admin dashboard
* Order tracking system
* PostgreSQL integration
* Improved UI/UX

---

## 🎯 Conclusion

This project demonstrates a complete full-stack development workflow including backend APIs, frontend UI, authentication, and deployment.

---

## 🙌 Acknowledgement

Developed as part of Full Stack Java coursework at KIIT University.
