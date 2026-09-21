// Question 3: Express.js Student Server
const express = require('express');
const app = express();
const PORT = 3000;

// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Student Server Home Page</h1>');
});

// Students Route - Returns 5 Students
app.get('/students', (req, res) => {
    const students = [
        { id: 101, name: "Rahul Sharma", branch: "CSE" },
        { id: 102, name: "Anita Kumar", branch: "ECE" },
        { id: 103, name: "Suresh Patel", branch: "CSE" },
        { id: 104, name: "Priya Singh", branch: "IT" },
        { id: 105, name: "Vikas Verma", branch: "EEE" }
    ];
    res.json(students);
});

// About Route
app.get('/about', (req, res) => {
    res.send('<h1>About Application</h1><p>This is a basic Express.js REST API server for managing student data.</p>');
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
