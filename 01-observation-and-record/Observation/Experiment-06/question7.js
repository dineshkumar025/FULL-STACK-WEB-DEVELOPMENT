/**
 * Question 7: NPM and package.json in Node.js
 * 
 * 1. What is NPM?
 *    NPM (Node Package Manager) is the default package manager for Node.js. It allows developers
 *    to install, share, and manage third-party open-source libraries/packages.
 * 
 * 2. What is package.json?
 *    package.json is the metadata configuration file of a Node.js project. It keeps track of project details,
 *    scripts, and installed dependencies (packages).
 * 
 * 3. Steps to install and use an external package (Example: 'express'):
 * 
 *    Step 1: Initialize Node Project
 *            Command: npm init -y
 * 
 *    Step 2: Install External Package
 *            Command: npm install express
 * 
 *    Step 3: Import and Use Package in Application
 */

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello! Package 'express' installed via NPM is working!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000 using installed NPM package.");
});
