// https://on.cypress.io/custom-commands

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";
import 'cypress-file-upload';

export const config = {
  apiKey: Cypress.env("NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY"),
  authDomain: Cypress.env("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  databaseURL: Cypress.env("NEXT_PUBLIC_FIREBASE_DATABASE_URL"),
  projectId: Cypress.env("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_URL"),
};

firebase.initializeApp(config);

attachCustomCommands({ Cypress, cy, firebase });
