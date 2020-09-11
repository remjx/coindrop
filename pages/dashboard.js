import Dashboard from '../components/Dashboard/Dashboard';
import { useRouter } from 'next/router';
import { useUser } from '../utils/auth/useUser';

const dashboard = () => {
    const router = useRouter();
    const { user } = useUser();
    if (!user) {
        router.push('/');
        return null;
    }
    return <Dashboard />;
}

export default dashboard;
