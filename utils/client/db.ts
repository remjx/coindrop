import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../auth/initFirebase";

export const db = getFirestore(firebaseApp);
