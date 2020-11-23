const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_NAME;

type ImageAttributes = {
    ownerUid: string
    piggybankName: string
    imageAs: "avatar"
    imageStorageId: string
}

export const piggybankImageStoragePath = ({ ownerUid, piggybankName, imageAs, imageStorageId }: ImageAttributes): string => `images/users/${ownerUid}/coindrops/${piggybankName}/${imageAs}-${imageStorageId}`;
export const publicPiggybankImageURL = ({ ownerUid, piggybankName, imageAs, imageStorageId }: ImageAttributes): string => `https://storage.googleapis.com/${bucketName}/${piggybankImageStoragePath({ ownerUid, piggybankName, imageAs, imageStorageId })}`;
