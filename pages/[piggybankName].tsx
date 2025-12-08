import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import PublicPiggybankPage from '../components/PublicPiggybankPage/PublicPiggybankPage';
import { db } from '../utils/auth/firebaseAdmin';
import { PublicPiggybankDataType, PublicPiggybankDataProvider } from '../components/PublicPiggybankPage/PublicPiggybankDataContext';

export const getStaticProps: GetStaticProps = async (context) => {
  const { piggybankName: piggybankNameParamCaseInsensitive } = context.params;
  const piggybankNameCaseInsensitive = Array.isArray(piggybankNameParamCaseInsensitive)
    ? piggybankNameParamCaseInsensitive[0]
    : piggybankNameParamCaseInsensitive;
  const piggybankName = piggybankNameCaseInsensitive.toLowerCase();
  const piggybank = await db.collection('piggybanks').doc(piggybankName).get();
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
  return {
    paths: [],
    fallback: 'blocking',
  };
};

type Props = {
  initialPiggybankDbData: PublicPiggybankDataType
}

const Page: NextPage<Props> = ({ initialPiggybankDbData }) => (
  <PublicPiggybankDataProvider
    initialPiggybankDbData={initialPiggybankDbData}
  >
    <PublicPiggybankPage />
  </PublicPiggybankDataProvider>
);

export default Page;
