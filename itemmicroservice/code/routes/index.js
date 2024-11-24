import express from 'express';
import { createItem, storeItem, updateItem, deleteItem } from '../controllers/itemsController.js'; // Adjust the path as needed

const router = express.Router();

// Route to render or prepare data for creating an item
router.get('/users/:userid/items/create', createItem);

// Route to store a new item in the database
router.post('/users/:userid/items', storeItem);

// Route to update an existing item
router.put('/users/:userid/items/:id', updateItem);

// Route to delete an item
router.delete('/users/:userid/items/:id', deleteItem);

export default router;

