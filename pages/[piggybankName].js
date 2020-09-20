import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

// TODO: change this to static regeneration

export async function getServerSideProps(context) {
    const { piggybankName } = context.params;
    let addresses = {};
    try {
      const piggybank = await db()
        .collection('piggybanks')
        .doc(piggybankName)
        .get();
      if (piggybank.exists) {
        addresses = Object.entries(piggybank.data()).filter(([field]) => field.startsWith('address_'));
      }
    } catch (error) {
      console.log('error in getServerSideProps', error);
      // TODO: return error page
    }
    return {
      props: {
        addresses,
      },
    };
  }

export default PublicPiggybankPage;
