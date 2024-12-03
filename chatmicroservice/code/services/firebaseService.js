import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

// Path to Firebase credentials
const serviceAccountPath = path.resolve('code/junker-communication-firebase-adminsdk.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Save a message to a chat
export const saveMessage = async (chatId, message) => {
  const chatRef = db.collection('chats').doc(chatId);
  await chatRef.set(
    { messages: FieldValue.arrayUnion(message) },
    { merge: true }
  );
};

// Fetch messages for a specific chat
export const getMessages = async (chatId) => {
  const chatRef = db.collection('chats').doc(chatId);
  const doc = await chatRef.get();
  return doc.exists ? doc.data().messages || [] : [];
};

// Fetch all messages from all chats
export const getAllMessages = async () => {
  const snapshot = await db.collection('chats').get();
  const allMessages = [];
  snapshot.forEach((doc) => {
    const { messages } = doc.data();
    allMessages.push(...(messages || []));
  });
  return allMessages;
};