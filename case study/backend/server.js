/**
 * Student Management System — Backend REST Service
 * Case Study Question Q3: MongoDB Atlas Configuration, Database & Collection Setup, and Express.js Backend Connection
 * 
 * Course: Full-Stack Web Development (23CM4121)
 * Institution: Anil Neerukonda Institute of Technology & Sciences (ANITS)
 * Student: P. Dinesh Kumar (Roll No: A24126552101)
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Body Parser Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for academic presentation
    },
    credentials: true,
  })
);

// ----------------- DATA MODELING: MONGOOSE SCHEMA ----------------- //

const studentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: [true, "Roll Number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Student name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      enum: ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Technology"],
    },
    year: {
      type: Number,
      required: [true, "Academic year is required"],
      min: [1, "Year must be between 1 and 4"],
      max: [4, "Year must be between 1 and 4"],
    },
    gpa: {
      type: Number,
      required: [true, "GPA is required"],
      min: [0.0, "GPA cannot be negative"],
      max: [10.0, "GPA cannot exceed 10.0"],
    },
    enrollmentStatus: {
      type: String,
      enum: ["Active", "Graduated", "Suspended"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// Performance Indexes for fast B-tree lookups
studentSchema.index({ rollNumber: 1 }, { unique: true });
studentSchema.index({ department: 1 });
studentSchema.index({ department: 1, year: 1 });

const Student = mongoose.model("Student", studentSchema, "students");

// ----------------- API ENDPOINTS ----------------- //

// 1. Service Health & Database Connectivity Check
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.status(200).json({
    status: "ok",
    message: "Student Management API is running",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// 2. Read All Students (Retrieve from MongoDB)
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNumber: 1 });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Unable to retrieve student records", error: err.message });
  }
});

// 3. Read Single Student by ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: "Invalid student identifier format", error: err.message });
  }
});

// 4. Create New Student (Insert Document into MongoDB)
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern || {})[0] || "Field";
      return res.status(400).json({
        message: `${duplicateField} already exists in the system (unique constraint violation)`,
      });
    }
    res.status(400).json({ message: err.message });
  }
});

// 5. Update Existing Student (Modify Document in MongoDB)
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 6. Delete Student Record (Purge Document from MongoDB)
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json({ message: "Student record deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 7. Aggregation Pipeline: Department-wise Academic Summary
app.get("/api/reports/department-summary", async (req, res) => {
  try {
    const summary = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          totalStudents: { $sum: 1 },
          averageGpa: { $avg: "$gpa" },
          highestGpa: { $max: "$gpa" },
        },
      },
      {
        $project: {
          department: "$_id",
          totalStudents: 1,
          averageGpa: { $round: ["$averageGpa", 2] },
          highestGpa: 1,
          _id: 0,
        },
      },
      { $sort: { totalStudents: -1 } },
    ]);
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: "Unable to generate summary report", error: err.message });
  }
});

// ----------------- MONGOOSE CONNECTION LIFECYCLE & SERVER START ----------------- //

const PORT = process.env.PORT || 5000;

// Mongoose Connection Event Listeners
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB Atlas cluster.");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose disconnected from MongoDB Atlas.");
});

async function startServer() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME || "student_db";

    if (!mongoUri) {
      console.warn("WARNING: MONGODB_URI not defined in environment variables. Starting in offline mode.");
    } else {
      console.log(`Attempting connection to MongoDB Atlas database: ${dbName}...`);
      await mongoose.connect(mongoUri, {
        dbName: dbName,
        retryWrites: true,
        w: "majority",
      });
      console.log(`Connected successfully to database '${dbName}' on MongoDB Atlas.`);
    }

    app.listen(PORT, () => {
      console.log(`Student Management API listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Critical failure during database initialization:", err.message);
    process.exit(1);
  }
}

// Graceful Termination Handler
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed gracefully due to application termination.");
  process.exit(0);
});

if (require.main === module) {
  startServer();
}

module.exports = { app, studentSchema, Student };
