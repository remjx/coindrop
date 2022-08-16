import { getDoc, doc, collection } from 'firebase/firestore';
import { db } from '../../../../utils/client/db';

export async function isCoindropUrlAvailable(path: string): Promise<boolean> {
    const piggybanks = collection(db, 'piggybanks');
    const piggybank = await getDoc(doc(piggybanks, path));
    if (piggybank.exists) {
        return false;
    }
    return true;
}
