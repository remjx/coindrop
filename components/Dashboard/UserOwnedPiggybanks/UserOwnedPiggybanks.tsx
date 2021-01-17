import { FC } from 'react';
import useSWR from 'swr';
import { Box, Heading, Text, Stack, Skeleton } from '@chakra-ui/react';
import { db } from '../../../utils/client/db';
import PiggybankListItem from './PiggybankListItem';
import AddPiggybankListItem from './AddPiggybankListItem/AddPiggybankListItem';
import PiggybankLimitUtilization from './PiggybankLimitUtilization';
import PageTitle from '../../Title/Title';

const Title = () => <PageTitle title="My Coindrops" />;

function SkeletonArray(n: number): number[] {
    const a = new Array(n);
    let b = 0;
    while (b < n) {
        // eslint-disable-next-line no-plusplus
        a[b++] = b;
    }
    return a;
}

const LoadingSkeleton: FC = () => (
    <Skeleton
        borderRadius="10px"
        height="85px"
    />
);

type PiggybankDocumentID = string

async function fetchUserOwnedPiggybanks(uid: string): Promise<PiggybankDocumentID[]> {
    const piggybanks = await db
        .collection('piggybanks')
        .where('owner_uid', '==', uid)
        .get();
    if (piggybanks.empty) {
        return [];
    }
    const piggybankData = [];
    piggybanks.forEach(piggybank => {
        piggybankData.push(piggybank.id);
    });
    return piggybankData;
}

type Props = {
    uid: string
}

const UserOwnedPiggybanks: FC<Props> = ({ uid }) => {
    const { data, error }: { data?: PiggybankDocumentID[], error?: any} = useSWR(uid, fetchUserOwnedPiggybanks);
    if (error) {
        console.error(error);
        return <Text>Error getting data, please try refreshing the page.</Text>;
    }
    if (data) {
        const numActivePiggybanks = data.length;
        const userHasPiggybanks = numActivePiggybanks > 0;
        return (
            <>
            <Stack spacing={4} mb={4} id="user-owned-coindrops">
                {
                userHasPiggybanks
                ? (
                    <>
                    <Title />
                    {data.map(piggybankDocumentID => (
                        <PiggybankListItem
                            key={piggybankDocumentID}
                            id={piggybankDocumentID}
                        />
                    ))}
                    </>
                ) : (
                    <PageTitle
                        title="Create your first Coindrop:"
                    />
                )
                }
                <AddPiggybankListItem
                    numActivePiggybanks={numActivePiggybanks}
                />
                <PiggybankLimitUtilization
                    numActivePiggybanks={numActivePiggybanks}
                />
            </Stack>
            </>
        );
    }
    return (
        <>
        <Title />
        <Box
            textAlign="center"
            mt={6}
        >
            <Stack data-cy="coindrops-loading-skeleton">
                {SkeletonArray(5).map(v => <LoadingSkeleton key={v} />)}
            </Stack>
        </Box>
        </>
    );
};

export default UserOwnedPiggybanks;
