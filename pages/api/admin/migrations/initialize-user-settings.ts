import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import admin, { initialize } from '../../../../utils/auth/firebaseAdmin';

initialize();

const listAllUsers = (nextPageToken) => {
    const db = admin.firestore();
    admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          // TODO: batch write updates to users to set initial settings
          console.log('uid', userRecord.uid);
            console.log('userRecord:', userRecord);
        });
        if (listUsersResult.pageToken) {
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users!', error);
      });
  };

  const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      listAllUsers(undefined);
      res.status(200).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  };

  export default handler;
