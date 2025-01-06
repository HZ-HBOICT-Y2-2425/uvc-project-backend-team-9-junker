import express from 'express';
import { addUser, loginUser, refreshToken, logoutUser, getUser, editUser, getPrivateUser, getPublicUser, getPublicUserById } from '../controllers/controller.js';
import { validateToken } from '../middleware/middleware.js';

const router = express.Router();

// routes
router.get("/", getUser);
router.post("/register", addUser);
router.post("/login", loginUser);

router.get("/user/public/:username", getPublicUser);
router.get("/id/public/:id", getPublicUserById);
router.get("/user/private/:username", validateToken, getPrivateUser);

router.put("/user/:username", validateToken, editUser);
router.post("/refreshToken", refreshToken);

router.delete("/logout", logoutUser);
router.delete("/user/:username", validateToken, deleteUser);

export default router;

// Database test and view
import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

async function getUsers() {
    try {
      // Query all users
        const users = await db('users').select('*');
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}
// getUsers();

async function deleteUser(id) {
    try {
        // Delete the user with the specified ID
        await db('users').where('id', id).del();
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}

// deleteUser(1);
