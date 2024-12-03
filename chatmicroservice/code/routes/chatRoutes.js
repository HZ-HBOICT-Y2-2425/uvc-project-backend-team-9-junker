import express from 'express';
import { sendMessage, getChatMessages } from '../controllers/chatController.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/:chatId', getChatMessages);

export default router;