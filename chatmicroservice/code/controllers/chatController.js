import { saveMessage, getMessages } from '../services/firebaseService.js';

// POST: Save a new message
export const sendMessage = async (req, res) => {
  const { chatId, sender, recipient, content } = req.body;

  if (!chatId || !sender || !recipient || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const timestamp = Date.now();

  try {
    await saveMessage(chatId, { sender, recipient, content, timestamp });
    res.status(201).json({ success: true, message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// GET: Fetch all messages for a chat
export const getChatMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ error: 'Missing chatId' });
  }

  try {
    const messages = await getMessages(chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};