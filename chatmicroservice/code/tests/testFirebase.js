import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

const serviceAccountPath = path.resolve('junker-communication-firebase-adminsdk-4zp7e-f5bc0b6fa2.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

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
    console.error('Firebase connection failed:', error);
  }
};

testFirebase();