import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

export const config = {
  apiKey: Cypress.env("NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY"),
  authDomain: Cypress.env("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  databaseURL: Cypress.env("NEXT_PUBLIC_FIREBASE_DATABASE_URL"),
  projectId: Cypress.env("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_URL"),
};

firebase.initializeApp(config);

attachCustomCommands({ Cypress, cy, firebase });
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
