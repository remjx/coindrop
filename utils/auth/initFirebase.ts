import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import Cookies from 'js-cookie';
import { cookies } from '../../src/cookies';

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

export const firebaseApp = getApps().length === 0 ? initializeApp(config) : getApp();

export const firebaseAuth = getAuth(firebaseApp);

firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    Cookies.set(cookies.isFirebaseUserAuthenticated, 'true');
  } else {
    Cookies.remove(cookies.isFirebaseUserAuthenticated);
  }
});

if (
  process.env.NODE_ENV !== 'development'
  && process.env.NODE_ENV !== 'test'
  && typeof window !== 'undefined'
  && !window.Cypress
) {
  getAnalytics(firebaseApp);
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}
