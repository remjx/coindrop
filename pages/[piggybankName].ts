import { GetServerSideProps } from 'next';
import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { piggybankName: piggybankNameParam } = context.params;
  const piggybankName = Array.isArray(piggybankNameParam) ? piggybankNameParam[0] : piggybankNameParam;
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
};

export default PublicPiggybankPage;
