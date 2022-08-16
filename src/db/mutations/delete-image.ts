import { ref, deleteObject } from "firebase/storage";
import { firebaseStorage } from '../../../utils/client/storage';
import { piggybankImageStoragePath } from '../../../utils/storage/image-paths';

type Parameters = {
    storageId: string | null
    ownerUid: string
    piggybankName: string
}

export async function deleteImage({ storageId, ownerUid, piggybankName }: Parameters): Promise<void> {
    if (storageId) {
        const avatarRef = ref(firebaseStorage, piggybankImageStoragePath({
            ownerUid,
            piggybankName,
            imageAs: "avatar",
            imageStorageId: storageId,
        }));
        await deleteObject(avatarRef);
    }
}
