import { useEffect, useState, FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import { Spinner } from "@chakra-ui/react";
import 'firebase/auth';
import initFirebase from '../../utils/auth/initFirebase';
import { setUserCookie } from '../../utils/auth/userCookies';
import { mapUserData } from '../../utils/auth/mapUserData';

initFirebase();

const firebaseAuthConfig = {
  signInFlow: 'redirect',
  signInOptions: [ // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
  ],
  credentialHelper: 'none',
  signInSuccessUrl: '/',
  callbacks: {
    // related: https://stackoverflow.com/questions/63349204/signinsuccesswithauthresult-return-value-in-firebase-ui-callbacks
    // TODO: What is the TS type for this function?
    signInSuccessWithAuthResult: ({ user }) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
      return false;
    },
  },
};

const FirebaseAuth: FunctionComponent = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : <Spinner />}
    </div>
  );
};

export default FirebaseAuth;
