import { db } from '../../../../utils/client/db';
import { UserData } from '../../schema/user';
import { User } from '../../../../utils/auth/mapUserData';

// TODO: add data validation here

export const initializeUserData = async (user: User): Promise<void> => {
    const { id, email } = user;
    const userRef = db
        .collection('users')
        .doc(id);
    const defaultUserData: UserData = {
        email,
        email_lists: ["newsletter"],
    };
    return userRef.set(defaultUserData);
};
