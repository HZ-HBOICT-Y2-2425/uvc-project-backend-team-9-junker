import {
  sendMessage,
  getChatMessages,
  getAllMessagesHandler,
  getLastMessagesForUser,
} from '../controllers/chatController.js';
import {
  saveMessage,
  getMessages,
  getAllMessages,
} from '../services/firebaseService.js';
import { getDatabase } from 'firebase-admin/database';

// Mock Firebase services
jest.mock('../services/firebaseService.js');
jest.mock('firebase-admin/database', () => ({
  getDatabase: jest.fn(),
}));

describe('Chat Controller Tests', () => {
  describe('sendMessage', () => {
    it('should send a message successfully', async () => {
      const req = {
        body: {
          chatId: 'testChat',
          sender: 'user1',
          recipient: 'user2',
          content: 'Hello!',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      saveMessage.mockResolvedValueOnce();

      await sendMessage(req, res);

      expect(saveMessage).toHaveBeenCalledWith('testChat', expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Message sent' });
    });

    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: { chatId: 'testChat', sender: 'user1' }, // Missing fields
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });

    it('should return 500 if saveMessage fails', async () => {
      const req = {
        body: {
          chatId: 'testChat',
          sender: 'user1',
          recipient: 'user2',
          content: 'Hello!',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      saveMessage.mockRejectedValueOnce(new Error('Failed to save message'));

      await sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to send message',
        details: 'Failed to save message',
      });
    });
  });

  describe('getChatMessages', () => {
    it('should return messages for a specific chat', async () => {
      const req = { params: { chatId: 'testChat' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockMessages = [{ content: 'Hello!' }, { content: 'Hi!' }];
      getMessages.mockResolvedValueOnce(mockMessages);

      await getChatMessages(req, res);

      expect(getMessages).toHaveBeenCalledWith('testChat');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMessages);
    });

    it('should return 400 if chatId is missing', async () => {
      const req = { params: {} }; // Missing chatId
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getChatMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing chatId' });
    });

    it('should return 500 if getMessages fails', async () => {
      const req = { params: { chatId: 'testChat' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      getMessages.mockRejectedValueOnce(new Error('Failed to fetch messages'));

      await getChatMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch messages',
        details: 'Failed to fetch messages',
      });
    });
  });

  describe('getAllMessagesHandler', () => {
    it('should return all messages', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockMessages = [
        { content: 'Message 1' },
        { content: 'Message 2' },
      ];
      getAllMessages.mockResolvedValueOnce(mockMessages);

      await getAllMessagesHandler(req, res);

      expect(getAllMessages).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMessages);
    });

    it('should return 500 if getAllMessages fails', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      getAllMessages.mockRejectedValueOnce(new Error('Failed to fetch all messages'));

      await getAllMessagesHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch all messages',
        details: 'Failed to fetch all messages',
      });
    });
  });

  describe('getLastMessagesForUser', () => {
    it('should return last messages for a user', async () => {
      const req = { params: { userId: 'user1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockChats = {
        chat1: {
          msg1: { sender: 'user1', recipient: 'user2', timestamp: 1000 },
          msg2: { sender: 'user2', recipient: 'user1', timestamp: 2000 },
        },
        chat2: {
          msg1: { sender: 'user3', recipient: 'user1', timestamp: 3000 },
        },
      };

      const mockDb = {
        ref: jest.fn().mockReturnThis(),
        once: jest.fn().mockResolvedValue({ val: () => mockChats }),
      };

      getDatabase.mockReturnValue(mockDb);

      await getLastMessagesForUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { chatId: 'chat1', sender: 'user2', recipient: 'user1', timestamp: 2000 },
        { chatId: 'chat2', sender: 'user3', recipient: 'user1', timestamp: 3000 },
      ]);
    });

    it('should return 400 if userId is missing', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getLastMessagesForUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing userId' });
    });

    it('should return 500 if database fails', async () => {
      const req = { params: { userId: 'user1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockDb = {
        ref: jest.fn().mockReturnThis(),
        once: jest.fn().mockRejectedValue(new Error('Database error')),
      };

      getDatabase.mockReturnValue(mockDb);

      await getLastMessagesForUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch last messages',
        details: 'Database error',
      });
    });
  });
});