import firebase from "firebase";
// TODO: don't need to import whole module?:
/*
It looks like you're using the development build of the Firebase JS SDK.
When deploying Firebase apps to production, it is advisable to only import
the individual SDK components you intend to use.

For the module builds, these are available in the following manner
(replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

CommonJS Modules:
const firebase = require('firebase/app');
require('firebase/<PACKAGE>');

ES Modules:
import firebase from 'firebase/app';
import 'firebase/<PACKAGE>';

Typescript:
import * as firebase from 'firebase/app';
import 'firebase/<PACKAGE>';
*/
import "firebase/firestore";
import initFirebase from '../auth/initFirebase';

initFirebase();

export const db = firebase.firestore();
