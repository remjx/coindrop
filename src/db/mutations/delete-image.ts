import { storage } from '../../../utils/client/storage';
import { piggybankImageStoragePath } from '../../../utils/storage/image-paths';

type Parameters = {
    storageId: string | null
    ownerUid: string
    piggybankName: string
}

export async function deleteImage({ storageId, ownerUid, piggybankName }: Parameters): Promise<void> {
    if (storageId) {
        const storageRef = storage.ref();
        const avatarRef = storageRef.child(piggybankImageStoragePath({
            ownerUid,
            piggybankName,
            imageAs: "avatar",
            imageStorageId: storageId,
        }));
        await avatarRef.delete();
    }
}
