import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
export const CREDENTIAL = cert({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: firebasePrivateKey?.replace(/\\n/g, '\n'), // https://stackoverflow.com/a/41044630/1332513
});

const firebaseAdminApp = getApps().length === 0 ? initializeApp({
  credential: CREDENTIAL,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}) : getApp();

export const firebaseAdminAuth = getAuth(firebaseAdminApp);

export const verifyIdToken = (token: string): Promise<DecodedIdToken> => firebaseAdminAuth
    .verifyIdToken(token)
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const db = getFirestore(firebaseAdminApp);
