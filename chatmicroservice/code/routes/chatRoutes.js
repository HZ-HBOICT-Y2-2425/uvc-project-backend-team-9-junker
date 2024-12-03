import express from 'express';
import { sendMessage, getChatMessages, getAllMessagesHandler } from '../controllers/chatController.js';

const router = express.Router();

router.post('/send', sendMessage); // Save a message
router.get('/:chatId', getChatMessages); // Get messages for a specific chat
router.get('/', getAllMessagesHandler); // Get all messages from all chats

export default router;