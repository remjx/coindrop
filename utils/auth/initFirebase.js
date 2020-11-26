import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { config } from './firebase-config';

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
