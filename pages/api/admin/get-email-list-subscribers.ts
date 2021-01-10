// This should be used to update the list of emails in EmailOctopus before sending any manual newsletters.

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../utils/auth/firebaseAdmin';

const getEmailListSubscribers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { listId }: { listId: string } = req.body;
        const ref = db()
            .collection('email-lists')
            .doc(listId)
            .collection('user-emails');
        const querySnapshot = await ref.get();
        const emailAddresses = [];
        querySnapshot.forEach(doc => {
            emailAddresses.push(doc.id);
        });
        return res.status(200).send(emailAddresses.join('\n'));
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
};

export default getEmailListSubscribers;
