import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

export async function getServerSideProps(context) {
  const { piggybankName } = context.params;
  let piggybankDbData = {};
  const piggybank = await db()
    .collection('piggybanks')
    .doc(piggybankName)
    .get();
  if (piggybank.exists) {
    piggybankDbData = piggybank.data();
  }
  return {
    props: {
      initialPiggybankDbData: piggybankDbData,
    },
  };
}

export default PublicPiggybankPage;
