import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Progress } from '@chakra-ui/core';
import { maxPiggybanksPerUser } from '../../../src/settings';

const PiggybankLimitUtilization = (props) => {
    const { numActivePiggybanks } = props;
    return (
        <Box textAlign="center" my={2}>
            <Progress
                value={numActivePiggybanks / maxPiggybanksPerUser * 100}
                color="green"
                size="sm"
            />
            <Text>
                {"You're using "}
                {numActivePiggybanks}
                /
                {maxPiggybanksPerUser}
                {' Coindrops'}
            </Text>
            <Text color="#A7A7A7">
                Request a limit increase (it&apos;s free)
            </Text>
        </Box>
    );
};

PiggybankLimitUtilization.propTypes = {
    numActivePiggybanks: PropTypes.number.isRequired,
};

PiggybankLimitUtilization.defaultProps = {

};

export default PiggybankLimitUtilization;
