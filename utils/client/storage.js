import firebase from "firebase/app";
import "firebase/storage";
import initFirebase from '../auth/initFirebase';

initFirebase();

export const storage = firebase.storage();
