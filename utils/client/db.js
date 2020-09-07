import firebase from "firebase";
import "firebase/firestore";
import initFirebase from '../auth/initFirebase';

initFirebase();

export const db = firebase.firestore();