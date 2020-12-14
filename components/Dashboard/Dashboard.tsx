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
    useDidMountEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user]);
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
