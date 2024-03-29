import { FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, isSignInWithEmailLink } from 'firebase/auth';
import { firebaseAuth } from '../../utils/auth/initFirebase';

const firebaseAuthConfig = {
  signInFlow: typeof window !== 'undefined' && isSignInWithEmailLink(firebaseAuth, window.location.href) ? 'redirect' : 'popup',
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
