import { FC } from 'react';
import useSWR from 'swr';
import { Box, Heading, Text, Stack, Skeleton } from '@chakra-ui/react';
import { db } from '../../../utils/client/db';
import PiggybankListItem from './PiggybankListItem';
import AddPiggybankListItem from './AddPiggybankListItem/AddPiggybankListItem';
import PiggybankLimitUtilization from './PiggybankLimitUtilization';

const PageTitle: FC = () => (
    <Heading
        textAlign="center"
        fontSize="1.75rem"
        fontFamily="'Fira Sans'; Segoe-UI; sans-serif"
        fontWeight="600"
        mt={4}
    >
        My Coindrops
    </Heading>
);

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
        return <Text>Error getting data, please try refreshing the page.</Text>;
    }
    if (data) {
        const numActivePiggybanks = data.length;
        return (
            <>
            <Stack spacing={4} mb={4} id="user-owned-coindrops">
                {
                numActivePiggybanks > 0
                ? (
                    <>
                    <PageTitle />
                    {data.map(piggybankDocumentID => (
                        <PiggybankListItem
                            key={piggybankDocumentID}
                            id={piggybankDocumentID}
                        />
                    ))}
                    </>
                ) : (
                    <Heading
                        textAlign="center"
                    >
                        No Coindrops yet
                    </Heading>
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
        <PageTitle />
        <Box
            textAlign="center"
            mt={6}
        >
            <Stack id="coindrops-loading-skeleton">
                {SkeletonArray(5).map(v => <LoadingSkeleton key={v} />)}
            </Stack>
        </Box>
        </>
    );
};

export default UserOwnedPiggybanks;
