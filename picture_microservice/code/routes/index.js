import express from 'express';
import { getAllPictures, getPicture, getPictureByName, storePicture, updatePicture, deletePicture, getPicturesByUserId, getPicturesByItemId, getPicturesByCommunityId } from '../controllers/controller.js';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.json('Welcome to the API');
  });

// Route to render or prepare data for viewing an Picture
router.post('/pictures', getAllPictures)

// Route to render or prepare data for viewing an picture
router.post('/name/:name', getPictureByName);

// Route to render or prepare data for viewing pictures
router.post('/user/:userid', getPicturesByUserId);

// Route to render or prepare data for viewing pictures
router.post('/item/:itemid', getPicturesByItemId);

// Route to render or prepare data for viewing pictures
router.post('/community/:communityid', getPicturesByCommunityId);

// Route to store a new Picture in the database
router.post('/create', storePicture);

// Route to update an existing Picture
router.put('/edit/:id', updatePicture);

// Route to delete an Picture
router.delete('/delete/:id', deletePicture);

// Route to render or prepare data for viewing an picture
router.get('/:id', getPicture);

export default router;

// Database test and view
import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

// eslint-disable-next-line no-unused-vars
async function getPictures() {
    try {
      // Query all pictures
        const pictures = await db('pictures').select('*');
        console.log(pictures);
    } catch (error) {
        console.error('Error fetching pictures:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}
// getPictures();

// eslint-disable-next-line no-unused-vars
async function deletePictureById(id) {
  try {
      // Delete the Picture with the specified ID
      await db('pictures').where('id', id).del();
      console.log('Picture deleted successfully');
  } catch (error) {
      console.error('Error deleting:', error);
  } finally {
      // Destroy the Knex connection after the query
      db.destroy();
  }
}

// deletePictureById(5);