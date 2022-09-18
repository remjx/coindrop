import { getStorage } from "firebase/storage";
import { firebaseApp } from '../auth/initFirebase';

export const firebaseStorage = getStorage(firebaseApp);
