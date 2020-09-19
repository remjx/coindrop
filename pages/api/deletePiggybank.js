import nc from 'next-connect';
import requireFirebaseToken from '../../server/middleware/requireFirebaseToken';
import { db } from '../../utils/auth/firebaseAdmin';

const deletePiggybank = async (req, res) => {
    try {
      const { name } = req.body;
      const { email } = req.headers;
      const piggybank = await db()
        .collection('piggybanks')
        .doc(name)
        .get();
      if (
        piggybank.exists
        && piggybank.data().owner_email === email
      ) {
        await db()
          .collection('piggybanks')
          .doc(name)
          .delete();
        return res.status(200).end();
      }
      return res.status(410).send('Does not exist');
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
};

const handler = nc()
    .use(requireFirebaseToken)
    .post(deletePiggybank);

export default handler;
