/* eslint-disable import/no-unresolved */
import { initializeApp, cert, getApp, getApps, ServiceAccount } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
/* eslint-enable import/no-unresolved */

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // https://stackoverflow.com/a/41044630/1332513
};

export const firebaseAdminApp = getApps().length === 0 ? initializeApp({
  credential: cert(serviceAccount),
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
