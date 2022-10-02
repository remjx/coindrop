import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import * as admin from 'firebase-admin';

// https://stackoverflow.com/a/69959606/711672
// eslint-disable-next-line import/no-unresolved
import * as adminApp from 'firebase-admin/app';

import dotenv from 'dotenv';

dotenv.config();

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // https://stackoverflow.com/a/41044630/1332513
};

export const CREDENTIAL = adminApp.cert(serviceAccount);

export const firebaseAdminApp = adminApp.getApps().length === 0 ? admin.initializeApp({
  credential: CREDENTIAL,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}) : adminApp.getApp();

export default defineConfig({
  projectId: 'gjafub',
  e2e: {
    supportFile: 'cypress/support/commands.js',
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, firebaseAdminApp);
      config.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY;
      config.env.TEST_UID = process.env.CYPRESS_TEST_UID;
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      return require('./cypress/plugins')(on, config);
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
