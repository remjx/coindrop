import { db } from '../../../../utils/client/db';

export async function isCoindropUrlAvailable(path: string): Promise<boolean> {
    const piggybankRef = await db
        .collection('piggybanks')
        .doc(path)
        .get();
    if (piggybankRef.exists) {
        return false;
    }
    return true;
}
