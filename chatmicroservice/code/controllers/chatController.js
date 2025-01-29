import { saveMessage, getMessages, getAllMessages } from '../services/firebaseService.js';
import { getDatabase } from "firebase-admin/database";

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

export const getLastMessagesForUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const db = getDatabase();
    const chatsRef = db.ref("chats");

    const snapshot = await chatsRef.once("value");
    const allChats = snapshot.val();

    if (!allChats) {
      return res.status(404).json({ error: "No chats found" });
    }

    const lastMessages = [];

    // Iterate through all chats to find messages related to the user
    Object.entries(allChats).forEach(([chatId, messages]) => {
      const relatedMessages = Object.values(messages).filter(
        (msg) => msg.sender === userId || msg.recipient === userId
      );

      if (relatedMessages.length > 0) {
        const lastMessage = relatedMessages.sort(
          (a, b) => b.timestamp - a.timestamp
        )[0]; // Get the latest message
        lastMessages.push({
          chatId,
          ...lastMessage,
        });
      }
    });

    res.status(200).json(lastMessages);
  } catch (error) {
    console.error("Error in getLastMessagesForUser:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch last messages", details: error.message });
  }
};