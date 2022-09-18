import { auth } from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import {getDefaultUserData} from "../../../db/schema/user";

initializeApp();
const db = firestore();

export const initializeUser = auth.user().onCreate((user) => {
  const {uid, email} = user;
  const userRef = db
      .collection("users")
      .doc(uid);
  const defaultUserData = getDefaultUserData(email || "");
  userRef.set(defaultUserData);
});
