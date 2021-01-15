// NOT USED: THIS IS PART OF /API/ NOW, TRIGGERED BY CLOUD FUNCTION

// import { db } from '../../../../utils/client/db';
// import { User } from '../../../../utils/auth/mapUserData';
// import { getDefaultUserData } from '../../schema/user';

// export const initializeUserData = async (user: User): Promise<void> => {
//     const { id, email } = user;
//     const userRef = db
//         .collection('users')
//         .doc(id);
//     const defaultUserData = getDefaultUserData(email);
//     return userRef.set(defaultUserData);
// };

export {};
