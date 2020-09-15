import nc from 'next-connect';
import requireFirebaseToken from '../../server/middleware/requireFirebaseToken';
import { db } from '../../utils/auth/firebaseAdmin';

const createPiggybank = async (req, res) => {
  try {
    const { piggybankName } = req.body;
    const { email } = req.headers;
    const res = await db()
      .collection('users')
      .doc(email)
      .collection('piggybanks')
      .doc(piggybankName)
      .set({});
    console.log('RES', res);
    return res.status(200).json({
      piggybankName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

const handler = nc()
    .use(requireFirebaseToken)
    .post(createPiggybank);

export default handler;
