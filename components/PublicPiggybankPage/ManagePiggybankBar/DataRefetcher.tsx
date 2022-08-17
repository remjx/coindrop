import { useEffect, FC, useContext } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { collection, doc, getDoc } from 'firebase/firestore';
import { PublicPiggybankDataType, PublicPiggybankDataContext } from '../PublicPiggybankDataContext';
import { db } from '../../../utils/client/db';

const DataRefetcher: FC = () => {
    const { setPiggybankDbData } = useContext(PublicPiggybankDataContext);
    const { query: { piggybankName } } = useRouter();
    const piggybanks = collection(db, 'piggybanks');
    const fetchPublicPiggybankData = async (_, swrPiggybankName) => {
        const piggybank = await getDoc(doc(piggybanks, swrPiggybankName));
        if (piggybank.exists()) {
            return piggybank.data() as PublicPiggybankDataType;
        }
        console.error('piggybank does not exist in refetcher');
        throw new Error('Piggybank does not exist');
    };
    const { data, error } = useSWR(['publicPiggybankData', piggybankName], fetchPublicPiggybankData);
    useEffect(() => {
        if (data) {
            console.log('setting piggybank db data because change', data);
            setPiggybankDbData(data);
        }
    }, [data]);
    return null;
};

export default DataRefetcher;
