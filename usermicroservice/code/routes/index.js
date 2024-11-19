import express from 'express';

import { addUser, loginUser, refreshToken, logoutUser, getUserList, getOneUser } from '../controllers/controller.js';
import { validateToken } from '../middleware/middleware.js';

const router = express.Router();

// routes
router.get("/", getUserList);
router.post("/register", addUser);
router.post("/login", loginUser);
router.get("/user/:username", validateToken, getOneUser);
router.post("/refreshToken", validateToken, refreshToken);
router.delete("/logout", logoutUser);

export default router;