import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getDefaultUserData} from "../../../db/schema/user";

admin.initializeApp();
const db = admin.firestore();

export const initializeUser = functions.auth.user().onCreate((user) => {
  const {uid, email} = user;
  const userRef = db
      .collection("users")
      .doc(uid);
  const defaultUserData = getDefaultUserData(email || "");
  userRef.set(defaultUserData);
});
