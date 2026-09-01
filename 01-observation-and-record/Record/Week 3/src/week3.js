// 1. VARIABLES
let name = "Dinesh";
let age = 20;
let marks = 85;

console.log("Name:", name);
console.log("Age:", age);
console.log("Marks:", marks);


// 2. IF-ELSE STATEMENT
if (marks >= 40) {
    console.log("Result: Pass");
} else {
    console.log("Result: Fail");
}


// 3. ARRAY
let subjects = ["JavaScript", "Python", "HTML", "CSS"];

console.log("Subjects:", subjects);

// Accessing array elements
console.log("First subject:", subjects[0]);
console.log("Second subject:", subjects[1]);

// Adding an element
subjects.push("Java");

console.log("After adding Java:", subjects);


// 4. LOOP
console.log("All Subjects:");

for (let i = 0; i < subjects.length; i++) {
    console.log(subjects[i]);
}


// 5. FUNCTION
function greet(name) {
    console.log("Hello " + name + "!");
}

greet("Dinesh");


// 6. FUNCTION WITH PARAMETERS AND RETURN VALUE
function add(a, b) {
    return a + b;
}

let result = add(10, 20);

console.log("Sum:", result);


// 7. FUNCTION TO CALCULATE AVERAGE
function calculateAverage(marks) {
    let total = 0;

    for (let i = 0; i < marks.length; i++) {
        total = total + marks[i];
    }

    return total / marks.length;
}

let studentMarks = [80, 75, 90, 85];

let average = calculateAverage(studentMarks);

console.log("Average Marks:", average);
