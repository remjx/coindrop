import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import admin, { initialize } from '../../../../utils/auth/firebaseAdmin';

initialize();

const listAllUsers = (nextPageToken) => {
    admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
            console.log('userRecord:', userRecord);
          console.log('userRecord.toJSON():', userRecord.toJSON());
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
      listAllUsers(null);
      res.status(200).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  };

  export default handler;
