import express from 'express';
import { getAllCommunites, getCommunity, joinCommunity, createCommunity, storeCommunity, updateCommunity, deleteCommunity } from '../controllers/controller.js';
const router = express.Router();

// Route to render or prepare data for viewing an item
router.get('/', getAllCommunites);

// Route to render or prepare data for viewing an item
router.get('/:id', getCommunity);

// Route to render or prepare data for creating an item
router.get('/join/:id', joinCommunity);

// Route to render or prepare data for creating an item
router.get('/create', createCommunity);

// Route to store a new item in the database
router.post('/create', storeCommunity);

// Route to update an existing item
router.put('/edit/:id', updateCommunity);

// Route to delete an item
router.delete('/delete/:id', deleteCommunity);

export default router;

// Database test and view
import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

async function getCommunities() {
    try {
      // Query all users
        const communities = await db('communities').select('*');
        console.log(communities);
    } catch (error) {
        console.error('Error fetching uscommunitiesers:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}
getCommunities();

async function deleteCommunityById(id) {
    try {
        // Delete the user with the specified ID
        await db('communities').where('id', id).del();
        console.log('Community deleted successfully');
    } catch (error) {
        console.error('Error deleting:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}

// deleteCommunityById(5);