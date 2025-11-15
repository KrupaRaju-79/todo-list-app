// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON

// Basic route to test if server is running
app.get('/', (req, res) => {
  res.send('Hello from the Todo App Backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});