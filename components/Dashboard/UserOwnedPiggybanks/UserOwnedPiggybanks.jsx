import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Box, Heading, Text, Spinner, Stack } from '@chakra-ui/react';
import { db } from '../../../utils/client/db';
import PiggybankListItem from './PiggybankListItem';
import AddPiggybankListItem from './AddPiggybankListItem/AddPiggybankListItem';
import PiggybankLimitUtilization from './PiggybankLimitUtilization';

async function fetchUserOwnedPiggybanks(uid) {
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

const UserOwnedPiggybanks = ({ uid }) => {
    const { data, error } = useSWR(uid, fetchUserOwnedPiggybanks);
    if (error) {
        return `Error getting piggybank data, please try refreshing the page.`;
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
                        No piggybanks yet!
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
            <Text mb={2}>Loading piggybanks...</Text>
            <Spinner size="lg" />
        </Box>
    );
};

UserOwnedPiggybanks.propTypes = {
    uid: PropTypes.string.isRequired,
};

UserOwnedPiggybanks.defaultProps = {

};

export default UserOwnedPiggybanks;
