import { db } from '../../../../utils/client/db';

type UserSettings = {
    created_at: string
    last_updated_at: string
    last_login_at: string
    email_lists: string[]
}

export async function getUserSettings(userId: string): Promise<UserSettings> {
    const user: any = await db
        .collection('users')
        .doc(userId)
        .get();
    console.log('user data', user);
    return user;
}
