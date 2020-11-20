import firebase from "firebase";
import "firebase/storage";
import initFirebase from '../auth/initFirebase';

initFirebase();

export const storage = firebase.storage();
