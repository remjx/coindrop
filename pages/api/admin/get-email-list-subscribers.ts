// This is used to generate a list of emails that can be uploaded manually to EmailOctopus before sending any manual newsletters.
import nc from 'next-connect';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../utils/auth/firebaseAdmin';
import { EmailListIds } from '../../../src/db/schema/user';
import requireAdminPassword from '../../../server/middleware/requireAdminPassword';

const getEmailListSubscribers: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { listId }: { listId: EmailListIds } = req.body;
        const users = await db.collection('users').where('email_lists', 'array-contains', listId).get();
        const emailAddresses = [];
        users.forEach(doc => {
            emailAddresses.push(doc.data().email);
        });
        return res.status(200).send(emailAddresses.join('\n'));
    } catch (err) {
        console.error(err);
        return res.status(400).end();
    }
};

const handler = nc()
  .use(requireAdminPassword)
  .post(getEmailListSubscribers);

export default handler;
