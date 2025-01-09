import express from 'express';
import { getAllCommunites, getCommunity, getCommunitiesByUserId, joinCommunity, createCommunity, storeCommunity, updateCommunity, deleteCommunity, getMemberRole, leaveCommunity } from '../controllers/controller.js';
import { getCommunities, getCommunityMembers, deleteCommunityById, runSeeds, runMigrations} from './dbManager.js';

const router = express.Router();

// Routes
router.get('/', getAllCommunites);
router.get('/:id', getCommunity);
router.post('/user/:user_id', getCommunitiesByUserId);
router.post('/join/:community_id', joinCommunity);
router.post('/leave/:community_id', leaveCommunity)
router.post('/member-role/:community_id', getMemberRole);
router.get('/create', createCommunity);
router.post('/create', storeCommunity);
router.put('/edit/:id', updateCommunity);
router.delete('/delete/:id', deleteCommunity);


export default router;

// Database test and view
getCommunities();
// getCommunityMembers();
// deleteCommunityById(14);
// runMigrations();
// runSeeds();
