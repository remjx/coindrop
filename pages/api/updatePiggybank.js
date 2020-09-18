import nc from 'next-connect';
import requireFirebaseToken from '../../server/middleware/requireFirebaseToken';
import { db } from '../../utils/auth/firebaseAdmin';

// TODO: Which of these can be done directly from client using client API?

const createPiggybank = async (req, res) => {
  try {
    // TODO: ensure maximum # piggybanks has not been reached
    const { piggybankName } = req.body;
    const { email, uid } = req.headers;
    const preexisting = await db()
      .collection('piggybanks')
      .doc(piggybankName)
      .get();
    if (!preexisting.exists) {
      await db()
      .collection('piggybanks')
      .doc(piggybankName)
      .set({
        owner_email: email,
        owner_uid: uid,
      });
      return res.status(200).end();
    }
    return res.status(409).send('A piggybank with this name already exists');
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

const updatePiggybank = async (req, res) => {
  try {
    const { piggybankName, field, value } = req.body;
    // TODO: Ensure field is in list of approved apps/coins
    const { email } = req.headers;
    const piggybank = await db()
      .collection('piggybanks')
      .doc(piggybankName)
      .get();
    console.log('piggybank:', piggybank);
    // TODO: check that user is owner of this piggybank
    // Make update
      // .set({ [field]: value });
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

const deletePiggybank = async (req, res) => {
  try {
    const { piggybankName } = req.body;
    const { email } = req.headers;
    const piggybank = await db()
      .collection('piggybanks')
      .doc(piggybankName)
      .get();
    console.log('piggybank:', piggybank);
    // TODO: check that user is owner of this piggybank
    // Delete
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

const handler = nc()
    .use(requireFirebaseToken)
    .post(createPiggybank)
    .put(updatePiggybank)
    .delete(deletePiggybank);

export default handler;
