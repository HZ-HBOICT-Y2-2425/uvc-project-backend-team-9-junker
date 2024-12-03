import { saveMessage, getMessages, getAllMessages } from '../services/firebaseService.js';

// Save a new message
export const sendMessage = async (req, res) => {
  const { chatId, sender, recipient, content } = req.body;
  if (!chatId || !sender || !recipient || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const message = { sender, recipient, content, timestamp: Date.now() };

  try {
    await saveMessage(chatId, message);
    res.status(201).json({ success: true, message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
};

// Get messages for a specific chat
export const getChatMessages = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res.status(400).json({ error: 'Missing chatId' });
  }

  try {
    const messages = await getMessages(chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
  }
};

// Get all messages from all chats
export const getAllMessagesHandler = async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all messages', details: error.message });
  }
};