import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import { Spinner, Text, Flex } from '@chakra-ui/react';
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
  ],
  credentialHelper: 'none',
  signInSuccessUrl: '/dashboard',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      console.log('sign in successful with auth callback')
      const userData = await mapUserData(user);
      setUserCookie(userData);
      // related: https://stackoverflow.com/questions/63349204/signinsuccesswithauthresult-return-value-in-firebase-ui-callbacks
      // return false;
    },
  },
};

// // Not sure how to get this to render inside of StyledFirebaseAuth after user clicks on sign in method
// const Authenticating = () => (
//   <Flex align="center" justify="center">
//     <Spinner size="24px" mr={2} />
//     <Text>Authenticating...</Text>
//   </Flex>
// );

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  if (!renderAuth) return null;
  return (
    <StyledFirebaseAuth
      uiConfig={firebaseAuthConfig}
      firebaseAuth={firebase.auth()}
    />
  );
};

export default FirebaseAuth;
