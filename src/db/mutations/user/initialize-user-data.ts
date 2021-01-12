import { db } from '../../../../utils/client/db';
import { User } from '../../../../utils/auth/mapUserData';
import { getDefaultUserData } from '../../schema/user';

// TODO: add data validation here

export const initializeUserData = async (user: User): Promise<void> => {
    const { id, email } = user;
    const userRef = db
        .collection('users')
        .doc(id);
    const defaultUserData = getDefaultUserData(email);
    return userRef.set(defaultUserData);
};
