import express from 'express';
import knex from 'knex';
import development from '../knexfile.js';
import { validateToken } from '../middleware/middleware.js';


const router = express.Router();
const db = knex(development);

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await db('users').select('*');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get public user by ID
router.get("/user/public/id/:userid", async (req, res) => {
    const { userid } = req.params;
    console.log(`Fetching user with ID: ${userid}`); // Debug log

    if (isNaN(userid)) {
        return res.status(400).json({ error: 'Invalid user ID!' });
    }

    try {
        const user = await db('users').where({ id: userid }).first();
        if (!user) {
            return res.status(404).json({ error: 'User does not exist!' });
        }
        res.json({
            publicProfile: {
                fullname: user.fullname,
                profile_pic: user.profile_pic,
            },
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get public user by username
router.get("/user/public/username/:username", async (req, res) => {
    const { username } = req.params;
    console.log(`Fetching user with username: ${username}`); // Debug log

    try {
        const user = await db('users').where({ username }).first();
        if (!user) {
            return res.status(404).json({ error: 'User does not exist!' });
        }
        res.json({
            publicProfile: {
                fullname: user.fullname,
                profile_pic: user.profile_pic,
            },
        });
    } catch (error) {
        console.error("Error fetching user by username:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to add a new user
router.post("/register", async (req, res) => {
    const { fullName, username, password } = req.body;

    if (!fullName || !username || !password) {
        return res.status(400).json({ error: "Full name, username, and password are required." });
    }

    try {
        const existingUser = await db('users').where({ username }).first();
        if (existingUser) {
            return res.status(409).json({ error: "User already exists." });
        }

        const hashedPassword = await hash(password, 10);
        const profilePicUrl = `https://ui-avatars.com/api/?name=${fullName.replace(/\s+/g, '+')}`;

        await db('users').insert({
            fullname: fullName,
            username,
            password: hashedPassword,
            profile_pic: profilePicUrl,
        });

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Route to edit a user (requires authentication)
router.put("/user/:username", validateToken, async (req, res) => {
    const { username } = req.params;
    const { newPassword, profile_pic } = req.body;

    try {
        const user = await db('users').where({ username }).first();
        if (!user) {
            return res.status(404).json({ error: "User does not exist." });
        }

        const updates = {};

        if (newPassword) {
            updates.password = await hash(newPassword, 10);
        }

        if (profile_pic) {
            updates.profile_pic = profile_pic;
        }

        await db('users').where({ username }).update(updates);
        res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Route to delete a user (requires authentication)
router.delete("/user/:username", validateToken, async (req, res) => {
    const { username } = req.params;

    try {
        const user = await db('users').where({ username }).first();
        if (!user) {
            return res.status(404).json({ error: "User does not exist." });
        }

        await db('users').where({ username }).del();
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;
