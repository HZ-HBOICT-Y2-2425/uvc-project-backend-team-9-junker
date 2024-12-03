import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

export const saveMessage = async (chatId, message) => {
  const chatRef = db.collection('chats').doc(chatId);
  await chatRef.update({
    messages: admin.firestore.FieldValue.arrayUnion(message),
  });
};

export const getMessages = async (chatId) => {
  const chatRef = db.collection('chats').doc(chatId);
  const doc = await chatRef.get();
  return doc.exists ? doc.data().messages : [];
};