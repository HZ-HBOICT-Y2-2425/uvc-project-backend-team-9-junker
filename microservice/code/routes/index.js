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

export default router;
