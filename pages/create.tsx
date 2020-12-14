import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import cookies from 'js-cookie';
import { Spinner, Heading, Flex } from '@chakra-ui/react';
import { withDefaultLayout } from '../components/Layout/DefaultLayoutHOC';
import useCreatePiggybank from '../utils/hooks/useCreatePiggybank';
import { useUser } from '../utils/auth/useUser';

const CreateFirstCoindrop: NextPage = () => {
    const { user } = useUser();
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
    useEffect(() => {
        const pendingLoginCreatePiggybankPath = cookies.get('pendingLoginCreatePiggybankPath');
        if (pendingLoginCreatePiggybankPath) {
            setCandidatePiggybankPath(pendingLoginCreatePiggybankPath);
            setIsCreateTriggered(true);
        }
    }, []);
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            my={6}
        >
            <Spinner size="lg" mb={3} />
            <Heading size="lg">
                Creating Coindrop...
            </Heading>
        </Flex>
    );
};

export default withDefaultLayout(CreateFirstCoindrop);
