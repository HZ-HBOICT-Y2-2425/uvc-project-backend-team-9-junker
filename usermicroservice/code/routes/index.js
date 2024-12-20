import express from 'express';
import { addUser, loginUser, refreshToken, logoutUser, getUser, editUser, getPrivateUser, getPublicUser, deleteUser } from '../controllers/controller.js';
import { validateToken } from '../middleware/middleware.js';
import development from '../knexfile.js';
import knex from 'knex';

const router = express.Router();
const db = knex(development);

// Existing Routes
router.get("/", getUser);
router.post("/register", addUser);
router.post("/login", loginUser);

router.get("/user/public/:username", getPublicUser);
router.get("/user/private/:username", validateToken, getPrivateUser);

router.put("/user/:username", validateToken, editUser);
router.post("/refreshToken", refreshToken);

router.delete("/logout", logoutUser);
router.delete("/user/:username", validateToken, deleteUser);

// New Route for GET /users
router.get('/users', async (req, res) => {
    try {
        const users = await db('users').select('*'); // Fetch all users from the database
        res.status(200).json(users); // Respond with the list of users
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
