import { useEffect, useState, FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Spinner } from "@chakra-ui/react";
import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { firebaseAuth } from '../../utils/auth/initFirebase';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
  ],
  credentialHelper: 'none',
  signInSuccessUrl: '/dashboard',
};

const FirebaseAuth: FunctionComponent = () => {
  if (typeof window === 'undefined') return null;
  return (
    <StyledFirebaseAuth
      uiConfig={firebaseAuthConfig}
      firebaseAuth={firebaseAuth}
    />
  );
};

export default FirebaseAuth;
