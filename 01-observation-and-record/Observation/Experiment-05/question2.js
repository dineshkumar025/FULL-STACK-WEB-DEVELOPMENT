// Question 2: Node.js File Management Application
const fs = require('fs');

const fileName = 'example.txt';

// 1. Create and Write File
fs.writeFileSync(fileName, 'Hello World! Initial file content.\n');
console.log("1. File created successfully.");

// 2. Read File Content
let content = fs.readFileSync(fileName, 'utf8');
console.log("\n2. Reading File Content:");
console.log(content);

// 3. Append Extra Content
fs.appendFileSync(fileName, 'This line is appended to the file.\n');
console.log("3. Appended extra content successfully.");

// 4. Read Final Content
let finalContent = fs.readFileSync(fileName, 'utf8');
console.log("\n4. Final File Content:");
console.log(finalContent);
