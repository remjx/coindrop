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
import { mapUserData } from './mapUserData';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState();
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
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user2) => {
      if (user2) {
        const userData = mapUserData(user2);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser();
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
