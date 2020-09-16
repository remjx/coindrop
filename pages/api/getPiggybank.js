import nc from 'next-connect';
import requireFirebaseToken from '../../server/middleware/requireFirebaseToken';
import { db } from '../../utils/auth/firebaseAdmin';

const getPiggybank = async (req, res) => {
  console.log('req.query', req.query);
  const { piggybankName } = req.query;
  const piggybank = await db.collection().get();
    if (!doc.exists) {
    console.log('No such document!');
    } else {
    console.log('Document data:', doc.data());
    }
  res.status(200).json({ test: '1'});
};

export default getPiggybank;
