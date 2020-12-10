import { GetStaticPaths, GetStaticProps } from 'next';
import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

export const getStaticProps: GetStaticProps = async (context) => {
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
  } else {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialPiggybankDbData: piggybankDbData,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const piggybankDocumentReferences = await db()
    .collection('piggybanks')
    .listDocuments();
  const piggybankIds = piggybankDocumentReferences.map(ref => ref.id);
  const paths = piggybankIds.map(piggybankId => ({ params: { piggybankName: piggybankId } }));
  return {
    paths,
    fallback: true,
  };
};

export default PublicPiggybankPage;
