import express from 'express';
import cors from 'cors'; // Import CORS
import { addLikedItem, removeLikedItem } from './likedItems.service.js';
import { verifyToken } from './auth.js'; // Import the verifyToken function (adjust the path as needed)

// Initialize Express
const app = express();
const port = 3013; // or from environment variable

// Enable CORS for all routes
app.use(cors()); // Add this line to enable CORS

// Middleware to parse JSON requests
app.use(express.json());

// Initialize SQLite database connection
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./liked_items.db');

// Initialize table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS liked_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      itemId TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Add liked item
app.post('/api/liked-items', verifyToken, async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    await addLikedItem(userId, itemId);
    res.status(201).send({ message: 'Liked item added successfully!' });
  } catch (error) {
    console.error('Error adding liked item:', error);
    res.status(500).send({ error: 'Failed to add liked item' });
  }
});

app.get('/api/liked-items', async (req, res) => {
  try {
    const likedItems = await getAllLikedItems(); // A function that fetches all items
    res.status(200).send(likedItems);
  } catch (error) {
    console.error('Error fetching liked items:', error);
    res.status(500).send({ error: 'Failed to fetch liked items' });
  }
});


// Remove liked item
app.delete('/api/liked-items', verifyToken, async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    await removeLikedItem(userId, itemId);
    res.status(200).send({ message: 'Liked item removed successfully!' });
  } catch (error) {
    console.error('Error removing liked item:', error);
    res.status(500).send({ error: 'Failed to remove liked item' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
