import nc from 'next-connect';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import requireFirebaseToken from '../../../server/middleware/requireFirebaseToken';
import { db } from '../../../utils/auth/firebaseAdmin';
import { EmailListIds } from '../../../src/db/schema/user';

const deleteAllUserCoindrops = async (userId: string): Promise<FirebaseFirestore.WriteResult[]> => {
    const querySnapshot = await db().collection('piggybanks').where('owner_uid', '==', userId).get();
    const batch = db().batch();
    querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    return batch.commit();
};

const deleteUser: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const uid = Array.isArray(req.headers.uid) ? req.headers.uid[0] : req.headers.uid;
        await db().runTransaction(async (t) => {
            const querySnapshot = await t.get(db().collection('piggybanks').where('owner_uid', '==', uid));
            querySnapshot.forEach((doc) => {
                t.delete(doc.ref);
            });
            t.delete(db().collection('users').doc(uid));
        });
        await admin.auth().deleteUser(uid);
        return res.status(200).end();
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
};

const handler = nc()
  .use(requireFirebaseToken)
  .get(deleteUser);

export default handler;
