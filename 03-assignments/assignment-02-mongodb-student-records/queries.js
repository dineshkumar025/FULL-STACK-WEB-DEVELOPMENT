use collegeDB;

// Insert students
db.students.insertMany([
  { rollNo: "23CM001", name: "Ravi Kumar", branch: "CSE-AIML", year: 3, marks: 85, email: "ravi@example.com" },
  { rollNo: "23CM002", name: "Priya Sharma", branch: "CSE", year: 2, marks: 92, email: "priya@example.com" },
  { rollNo: "23CM003", name: "Rahul Verma", branch: "ECE", year: 4, marks: 45, email: "rahul@example.com" },
  { rollNo: "23CM004", name: "Sneha Reddy", branch: "CSE-AIML", year: 3, marks: 78, email: "sneha@example.com" },
  { rollNo: "23CM005", name: "Amit Singh", branch: "IT", year: 1, marks: 65, email: "amit@example.com" }
]);

// Display all
db.students.find();

// Branch specific
db.students.find({ branch: "CSE-AIML" });

// Marks > 75
db.students.find({ marks: { $gt: 75 } });

// Search by rollNo
db.students.find({ rollNo: "23CM002" });

// Search by year
db.students.find({ year: 3 });

// Update marks
db.students.updateOne({ rollNo: "23CM004" }, { $set: { marks: 82 } });

// Update email
db.students.updateOne({ rollNo: "23CM005" }, { $set: { email: "amit.singh@example.com" } });

// Delete record
db.students.deleteOne({ rollNo: "23CM003" });

// Sort descending by marks
db.students.find().sort({ marks: -1 });

// Index on rollNo
db.students.createIndex({ rollNo: 1 });

// Demonstrate index usage
db.students.find({ rollNo: "23CM001" }).explain("executionStats");

// --- Real-Time Extension ---

// Marks > 80
db.students.find({ marks: { $gt: 80 } });

// Marks < 50
db.students.find({ marks: { $lt: 50 } });

// Highest score
db.students.find().sort({ marks: -1 }).limit(1);

// Particular branch
db.students.find({ branch: "CSE" });

// Sort ascending by marks
db.students.find().sort({ marks: 1 });
