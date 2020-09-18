import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Box, Heading, Spinner, Stack } from '@chakra-ui/core';
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

function Piggybank({ name }) {
    return (
        <Box p={5} shadow="md" borderWidth="1px" mt={3}>
            <Heading fontSize="xl">{name}</Heading>
            {/* <Text mt={4}>{desc}</Text> */}
        </Box>
    );
}
Piggybank.propTypes = {
    name: PropTypes.string.isRequired,
};

function PiggybankContainer({ children }) {
    return (
        <Stack spacing={8} my={4}>
            {children}
        </Stack>
    );
}
PiggybankContainer.propTypes = {
    children: PropTypes.element.isRequired,
};

const UserOwnedPiggybanks = (props) => {
    const { uid } = props;
    const { data, error } = useSWR(uid, fetchUserOwnedPiggybanks);
    const PiggybankContent = () => {
        if (error) {
            console.error(error);
            return `Error getting piggybank data, please try refreshing the page.`;
        }
        if (data) {
            return (
                <PiggybankContainer>
                    {data.map(piggybank => <Piggybank name={piggybank.piggybankName} />)}
                </PiggybankContainer>
            );
        }
        return <Spinner size="lg" />;
    };
    return (
        <Box>
            <Heading>
                My Piggybanks
            </Heading>
            <PiggybankContent />
        </Box>
    );
};

UserOwnedPiggybanks.propTypes = {
    uid: PropTypes.string.isRequired,
};

UserOwnedPiggybanks.defaultProps = {

};

export default UserOwnedPiggybanks;
