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

const testFirebase = async () => {
  try {
    const chats = await db.collection('chats').get();
    console.log('Firebase connection successful.');
    chats.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Firebase connection failed:', error.message);
  }
};

testFirebase();