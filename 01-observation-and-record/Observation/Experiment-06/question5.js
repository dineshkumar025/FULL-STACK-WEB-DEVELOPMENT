// Question 5: JavaScript Functions vs Classes

// 1. Regular Function Example
function calculateArea(width, height) {
    return width * height;
}

console.log("Area using function:", calculateArea(5, 10));


// 2. Class Example (Creating multiple objects with common properties and methods)
class Student {
    constructor(rollNo, name, branch) {
        this.rollNo = rollNo;
        this.name = name;
        this.branch = branch;
    }

    // Common Method
    displayInfo() {
        console.log(`Roll No: ${this.rollNo} | Name: ${this.name} | Branch: ${this.branch}`);
    }
}

// Creating multiple objects using the Student class
const student1 = new Student(101, "Rahul", "CSE");
const student2 = new Student(102, "Anita", "ECE");
const student3 = new Student(103, "Suresh", "IT");

console.log("\nStudent Details created using Class:");
student1.displayInfo();
student2.displayInfo();
student3.displayInfo();
