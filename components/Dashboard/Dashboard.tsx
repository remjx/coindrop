import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import dayjs from 'dayjs';
import { Text } from '@chakra-ui/react';
import firebase from 'firebase/app';
import { useUser } from '../../utils/auth/useUser';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';
import UserOwnedPiggybanks from './UserOwnedPiggybanks/UserOwnedPiggybanks';
import { withDefaultLayout } from '../Layout/DefaultLayoutHOC';
import { initializeUserData } from '../../src/db/mutations/user/initialize-user-data';
import { User } from '../../utils/auth/mapUserData';

const sendWelcomeEmail = (user: User) => {
    const { token } = user;
    axios.get('/api/email/welcome', { headers: { token }});
};

const Dashboard: FunctionComponent = () => {
    const router = useRouter();
    const { user } = useUser();
    useDidMountEffect(() => {
        if (!user) {
            router.push('/');
        }
        // TODO: Move this to Cloud Firestore Functions since they have built-in "onUserCreate" trigger
        // TODO: Need a better way to ensure this is only run one time...
        if (user) {
            const userData = firebase.auth().currentUser;
            const creationTime = userData?.metadata?.creationTime;
            if (creationTime) {
                // https://firebase.google.com/docs/reference/js/firebase.auth.UserMetadata#optional-creationtime
                console.log('account created', dayjs(creationTime).diff(new Date(), 'second'), 'seconds ago');
                const diffSeconds = dayjs(creationTime).diff(new Date(), 'second');
                if (diffSeconds <= 0 && diffSeconds > -30) {
                    console.log('sending welcome e-mail and initializing user data');
                    // sendWelcomeEmail(user);
                    initializeUserData(user);
                }
            }
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
