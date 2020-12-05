import { FunctionComponent } from 'react';
import { Flex, Box, Text, Progress, Link } from '@chakra-ui/react';
import { maxPiggybanksPerUser, coindropEmail } from '../../../src/settings';

type Props = {
    numActivePiggybanks: number
};

const PiggybankLimitUtilization: FunctionComponent<Props> = ({ numActivePiggybanks }) => {
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
                        <Link href={`mailto:${coindropEmail}`} target="_blank" rel="noreferrer">
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

export default PiggybankLimitUtilization;
