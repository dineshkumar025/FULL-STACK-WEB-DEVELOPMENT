// Question 6: Node.js Built-in Modules (os, path, fs)

// 1. OS Module - Operating System Information
const os = require('os');
console.log("=== 1. OS Module Info ===");
console.log("OS Platform:", os.platform());
console.log("OS Architecture:", os.arch());
console.log("Free Memory (MB):", (os.freemem() / (1024 * 1024)).toFixed(2));


// 2. PATH Module - Working with File Paths
const path = require('path');
console.log("\n=== 2. Path Module Info ===");
const samplePath = "/users/dinesh/documents/file.txt";
console.log("File Extension:", path.extname(samplePath));
console.log("Base Name:", path.basename(samplePath));
console.log("Joined Path:", path.join(__dirname, 'folder', 'test.txt'));


// 3. FS Module - File System Operations
const fs = require('fs');
console.log("\n=== 3. FS Module Operations ===");
fs.writeFileSync('output.txt', 'Demonstration of Node.js FS Module.\n');
let content = fs.readFileSync('output.txt', 'utf8');
console.log("File Content:", content);
