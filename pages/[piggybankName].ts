import { GetStaticPaths, GetStaticProps } from 'next';
import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';

export const getStaticProps: GetStaticProps = async (context) => {
  const { piggybankName: piggybankNameParamCaseInsensitive } = context.params;
  const piggybankNameCaseInsensitive = Array.isArray(piggybankNameParamCaseInsensitive)
    ? piggybankNameParamCaseInsensitive[0]
    : piggybankNameParamCaseInsensitive;
  const piggybankName = piggybankNameCaseInsensitive.toLowerCase();
  const piggybankRef = db()
  .collection('piggybanks')
  .doc(piggybankName);
  const piggybank = await piggybankRef.get();
  let piggybankDbData = {};
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

export const getStaticPaths: GetStaticPaths = async () => {
  const piggybankDocumentReferences = await db()
    .collection('piggybanks')
    .listDocuments();
  const piggybankIds = piggybankDocumentReferences.map(ref => ref.id);
  const paths = piggybankIds.map(piggybankId => ({ params: { piggybankName: piggybankId } }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export default PublicPiggybankPage;
