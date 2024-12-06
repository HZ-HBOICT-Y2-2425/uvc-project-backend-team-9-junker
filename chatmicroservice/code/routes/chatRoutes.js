import express from 'express';
import { sendMessage, getChatMessages, getAllMessagesHandler, getLastMessagesForUser} from '../controllers/chatController.js';

const router = express.Router();

router.post('/send', sendMessage); // Save a message
router.get('/:chatId', getChatMessages); // Get messages for a specific chat
router.get('/', getAllMessagesHandler); // Get all messages from all chats
router.get('/last-messages/:userId', getLastMessagesForUser); // Get the last message for each chat where the user is the recipient

export default router;