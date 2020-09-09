import { useRouter } from 'next/router';
import LandingPage from '../components/LandingPage/LandingPage';
import { useUser } from '../utils/auth/useUser';

export default () => {
    const router = useRouter();
    const { user, logout } = useUser();
    console.log('user', user);
    if (!user) return <LandingPage />
    router.push('/dashboard');
    return null;
}
