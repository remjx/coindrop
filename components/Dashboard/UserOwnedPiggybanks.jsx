import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Text, Box, Heading, Spinner } from '@chakra-ui/core';
import { db } from '../../utils/client/db';

async function fetchUserOwnedPiggybanks(uid) {
    const piggybanks = await db.collection('piggybanks').where('owner_uid', '==', uid).get();
    if (piggybanks.empty) {
        console.log('No matching documents.');
        return [];
    }
    const piggybankData = [];
    piggybanks.forEach(piggybank => {
        piggybankData.push({
            piggybankName: piggybank.id,
        });
    });
    console.log('piggybankData', piggybankData);
    return piggybankData;
}

const UserOwnedPiggybanks = (props) => {
    const { uid } = props;
    const { data, error } = useSWR(uid, fetchUserOwnedPiggybanks);
    return (
        <Box>
            <Heading>
                User owned piggybanks:
            </Heading>
            {error ? `Error getting piggybank data, please try again ${error}` : 
                data ?
                    data.map(piggybank => (
                        <Heading as="h5" size="sm">
                            {piggybank.piggybankName}
                        </Heading>
                    ))
                : <Spinner size="lg" />
            }
        </Box>
    );
};

UserOwnedPiggybanks.propTypes = {
    uid: PropTypes.string.isRequired,
};

UserOwnedPiggybanks.defaultProps = {

};

export default UserOwnedPiggybanks;
