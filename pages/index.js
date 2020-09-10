import { useRouter } from 'next/router';
import LandingPage from '../components/LandingPage/LandingPage';
import { useUser } from '../utils/auth/useUser';

const index = () => {
    const router = useRouter();
    const { user } = useUser();
    if (!user) return <LandingPage />
    router.push('/dashboard');
    return null;
}

export default index;
