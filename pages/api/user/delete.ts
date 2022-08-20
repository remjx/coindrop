import nc from 'next-connect';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import requireFirebaseToken from '../../../server/middleware/requireFirebaseToken';
import { db, firebaseAdminAuth } from '../../../utils/auth/firebaseAdmin';

const deleteUser: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const uid = Array.isArray(req.headers.uid) ? req.headers.uid[0] : req.headers.uid;
        const piggybanks = await db.collection('piggybanks').where('owner_uid', '==', uid).get();
        await db.runTransaction(async (t) => {
            piggybanks.forEach((piggybank) => {
                t.delete(piggybank.ref);
            });
            const user = db.collection('users').doc(uid);
            t.delete(user);
        });
        await firebaseAdminAuth.deleteUser(uid);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end();
    }
};

const handler = nc()
  .use(requireFirebaseToken)
  .get(deleteUser);

export default handler;
