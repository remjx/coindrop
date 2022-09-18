import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../utils/client/db';
import { UserData } from '../../schema/user';

export const updateUserData = ({ data, userId }: { data: UserData, userId: string }) => {
    const users = collection(db, 'users');
    return setDoc(doc(users, userId), data);
};

export default { updateUserData };
