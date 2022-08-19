import { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Center, Spinner } from '@chakra-ui/react';
import { useUser } from '../../utils/auth/useUser';
import UserOwnedPiggybanks from './UserOwnedPiggybanks/UserOwnedPiggybanks';
import { withDefaultLayout } from '../Layout/DefaultLayoutHOC';

const Dashboard: FunctionComponent = () => {
    const router = useRouter();
    const { user } = useUser();
    // useEffect(() => {
    //     if (!user) {
    //         console.log('redirecting to / from dashboard router', router);
    //         router.push('/');
    //     }
    // }, [user]);

    return (
        <>
            <NextSeo
                title="My Coindrops"
            />
            {user
            ? (
                <UserOwnedPiggybanks
                    uid={user.uid}
                />
            ) : (
                <Center mt={10}>
                    <Spinner />
                </Center>
            )}
        </>
    );
};

export default withDefaultLayout(Dashboard);
