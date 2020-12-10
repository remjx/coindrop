import { useState, useEffect, FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Text } from '@chakra-ui/react';
import cookies from 'js-cookie';
import { useUser } from '../../utils/auth/useUser';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';
import UserOwnedPiggybanks from './UserOwnedPiggybanks/UserOwnedPiggybanks';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';
import { withDefaultLayout } from '../Layout/DefaultLayoutHOC';

const Dashboard: FunctionComponent = () => {
    const router = useRouter();
    const { user } = useUser();
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
    useDidMountEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user]);
    useEffect(() => {
        const pendingLoginCreatePiggybankPath = cookies.get('pendingLoginCreatePiggybankPath');
        if (pendingLoginCreatePiggybankPath) {
            setCandidatePiggybankPath(pendingLoginCreatePiggybankPath);
            setIsCreateTriggered(true);
        }
    }, []);
    return (
        <>
            <NextSeo
                title="Dashboard | Coindrop"
            />
            {user?.id
            ? (
                <UserOwnedPiggybanks
                    uid={user.id}
                />
            ) : (
                <Text>You are not logged in. Redirecting...</Text>
            )}
        </>
    );
};

export default withDefaultLayout(Dashboard);
