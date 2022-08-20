import { getDoc, doc, collection } from 'firebase/firestore';
import { db } from '../../../../utils/client/db';
import { UserData } from '../../schema/user';

export async function getUserData(userId: string): Promise<UserData> {
    const users = collection(db, 'users');
    const user = await getDoc(doc(users, userId));
    const userData = user.data();
    return userData as UserData;
}

export default { getUserData };
