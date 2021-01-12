// This is used to generate a list of emails that can be uploaded manually to EmailOctopus before sending any manual newsletters.

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../utils/auth/firebaseAdmin';
import { EmailListIds } from '../../../src/db/schema/user';

const getEmailListSubscribers: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { listId }: { listId: EmailListIds } = req.body;
        const ref = db()
            .collection('users')
            .where('email_lists', 'array-contains', listId);
        const querySnapshot = await ref.get();
        const emailAddresses = [];
        querySnapshot.forEach(doc => {
            emailAddresses.push(doc.data().email);
        });
        return res.status(200).send(emailAddresses.join('\n'));
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
};

export default getEmailListSubscribers;
