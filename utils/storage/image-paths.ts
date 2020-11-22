type ImageId = {
    ownerUid: string
    piggybankName: string
    imageAs: string
    imageStorageId: string
}

export const piggybankImageStoragePath = ({ ownerUid, piggybankName, imageAs, imageStorageId }: ImageId): string => `images/users/${ownerUid}/coindrops/${piggybankName}/${imageAs}-${imageStorageId}`;
export const publicPiggybankImageURL = ({ ownerUid, piggybankName, imageAs, imageStorageId }: ImageId): string => `https://storage.googleapis.com/coindropto.appspot.com/${piggybankImageStoragePath({ ownerUid, piggybankName, imageAs, imageStorageId })}`;
