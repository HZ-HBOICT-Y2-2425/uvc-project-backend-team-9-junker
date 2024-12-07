import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
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
  databaseURL: "https://junker-communication-default-rtdb.firebaseio.com", // Update with your Realtime Database URL
});

const db = getDatabase();

const seedDatabase = async () => {
  const sampleMessages = [
    { sender: 'user1', recipient: 'user2', content: 'Hello!', timestamp: Date.now() },
    { sender: 'user2', recipient: 'user1', content: 'Hi there!', timestamp: Date.now() },
    { sender: 'user2', recipient: 'user1', content: 'How are you?', timestamp: Date.now() },
  ];

  try {
    const chatRef = db.ref('chats/user1_user2');
    sampleMessages.forEach(async (message) => {
      const newMessageRef = chatRef.push();
      await newMessageRef.set(message);
    });
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
};

seedDatabase();