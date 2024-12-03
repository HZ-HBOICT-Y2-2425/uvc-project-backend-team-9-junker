import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: './variables.env' });

// Path to Firebase credentials
const serviceAccountPath = path.resolve(process.env.FIREBASE_CREDENTIALS);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const seedDatabase = async () => {
  const sampleMessages = [
    { sender: 'user1', recipient: 'user2', content: 'Hello!', timestamp: Date.now() },
    { sender: 'user2', recipient: 'user1', content: 'Hi there!', timestamp: Date.now() },
    { sender: 'user3', recipient: 'user1', content: 'How are you?', timestamp: Date.now() },
  ];

  try {
    const chatRef = db.collection('chats').doc('chat1');
    await chatRef.set({ messages: sampleMessages });
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
};

seedDatabase();