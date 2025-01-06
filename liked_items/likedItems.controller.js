import express from 'express';
import { addLikedItem, getLikedItems, removeLikedItem } from './likedItems.service.js';

const router = express.Router();

// Add a liked item
router.post('/', async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    await addLikedItem(userId, itemId);
    res.status(201).send({ message: 'Liked item added successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add liked item' });
  }
});

// Get liked items
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const likedItems = await getLikedItems(userId);
    res.status(200).send(likedItems);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch liked items' });
  }
});

// Remove a liked item
router.delete('/', async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    await removeLikedItem(userId, itemId);
    res.status(200).send({ message: 'Liked item removed successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to remove liked item' });
  }
});

export default router;
