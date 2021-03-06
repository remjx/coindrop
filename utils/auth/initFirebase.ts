import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_URL,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

export default function initFirebase(): void {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    if (
      process.env.NODE_ENV !== 'development'
      && process.env.NODE_ENV !== 'test'
      && typeof window !== 'undefined'
      && !window.Cypress
    ) {
      firebase.analytics();
    }
  }
}
