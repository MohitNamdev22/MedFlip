// authRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cors = require('cors')

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'data.json');

// Function to read user data from data.json file
function readUserDataFromFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading user data from file:', error);
    return { users: [] };
  }
}

// Function to write user data to data.json file
function writeUserDataToFile(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing user data to file:', error);
  }
}

router.use(cors())

// Route for user registration
router.get('/username', (req, res) => {
  // Read existing user data from file
  const { users } = readUserDataFromFile();

  // Assume user is logged in and retrieve the username from the first user
  if (users.length > 0) {
    const username = users[0].username; // Change this logic based on your authentication mechanism
    res.json({ username });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.get('/checkAuth', (req, res) => {
  // Read existing user data from file
  const { users } = readUserDataFromFile();

  // Assume user is authenticated if there are users in the file
  if (users.length > 0) {
    const username = users[0].username; // Change this logic based on your authentication mechanism
    res.json({ isAuthenticated: true, username });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.post('/register', (req, res) => {
  console.log("hello")
  const { username, password } = req.body;

  // Read existing user data from file
  const { users } = readUserDataFromFile();

  // Check if username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Generate new user ID
  const id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

  // Add new user to the users array
  users.push({ id, username, password });

  // Write updated user data back to file
  writeUserDataToFile({ users });

  res.status(201).json({ message: 'User registered successfully' });
});

// Route for user login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read existing user data from file
  const { users } = readUserDataFromFile();

  // Find user by username
  const user = users.find(user => user.username === username);

  // Check if user exists
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Check if password is correct
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Return success message along with the username
  res.json({ message: 'Login successful', username: user.username });
});

// Route for user logout
router.post('/logout', (req, res) => {
  // Clear user session or invalidate token (for demonstration purposes)
  // In a real application, you would implement proper session management or token invalidation
  // For demonstration purposes, we'll simply return a success message
  res.json({ message: 'Logout successful' });
});

// Route for checking authentication status
router.get('/checkAuth', (req, res) => {
  // Check if user session exists or token is valid (for demonstration purposes)
  // In a real application, you would implement proper session management or token verification
  // For demonstration purposes, we'll simply return a success message if the user is authenticated
  res.json({ message: 'User is authenticated' });
});

router.get('/admin', (req, res) => {
  // Here, prompt the user to enter their credentials
  // For demonstration purposes, we'll use basic authentication via headers
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Panel"');
    return res.status(401).send('Authorization required');
  }

  // Extract username and password from the Authorization header
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const username = credentials[0];
  const password = credentials[1];

  // Read existing user data from file
  const { users } = readUserDataFromFile();

  // Find user by username
  const user = users.find(user => user.username === username);

  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // User is authenticated, allow access to admin panel
  res.json({ message: 'Authentication successful. Welcome to the admin panel!' });
});

module.exports = router;