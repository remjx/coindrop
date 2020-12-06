import { GetServerSideProps } from 'next';
import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { piggybankName: piggybankNameParamCaseInsensitive } = context.params;
  const piggybankNameCaseInsensitive = Array.isArray(piggybankNameParamCaseInsensitive)
    ? piggybankNameParamCaseInsensitive[0]
    : piggybankNameParamCaseInsensitive;
  const piggybankName = piggybankNameCaseInsensitive.toLowerCase();
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
