import { useEffect, useState } from 'react';
import router from 'next/router';
import { User } from 'firebase/auth';
import { firebaseAuth } from './initFirebase';

type UseUser = {
  user: User | null,
  logout: () => void,
}

const useUser = (): UseUser => {
  const [user, setUser] = useState<User>(null);

  const logout = async () => firebaseAuth
      .signOut()
      .then(() => {
        setUser(null);
        console.log('redirecting to / from useUser', router);
        router.push('/');
      })
      .catch(error => {
        console.error(error);
        throw error;
      });

  useEffect(() => {
    const onAuthStateChanged = firebaseAuth.onAuthStateChanged(_user => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(null);
      }
    });

    return () => {
      onAuthStateChanged();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, logout };
};

export { useUser };

export default { useUser };
