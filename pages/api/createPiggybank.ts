import nc from 'next-connect';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidV4 } from 'uuid';
import requireFirebaseToken from '../../server/middleware/requireFirebaseToken';
import { db } from '../../utils/auth/firebaseAdmin';
import { maxPiggybanksPerUser } from '../../src/settings';
import requireBetaInvite from '../../server/middleware/requireBetaInvite';
import { piggybankImageStoragePath } from '../../utils/storage/image-paths';

const storage = new Storage({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
  },
});

const piggybankExistsErrorMessage = 'A piggybank with this name already exists.';
async function isPiggybankNameNonexistant(piggybankName) {
  const piggybank = await db()
    .collection('piggybanks')
    .doc(piggybankName)
    .get();
  if (piggybank.exists) {
    throw new Error(piggybankExistsErrorMessage);
  }
  return true;
}

const userOverPiggybankLimitErrorMessage = 'Piggybank limit has been reached.';
async function isUserUnderPiggybankLimit(uid) {
  const piggybanks = await db()
    .collection('piggybanks')
    .where('owner_uid', '==', uid)
    .get();
  if (piggybanks.size >= maxPiggybanksPerUser) {
    throw new Error(userOverPiggybankLimitErrorMessage);
  }
  return true;
}

async function renameAvatarFile({ ownerUid, oldPiggybankName, oldAvatarStorageId, newPiggybankName, newAvatarStorageId }: {
  ownerUid: string
  oldPiggybankName: string
  oldAvatarStorageId: string
  newPiggybankName: string
  newAvatarStorageId: string
}) {
  if (oldPiggybankName && oldAvatarStorageId) {
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_NAME;
    const srcFilename = piggybankImageStoragePath({ ownerUid, piggybankName: oldPiggybankName, imageAs: "avatar", imageStorageId: oldAvatarStorageId });
    const destFilename = piggybankImageStoragePath({ ownerUid, piggybankName: newPiggybankName, imageAs: "avatar", imageStorageId: newAvatarStorageId });
    await storage.bucket(bucketName).file(srcFilename).move(destFilename);
  }
}

const createPiggybank = async (req, res) => {
  // TODO: Extend req type to add expected req.body
  try {
    const {
      oldPiggybankName,
      newPiggybankName,
      piggybankData,
    } = req.body;
    const oldAvatarStorageId = piggybankData?.avatar_storage_id;
    const { uid } = req.headers;
    const newAvatarStorageId = (oldPiggybankName && oldAvatarStorageId) ? uuidV4() : null;
    await Promise.all([
      isPiggybankNameNonexistant(newPiggybankName),
      isUserUnderPiggybankLimit(uid),
    ]);
    await Promise.all([
      db()
        .collection('piggybanks')
        .doc(newPiggybankName)
        .set({
          ...piggybankData,
          owner_uid: uid,
          avatar_storage_id: newAvatarStorageId,
        }),
      renameAvatarFile({ ownerUid: uid, oldPiggybankName, oldAvatarStorageId, newPiggybankName, newAvatarStorageId }),
    ]);
    return res.status(200).end();
  } catch (error) {
    if (error.message === piggybankExistsErrorMessage) {
      return res.status(409).send(piggybankExistsErrorMessage);
    }
    if (error.message === userOverPiggybankLimitErrorMessage) {
      return res.status(406).send(userOverPiggybankLimitErrorMessage);
    }
    return res.status(500).end();
  }
};

const handler = nc()
  .use(requireFirebaseToken)
  .use(requireBetaInvite)
  .post(createPiggybank);

export default handler;
