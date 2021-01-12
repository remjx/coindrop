import { db } from '../../../../utils/client/db';
import { UserData } from '../../schema/user';

export async function getUserData(userId: string): Promise<UserData> {
    console.log('getting actual user data');
    const userRef = db
        .collection('users')
        .doc(userId);
    const user = await userRef.get();
    const userData = user.data();
    return userData as UserData;
}

export default { getUserData };
