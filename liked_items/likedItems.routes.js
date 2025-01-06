import express from 'express';
import { saveLikedItem, getLikedItems } from './likedItems.controller.js';

const router = express.Router();

// POST route to save a liked item
router.post('/', saveLikedItem);

// GET route to fetch liked items for a user
router.get('/:userId', getLikedItems);

export default router;
