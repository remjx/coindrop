import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Box, Text, Spinner, Stack } from '@chakra-ui/core';
import { db } from '../../../utils/client/db';
import PiggybankListItem from './PiggybankListItem';
import AddPiggybankListItem from './AddPiggybankListItem/AddPiggybankListItem';

async function fetchUserOwnedPiggybanks(uid) {
    const piggybanks = await db
        .collection('piggybanks')
        .where('owner_uid', '==', uid)
        .get();
    if (piggybanks.empty) {
        console.log('No matching documents.');
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
        console.error(error);
        return `Error getting piggybank data, please try refreshing the page.`;
    }
    if (data) {
        const numActivePiggybanks = data.length;
        return (
            <Stack spacing={8} my={4}>
                {data.map(piggybank => (
                    <PiggybankListItem
                        key={piggybank.id}
                        id={piggybank.id}
                    />
                ))}
                <AddPiggybankListItem
                    numActivePiggybanks={numActivePiggybanks}
                />
            </Stack>
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
