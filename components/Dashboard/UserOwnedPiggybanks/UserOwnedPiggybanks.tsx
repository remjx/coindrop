import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { Box, Heading, Text, Spinner, Stack } from '@chakra-ui/react';
import { db } from '../../../utils/client/db';
import PiggybankListItem from './PiggybankListItem';
import AddPiggybankListItem from './AddPiggybankListItem/AddPiggybankListItem';
import PiggybankLimitUtilization from './PiggybankLimitUtilization';
import { PaymentMethod } from '../../PublicPiggybankPage/EditPiggybankModal/PaymentMethodsInput';

async function fetchUserOwnedPiggybanks(uid: string): Promise<{ id: string }[]> {
    const piggybanks = await db
        .collection('piggybanks')
        .where('owner_uid', '==', uid)
        .get();
    if (piggybanks.empty) {
        return [];
    }
    const piggybankData = [];
    piggybanks.forEach(piggybank => {
        piggybankData.push({
            id: piggybank.id,
        });
    });
    return piggybankData;
}

type Props = {
    uid: string
}

const UserOwnedPiggybanks: FunctionComponent<Props> = ({ uid }) => {
    const { data, error }: { data?: PaymentMethod[], error?: any} = useSWR(uid, fetchUserOwnedPiggybanks);
    if (error) {
        return <Text>Error getting data, please try refreshing the page.</Text>;
    }
    if (data) {
        const numActivePiggybanks = data.length;
        return (
            <>
            <Stack spacing={4} my={4} id="user-owned-coindrops">
                {
                numActivePiggybanks > 0
                ? (
                    <>
                    <Heading
                        textAlign="center"
                        fontSize="1.75rem"
                        fontWeight={700}
                    >
                        My Coindrops
                    </Heading>
                    {data.map(piggybank => (
                        <PiggybankListItem
                            key={piggybank.id}
                            id={piggybank.id}
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
        <Box
            textAlign="center"
            mt={6}
        >
            <Text mb={2}>Loading...</Text>
            <Spinner size="lg" />
        </Box>
    );
};

export default UserOwnedPiggybanks;
