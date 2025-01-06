import express from 'express';
import { getAllCommunites, getCommunity, joinCommunity, createCommunity, storeCommunity, updateCommunity, deleteCommunity, getMemberRole } from '../controllers/controller.js';
import { getCommunities, getCommunityMembers, deleteCommunityById, runSeeds} from './dbManager.js';

const router = express.Router();

// Routes
router.get('/', getAllCommunites);
router.get('/:id', getCommunity);
router.post('/join/:community_id', joinCommunity);
router.post('/member-role/:community_id', getMemberRole);
router.get('/create', createCommunity);
router.post('/create', storeCommunity);
router.put('/edit/:id', updateCommunity);
router.delete('/delete/:id', deleteCommunity);


export default router;

// Database test and view
getCommunities();
// getCommunityMembers();
// deleteCommunityById(1);
runSeeds();