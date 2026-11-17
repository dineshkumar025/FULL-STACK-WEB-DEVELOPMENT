# Student Management System

A cloud-native, full-stack web application designed for academic student tracking, enrollment status management, and departmental analytics using **React**, **Node.js**, **Express.js**, and **MongoDB Atlas**, deployed to **Render** and **Vercel**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://student-management-system-dinesh.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-informational?style=for-the-badge&logo=render)](https://student-backend-dinesh.onrender.com/api/health)
[![Case Study PDF](https://img.shields.io/badge/Case%20Study-Report%20Q3%20PDF-red?style=for-the-badge&logo=adobeacrobatreader)](./Student_Management_System_Case_Study_Q3.pdf)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

---

## 👨‍🎓 Student & Academic Details
- **Student Name:** P. Dinesh Kumar
- **Roll Number:** A24126552101
- **Course:** Full-Stack Web Development (23CM4121)
- **Unit:** Unit V: MongoDB, Database Operations and Cloud Deployment
- **Assigned Question:** **Q3: Student Management System — MongoDB Atlas Configuration, Database & Collection Setup, and Express.js Backend Connection**
- **Institution:** Anil Neerukonda Institute of Technology & Sciences (ANITS)

---

## 🌐 Cloud Deployment Architecture
- **Frontend SPA (React 18 + Vite):** [https://student-management-system-dinesh.vercel.app](https://student-management-system-dinesh.vercel.app)
- **Backend API (Node.js + Express REST API):** [https://student-backend-dinesh.onrender.com](https://student-backend-dinesh.onrender.com)
  - Health Check & Database Liveness: [`/api/health`](https://student-backend-dinesh.onrender.com/api/health)
  - Student Directory: [`/api/students`](https://student-backend-dinesh.onrender.com/api/students)
  - Departmental Aggregation: [`/api/reports/department-summary`](https://student-backend-dinesh.onrender.com/api/reports/department-summary)
- **Database:** MongoDB Atlas (M0 Free Tier 3-Node Replica Set, Database: `student_db`, Collection: `students`)

---

## 📄 Case Study Report PDF
The complete 26-page academic case study report with architectural diagrams, Atlas configuration steps, Mongoose connection lifecycle, CRUD queries, aggregation pipelines, and execution screenshots is available in this repository:
- **[Student_Management_System_Case_Study_Q3.pdf](./Student_Management_System_Case_Study_Q3.pdf)**

---

## 📁 Repository Directory Structure

```text
case study/
├── backend/
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Express, Mongoose, CORS, Dotenv dependencies
│   └── server.js                 # Complete REST API with Mongoose connection pooling
├── frontend/
│   ├── .env.example              # Frontend Vite environment template
│   ├── index.html                # Single Page Application HTML root
│   ├── package.json              # React 18 & Vite build dependencies
│   ├── vite.config.js            # Vite configuration
│   └── src/
│       ├── App.jsx               # Interactive Student Dashboard & form
│       ├── main.jsx              # React 18 DOM mount point
│       └── style.css             # Responsive layout (Desktop tables & Mobile cards)
├── Student_Management_System_Case_Study_Q3.pdf   # Academic Report PDF
├── Student_Management_System_Case_Study_Q3.html  # Source HTML for the PDF
├── .gitignore                    # Ignores node_modules, .env, and build artifacts
└── README.md                     # Documentation & setup guide
```

---

## 🚀 Key Features of the System

1. **MongoDB Atlas Cloud Database Integration:**
   - Provisioned M0 3-node replica set cluster on AWS Mumbai (`ap-south-1`).
   - Secure SCRAM-SHA-256 user authentication and CIDR IP whitelisting.
   - DNS Seedlist SRV Protocol (`mongodb+srv://...`) with retryable writes and majority write concern.
2. **Robust Express.js REST API:**
   - Full CRUD support: Add, View, Update, and Delete student records.
   - Health check endpoint verifying active Mongoose connection state.
   - Multi-stage MongoDB Aggregation Pipeline (`$group`, `$project`, `$sort`) for real-time departmental GPA metrics.
   - B-tree indexing on `rollNumber` (unique) and compound index on `{ department: 1, year: 1 }`.
3. **Interactive & Responsive React Client:**
   - Real-time summary analytics cards showing student counts and departmental averages.
   - Form validation for academic roll numbers, GPA ranges (0.00 - 10.00), and years (1 - 4).
   - Dual-view UI: High-density data tables on desktop and touch-friendly cards on mobile devices (\(\le 768\text{px}\)).
   - Toast-style alert notifications for successful transactions and duplicate-key errors.

---

## 💻 Local Setup & Execution Instructions

### Prerequisites
- Node.js (v18.0 or higher)
- npm (v9.0 or higher)
- MongoDB Atlas cluster connection URI or local MongoDB instance

### 1. Backend Service Setup
```bash
# Navigate to backend directory
cd backend

# Install production dependencies
npm install

# Create environment configuration file from template
cp .env.example .env

# Configure your MONGODB_URI and DB_NAME inside .env
# Example:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
# DB_NAME=student_db
# PORT=5000

# Launch server
npm start
```
The Express backend server runs at `http://localhost:5000`.

### 2. Frontend Client Setup
```bash
# Open a second terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment configuration file from template
cp .env.example .env

# Launch Vite development server
npm run dev
```
The React frontend dashboard opens automatically at `http://localhost:5173`.

---

## 📡 REST API Endpoint Documentation

| HTTP Method | Endpoint Route | Action / Description | Mongoose Method Executed | Expected HTTP Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service liveness & database connectivity check | `mongoose.connection.readyState` | `200 OK` |
| `GET` | `/api/students` | Retrieve all student records sorted by roll number | `Student.find().sort({ rollNumber: 1 })` | `200 OK` |
| `GET` | `/api/students/:id` | Retrieve single student profile by ObjectId | `Student.findById(id)` | `200 OK` / `404 Not Found` |
| `POST` | `/api/students` | Register and persist new student document | `Student.create(payload)` | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/students/:id` | Update student GPA, year, or department details | `Student.findByIdAndUpdate(id, payload, { new: true })` | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/students/:id` | Permanently remove student record from Atlas | `Student.findByIdAndDelete(id)` | `200 OK` / `404 Not Found` |
| `GET` | `/api/reports/department-summary` | Compute departmental statistics via aggregation | `Student.aggregate([ $group, $project, $sort ])` | `200 OK` |

---

## 🔒 Security & Cloud Environment Configuration

| Environment Variable | Target Service | Purpose & Deployment Setting |
| :--- | :--- | :--- |
| `MONGODB_URI` | Render Web Service | MongoDB Atlas SRV connection string with credentials (Keep Secret) |
| `DB_NAME` | Render Web Service | Target database: `student_db` |
| `PORT` | Render Web Service | Runtime port assigned automatically by cloud environment |
| `FRONTEND_ORIGIN` | Render Web Service | Whitelisted CORS origin (e.g., `https://student-management-system-dinesh.vercel.app`) |
| `VITE_API_URL` | Vercel Static App | Public Render backend URL (e.g., `https://student-backend-dinesh.onrender.com`) |

---

## 📜 License
This project is developed as part of the academic curriculum for the **Full-Stack Web Development (23CM4121)** course at **Anil Neerukonda Institute of Technology & Sciences (ANITS)**.
Licensed under the [MIT License](https://opensource.org/licenses/MIT).
