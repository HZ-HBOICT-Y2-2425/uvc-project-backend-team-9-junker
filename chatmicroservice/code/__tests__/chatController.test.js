import { sendMessage, getChatMessages } from '../controllers/chatController.js';
import { saveMessage, getMessages } from '../services/firebaseService.js';

const jest = require('jest');
const describe = require('describe');
const it = require('it');
const expect = require('expect');

// Mock Firebase service functions
jest.mock('../services/firebaseService.js');

describe('Chat Controller Tests - Simple', () => {
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

      saveMessage.mockResolvedValueOnce(); // Mock success for saveMessage

      await sendMessage(req, res);

      expect(saveMessage).toHaveBeenCalledWith('testChat', expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Message sent' });
    });

    it('should return 400 if required fields are missing', async () => {
      const req = { body: { chatId: 'testChat' } }; // Missing sender, recipient, content
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });
  });

  describe('getChatMessages', () => {
    it('should fetch messages for a specific chat', async () => {
      const req = { params: { chatId: 'testChat' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockMessages = [{ content: 'Hello!' }, { content: 'Hi!' }];
      getMessages.mockResolvedValueOnce(mockMessages); // Mock success for getMessages

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
  });
});