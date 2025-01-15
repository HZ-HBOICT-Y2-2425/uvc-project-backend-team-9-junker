import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: './variables.env' });

// Path to Firebase credentials
const serviceAccountPath = process.env.FIREBASE_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error('FIREBASE_CREDENTIALS environment variable is not set');
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://junker-communication-default-rtdb.firebaseio.com", // Update with your Realtime Database URL
});

const db = getDatabase();

// Save a message to a chat
export const saveMessage = async (chatId, message) => {
  const chatRef = db.ref(`chats/${chatId}`);
  const newMessageRef = chatRef.push(); // Create a new unique child node
  await newMessageRef.set(message);
};

// Fetch messages for a specific chat
export const getMessages = async (chatId) => {
  const chatRef = db.ref(`chats/${chatId}`);
  const snapshot = await chatRef.once('value');
  const messages = snapshot.val();
  return messages ? Object.values(messages) : [];
};

// Fetch all messages from all chats
export const getAllMessages = async () => {
  const chatsRef = db.ref('chats');
  const snapshot = await chatsRef.once('value');
  const allMessages = [];
  const chats = snapshot.val();
  if (chats) {
    Object.values(chats).forEach((chat) => {
      allMessages.push(...Object.values(chat));
    });
  }
  return allMessages;
};