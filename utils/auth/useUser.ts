import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firebaseAuth } from './initFirebase';
import 'firebase/auth';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies';
import { mapUserData, User } from './mapUserData';

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
    const cancelAuthListener = firebaseAuth.onIdTokenChanged((googleTokenObject) => {
      if (googleTokenObject) {
        const userData = mapUserData(googleTokenObject);
        setUserCookie(userData);
        setUser(userData);
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
