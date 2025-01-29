import express from 'express';
import {
  sendMessage,
  getChatMessages,
  getAllMessagesHandler,
  getLastMessagesForUser
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/send', sendMessage); // Send a message
router.get('/:chatId', getChatMessages); // Fetch messages for a specific chat
router.get('/', getAllMessagesHandler); // Fetch all messages
router.get('/last-messages/:userId', getLastMessagesForUser); // Fetch last messages for user

export default router;