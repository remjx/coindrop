import { db } from '../../../../utils/client/db';
import { UserData } from '../../schema/user';

// TODO: add data validation here

export const updateUserData = ({ data, userId }: { data: UserData, userId: string }): Promise<void> => {
    const userRef = db
        .collection('users')
        .doc(userId);
    return userRef.update(data);
};
