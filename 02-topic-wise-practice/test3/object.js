/**
 * Practice Test 3 - Object Oriented JavaScript & ES6 Classes
 * Topics covered: Classes, Constructors, Methods, Encapsulation, Object Methods (keys, values, entries)
 */

// 1. Course Base Class
class Course {
    constructor(courseCode, title, credits) {
        this.courseCode = courseCode;
        this.title = title;
        this.credits = credits;
    }

    getCourseDetails() {
        return `[${this.courseCode}] ${this.title} (${this.credits} Credits)`;
    }
}

// 2. Student Manager Class demonstrating encapsulation
class StudentManager {
    #students; // Private field

    constructor() {
        this.#students = new Map();
    }

    // Add a new student
    addStudent(id, name, course) {
        if (this.#students.has(id)) {
            console.warn(`Student with ID ${id} already exists.`);
            return false;
        }
        this.#students.set(id, {
            id,
            name,
            course,
            enrolledAt: new Date().toISOString().split('T')[0]
        });
        return true;
    }

    // Get student details by ID
    getStudent(id) {
        return this.#students.get(id) || null;
    }

    // List all registered students
    listAllStudents() {
        const studentList = [];
        this.#students.forEach(student => {
            studentList.push(`${student.id}: ${student.name} - ${student.course.getCourseDetails()}`);
        });
        return studentList;
    }

    // Count total students
    getTotalCount() {
        return this.#students.size;
    }
}

// --- Execution Demonstration ---
console.log("=== Practice Test 3: Object-Oriented JS & Classes ===");

// Instantiate Courses
const webDevCourse = new Course("CS201", "Full Stack Web Development", 4);
const dbCourse = new Course("CS202", "Database Management Systems", 3);

// Instantiate Student Manager
const manager = new StudentManager();

// Register Students
manager.addStudent(101, "Alice Johnson", webDevCourse);
manager.addStudent(102, "Bob Smith", dbCourse);
manager.addStudent(103, "Carol Williams", webDevCourse);

console.log("\nRegistered Students List:");
manager.listAllStudents().forEach(info => console.log("- " + info));

console.log(`\nTotal Enrolled Students: ${manager.getTotalCount()}`);

// Inspecting Object Entries Utility
console.log("\nInspecting Course Object Keys & Entries:");
console.log("Keys:", Object.keys(webDevCourse));
console.log("Values:", Object.values(webDevCourse));
console.log("Entries:", Object.entries(webDevCourse));
