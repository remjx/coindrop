// Run this one time migration to generate user settings for existing users (going forward it will happen on create)
import nc from 'next-connect';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import admin, { initialize } from '../../../../utils/auth/firebaseAdmin';
import { getDefaultUserData } from '../../../../src/db/schema/user';
import requireAdminPassword from '../../../../server/middleware/requireAdminPassword';

initialize();

const initializeUserSettingsForExistingUsers = (nextPageToken: string | undefined = undefined) => {
    const db = admin.firestore();
    admin
      .auth()
      .listUsers(500, nextPageToken)
      .then(async (listUsersResult) => {
        const batch = db.batch();
        listUsersResult.users.forEach((userRecord) => {
          const userRef = db.collection('users').doc(userRecord.uid);
          const defaultUserData = getDefaultUserData(userRecord.email);
          batch.set(userRef, defaultUserData);
        });
        await batch.commit();
        if (listUsersResult.pageToken) {
          initializeUserSettingsForExistingUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users!', error);
        throw error;
      });
  };

  const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      initializeUserSettingsForExistingUsers();
      res.status(200).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  };

  const handlerWithMiddleware = nc()
  .use(requireAdminPassword)
  .post(handler);

export default handlerWithMiddleware;
