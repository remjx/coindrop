import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from "./initFirebase";
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies';
import { mapUserData, User } from './mapUserData';

initFirebase();

type UseUser = {
  user: User,
  logout: () => void,
}

const useUser = (): UseUser => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const logout = async () => firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
      });
      // // TODO: How to handle this?
      // .catch((e) => {
      //   console.error('logout error', e);
      // });

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((googleTokenObject) => {
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
