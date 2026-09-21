// Question 8: Express.js Middleware & Request Logger Example
const express = require('express');
const app = express();
const PORT = 3000;

// 1. Custom Middleware function for logging requests
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
    next(); // Pass control to the next route handler
};

// 2. Use Middleware globally
app.use(requestLogger);

// Routes
app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get('/about', (req, res) => {
    res.send("<h1>About Page</h1>");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Logger Server running at http://localhost:${PORT}`);
});
