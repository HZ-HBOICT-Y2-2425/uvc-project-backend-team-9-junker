import express from 'express';
import { createItem, storeItem, updateItem, deleteItem, showAllItems } from '../controllers/controller.js';

const router = express.Router();
// Route to render or prepare data for viewing an item
router.get('/items',showAllItems)

// Route to render or prepare data for creating an item
router.get('/items/create', createItem);

// Route to store a new item in the database
router.post('/items/:userid', storeItem);

// Route to update an existing item
router.put('/items/:id', updateItem);

// Route to delete an item
router.delete('/items/:id', deleteItem);

export default router;

// Database test and view
import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

async function getItems() {
    try {
      // Query all items
        const items = await db('items').select('*');
        console.log(items);
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}
getItems();
