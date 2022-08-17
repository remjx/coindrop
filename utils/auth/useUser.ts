import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
import { firebaseAuth } from './initFirebase';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies';

type UseUser = {
  user: User | null,
  logout: () => void,
}

const useUser = (): UseUser => {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  const logout = async () => firebaseAuth
      .signOut()
      .then(() => {
        router.push('/');
      });
      // // TODO: How to handle this? use async/await instead of .then?
      // .catch((e) => {
      //   console.error('logout error', e);
      // });

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebaseAuth.onIdTokenChanged((_user) => {
      if (_user) {
        setUserCookie(_user);
        setUser(_user);
      } else {
        removeUserCookie();
        setUser(null);
      }
    });
    const userFromCookie = getUserFromCookie();
    setUser(userFromCookie);

    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, logout };
};

export { useUser };

export default { useUser };
