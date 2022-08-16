import { useEffect, useState, FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Spinner } from "@chakra-ui/react";
import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { setUserCookie } from '../../utils/auth/userCookies';
import { mapUserData } from '../../utils/auth/mapUserData';
import { firebaseAuth } from '../../utils/auth/initFirebase';

const firebaseAuthConfig = {
  signInFlow: 'redirect',
  signInOptions: [ // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
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
          firebaseAuth={firebaseAuth}
        />
      ) : <Spinner />}
    </div>
  );
};

export default FirebaseAuth;
