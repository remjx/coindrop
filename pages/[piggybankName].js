import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

// TODO: change this to static regeneration

export async function getServerSideProps(context) {
  const { piggybankName } = context.params;
  let piggybankData = {};
  try {
    const piggybank = await db()
      .collection('piggybanks')
      .doc(piggybankName)
      .get();
    if (piggybank.exists) {
      piggybankData = piggybank.data();
    }
  } catch (error) {
    console.log('error in getServerSideProps', error);
    // TODO: return error page
  }
  return {
    props: {
      piggybankData,
    },
  };
}

export default PublicPiggybankPage;
