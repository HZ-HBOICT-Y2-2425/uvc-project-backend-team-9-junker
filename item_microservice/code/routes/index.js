import express from 'express';
import { getAllItems, getItem, storeItem, updateItem, deleteItem } from '../controllers/controller.js';

import { getItemsByUser } from '../controllers/controller.js';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.json('Welcome to the API');
  });

// Route to render or prepare data for viewing an item
router.get('/items', getAllItems)

// Route to render or prepare data for viewing an item
router.get('/:id', getItem);

// Route to store a new item in the database
router.post('/create', storeItem);

// Route to update an existing item
router.put('/edit/:id/:userid', updateItem);

// Route to delete an item
router.delete('/delete/:id/:userid', deleteItem);

// Route to get all items by a specific user
router.get('/items/user/:userid', getItemsByUser);

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

async function deleteItemById(id) {
  try {
      // Delete the item with the specified ID
      await db('items').where('id', id).del();
      console.log('Item deleted successfully');
  } catch (error) {
      console.error('Error deleting:', error);
  } finally {
      // Destroy the Knex connection after the query
      db.destroy();
  }
}

// deleteItemById(5);