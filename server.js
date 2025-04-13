// ===============================================
// Express.js Starter Template with Public Files
// Serves HTML files from public directory
// ===============================================

const express = require('express');
const path = require('path');
const app = express();

// ===================
// MIDDLEWARE
// ===================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===================
// ROUTES
// ===================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login Routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic would go here
  res.json({ message: `Logged in as username`, token: 'sample-jwt-token' });
});

// Register Routes
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // User creation logic would go here
  res.json({ message: `User registered: username`, email });
});

// Contact Route
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// ===================
// SERVER START
// ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:PORT`);
  console.log(`Available Routes:`);
  console.log(`- Home: http://localhost:PORT`);
  console.log(`- Login: http://localhost:PORT/login`);
  console.log(`- Register: http://localhost:PORT/register`);
  console.log(`- Contact: http://localhost:PORT/contact`);
});