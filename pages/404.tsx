import { useState, useEffect, FunctionComponent } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { withDefaultLayout } from '../components/Layout/DefaultLayoutHOC';

const Error404: FunctionComponent = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);
        if (countdown === 0) {
            router.push('/');
        }
    });
    return (
        <Box textAlign="center" my={12}>
            <Heading>
                404 - Page Not Found
            </Heading>
            <Text>
                {'Taking you back to the homepage in '}
                {countdown}
                ...
            </Text>
        </Box>
    );
};

export default withDefaultLayout(Error404);
