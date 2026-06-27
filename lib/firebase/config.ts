import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasFirebaseConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

const app = hasFirebaseConfig ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]) : null;
const messaging = app && typeof window !== 'undefined' ? getMessaging(app) : null;

export { app, messaging, getToken, onMessage };
