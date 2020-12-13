import { useEffect, FC, useContext } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { PublicPiggybankDataType, PublicPiggybankDataContext } from '../PublicPiggybankDataContext';
import { db } from '../../../utils/client/db';

const DataRefetcher: FC = () => {
    const { setPiggybankDbData } = useContext(PublicPiggybankDataContext);
    const { query: { piggybankName } } = useRouter();
    const fetchPublicPiggybankData = async (_, swrPiggybankName) => {
        const piggybankRef = await db
            .collection('piggybanks')
            .doc(swrPiggybankName)
            .get();
        if (piggybankRef.exists) {
            return piggybankRef.data() as PublicPiggybankDataType;
        }
        throw new Error('Piggybank does not exist');
    };
    const { data, error } = useSWR(['publicPiggybankData', piggybankName], fetchPublicPiggybankData);
    useEffect(() => {
        if (data) {
            setPiggybankDbData(data);
        }
    }, [data]);
    return null;
};

export default DataRefetcher;
