import { db } from '../../../../utils/client/db';

// TODO: how to import the types from Firestore so this can return the correct Promise type?
export async function getUserData(userId: string): Promise<any> {
    const userRef = db
        .collection('users')
        .doc(userId);
    const user = await userRef.get();
    const userData = user.data();
    return userData;
}
