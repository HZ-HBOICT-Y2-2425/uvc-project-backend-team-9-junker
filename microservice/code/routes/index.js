import express from 'express';
const router = express.Router();

let users = []; // Temporary in-memory store for testing purposes

// Home route
router.get('/', (req, res) => {
  res.json('Welcome to the API');
});

// Example routes
router.get('/example', (req, res) => {
  res.json({ message: 'Example GET endpoint' });
});
router.post('/example', (req, res) => {
  res.json({ message: 'Example POST endpoint', data: req.body });
});

// Register route
router.post('/auth/register', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Store the user (Note: In real-world, hash the password using bcrypt)
  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Find the user
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Simulate a successful login
  res.status(200).json({ message: 'Login successful', token: 'mock-jwt-token' });
});

export default router;
