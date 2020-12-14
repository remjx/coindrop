import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Text } from '@chakra-ui/react';
import { useUser } from '../../utils/auth/useUser';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';
import UserOwnedPiggybanks from './UserOwnedPiggybanks/UserOwnedPiggybanks';
import { withDefaultLayout } from '../Layout/DefaultLayoutHOC';

const Dashboard: FunctionComponent = () => {
    const router = useRouter();
    const { user } = useUser();
    // just testing a theory as to why create-coindrop-on-dashboard test is failing.... this needs to be reenabled:
    // useDidMountEffect(() => {
    //     if (!user) {
    //         router.push('/');
    //     }
    // }, [user]);
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
