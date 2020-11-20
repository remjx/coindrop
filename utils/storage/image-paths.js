export const piggybankImageStoragePath = ({ ownerUid, piggybankName }) => `images/users/${ownerUid}/coindrops/${piggybankName}/avatar`;
export const publicPiggybankImageURL = ({ ownerUid, piggybankName }) => `https://storage.googleapis.com/coindropto.appspot.com/${piggybankImageStoragePath({ ownerUid, piggybankName })}`;
