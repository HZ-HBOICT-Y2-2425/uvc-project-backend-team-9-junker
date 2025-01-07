import express from 'express';
import { addUser, loginUser, refreshToken, logoutUser, getUser, editUser, getPrivateUser, getPublicUser } from '../controllers/controller.js';
import { validateToken } from '../middleware/middleware.js';
import { runMigrations, runSeeds, getUsers, deleteUser, getCO2Categories } from './dbManager.js';
import { updateCO2, getTotalCO2, getItemCO2 } from '../controllers/co2Controller.js';

const router = express.Router();

// routes
router.get("/", getUser);
router.post("/register", addUser);
router.post("/login", loginUser);

router.get("/user/public/:username", getPublicUser);
router.get("/user/private/:username", validateToken, getPrivateUser);

router.put("/user/:username", validateToken, editUser);
router.post("/refreshToken", validateToken, refreshToken);

router.delete("/logout", logoutUser);
router.delete("/user/:username", validateToken, deleteUser);

router.post("/user/:username/co2", validateToken, updateCO2);
router.get("/co2", getTotalCO2);
router.get("/co2/:category", getItemCO2)

export default router;

// Database test and view
// runMigrations();
// runSeeds();
getUsers();
// getCO2Categories();
// deleteUser(1);
