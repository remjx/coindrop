import * as admin from 'firebase-admin';

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

export function initialize(): void {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey?.replace(/\\n/g, '\n'), // https://stackoverflow.com/a/41044630/1332513
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }
}
export const verifyIdToken = (token: string): Promise<admin.auth.DecodedIdToken> => {
  initialize();
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};

export const db = (): FirebaseFirestore.Firestore => {
  initialize();
  return admin.firestore();
};

export default admin;
