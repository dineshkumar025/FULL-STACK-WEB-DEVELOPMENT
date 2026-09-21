/**
 * Practice Test 3 - ES6 JavaScript Functions & Array Manipulation
 * Topics covered: Higher-Order Functions, Arrow Functions, Array Methods (map, filter, reduce), Promises, Destructuring
 */

// 1. Student Sample Dataset
const studentRecords = [
    { id: 101, name: "Alice Johnson", marks: [85, 90, 92], status: "Active", department: "Computer Science" },
    { id: 102, name: "Bob Smith", marks: [65, 70, 68], status: "Inactive", department: "Information Tech" },
    { id: 103, name: "Charlie Brown", marks: [95, 98, 94], status: "Active", department: "Computer Science" },
    { id: 104, name: "Diana Prince", marks: [78, 82, 80], status: "Active", department: "Electrical Eng" },
    { id: 105, name: "Ethan Hunt", marks: [55, 60, 58], status: "Active", department: "Computer Science" }
];

// 2. Arrow Function to calculate average score
const calculateAverage = (marks) => {
    const total = marks.reduce((sum, score) => sum + score, 0);
    return (total / marks.length).toFixed(2);
};

// 3. Higher-order function to filter high performers (Average >= 80)
const getTopPerformers = (students, minAvg = 80) => {
    return students
        .map(student => ({
            ...student,
            averageScore: parseFloat(calculateAverage(student.marks))
        }))
        .filter(student => student.averageScore >= minAvg)
        .sort((a, b) => b.averageScore - a.averageScore);
};

// 4. Summarize department statistics using reduce
const summarizeByDepartment = (students) => {
    return students.reduce((acc, student) => {
        const dept = student.department;
        if (!acc[dept]) {
            acc[dept] = { totalStudents: 0, activeStudents: 0 };
        }
        acc[dept].totalStudents += 1;
        if (student.status === "Active") {
            acc[dept].activeStudents += 1;
        }
        return acc;
    }, {});
};

// 5. Async Function simulation with Promises
const fetchStudentById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const student = studentRecords.find(s => s.id === id);
            if (student) {
                resolve({ success: true, data: student });
            } else {
                reject({ success: false, message: `Student ID ${id} not found.` });
            }
        }, 500);
    });
};

// --- Execution & Console Outputs ---
console.log("=== Practice Test 3: ES6 Function Execution ===");

console.log("\n1. Top Performing Students (Avg >= 80):");
console.log(getTopPerformers(studentRecords));

console.log("\n2. Department Summary Statistics:");
console.log(summarizeByDepartment(studentRecords));

// Testing Async fetch
fetchStudentById(103)
    .then(response => console.log("\n3. Async Fetch Result:", response.data.name, "| Department:", response.data.department))
    .catch(err => console.error("\n3. Async Fetch Error:", err.message));
