import PropTypes from 'prop-types';
import { Flex, Box, Text, Progress, Link } from '@chakra-ui/react';
import { maxPiggybanksPerUser, githubReadmeHelpUrl } from '../../../src/settings';

const PiggybankLimitUtilization = (props) => {
    const { numActivePiggybanks } = props;
    const pctUtilization = (numActivePiggybanks / maxPiggybanksPerUser) * 100;
    let color = 'blue';
    if (pctUtilization >= 90) {
        color = 'red';
    } else if (pctUtilization >= 80) {
        color = 'orange';
    } else if (pctUtilization >= 70) {
        color = 'yellow';
    }
    if (pctUtilization >= 50) {
        return (
            <Box
                textAlign="center"
                py={4}
            >
                <Progress
                    value={pctUtilization}
                    colorScheme={color}
                    size="sm"
                />
                <Flex wrap="wrap" justify="space-around">
                    <Text mt={2}>
                        {"You're using "}
                        {numActivePiggybanks}
                        /
                        {maxPiggybanksPerUser}
                        {' Coindrops'}
                    </Text>
                    <Text mt={2}>
                        <Link href={githubReadmeHelpUrl} target="_blank" rel="noreferrer">
                            <u>Contact us</u>
                        </Link>
                        {" to request a limit increase (it's free)"}
                    </Text>
                </Flex>
            </Box>
        );
    }
    return null;
};

PiggybankLimitUtilization.propTypes = {
    numActivePiggybanks: PropTypes.number.isRequired,
};

PiggybankLimitUtilization.defaultProps = {

};

export default PiggybankLimitUtilization;
