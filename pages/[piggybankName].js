import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

export async function getServerSideProps(context) {
    const { piggybankName } = context.params;
    let addresses = {};
    try {
      const piggybank = await db()
        .collection('piggybanks')
        .doc(piggybankName)
        .get();
      if (piggybank.exists) {
        addresses = piggybank.data();
      }
    } catch (error) {
      console.log('error in getServerSideProps', error);
    }
    console.log('addresses:', addresses);
    return {
      props: {
        addresses,
      },
    };
  }

export default PublicPiggybankPage;
