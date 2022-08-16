import nc from 'next-connect';
import { Storage } from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidV4 } from 'uuid';
import requireFirebaseToken from '../../server/middleware/requireFirebaseToken';
import { db } from '../../utils/auth/firebaseAdmin';
import { maxPiggybanksPerUser, piggybankPathRegex } from '../../src/settings';
import { piggybankImageStoragePath } from '../../utils/storage/image-paths';
import { PublicPiggybankDataType } from '../../components/PublicPiggybankPage/PublicPiggybankDataContext';
import rootPageSlugs from '../page-slugs.json';

const storage = new Storage({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
  },
});

const piggybankExistsErrorMessage = 'A piggybank with this name already exists.';
async function isPiggybankNameNonexistant(piggybankName: string) {
  if (rootPageSlugs.includes(piggybankName)) {
    throw new Error(piggybankExistsErrorMessage);
  }
  const piggybank = await db() // TODO: convert to firestore v9
    .collection('piggybanks')
    .doc(piggybankName)
    .get();
  if (piggybank.exists) {
    throw new Error(piggybankExistsErrorMessage);
  }
  return true;
}

const userOverPiggybankLimitErrorMessage = 'Piggybank limit has been reached.';
async function isUserUnderPiggybankLimit(uid: string): Promise<boolean | Error> {
  const piggybanks = await db() // TODO: convert to firestore v9
    .collection('piggybanks')
    .where('owner_uid', '==', uid)
    .get();
  if (piggybanks.size >= maxPiggybanksPerUser) {
    throw new Error(userOverPiggybankLimitErrorMessage);
  }
  return true;
}

const nameInvalidErrorMessage = 'Coindrop name does not meet the requirements';
function isNameValid(piggybankName: string): Error | true {
  if (!piggybankName.match(piggybankPathRegex)) {
    throw new Error(nameInvalidErrorMessage);
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

type ReqBody = {
  oldPiggybankName?: string
  newPiggybankName: string
  piggybankData?: PublicPiggybankDataType
}

const createPiggybank = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      oldPiggybankName,
      newPiggybankName: newPiggybankNameCaseInsensitive,
      piggybankData,
    }: ReqBody = req.body;
    const newPiggybankName = newPiggybankNameCaseInsensitive.toLowerCase();
    const oldAvatarStorageId = piggybankData?.avatar_storage_id;
    const { uid: uidHeader } = req.headers;
    const uid = Array.isArray(uidHeader) ? uidHeader[0] : uidHeader;
    const newAvatarStorageId = (oldPiggybankName && oldAvatarStorageId) ? uuidV4() : null;
    await Promise.all([
      isPiggybankNameNonexistant(newPiggybankName),
      isUserUnderPiggybankLimit(uid),
      isNameValid(newPiggybankName),
    ]);
    const newPiggybankData: PublicPiggybankDataType = {
      ...piggybankData,
      owner_uid: uid,
      avatar_storage_id: newAvatarStorageId,
    };
    await Promise.all([
      db() // TODO: convert to firestore v9
        .collection('piggybanks')
        .doc(newPiggybankName)
        .set(newPiggybankData),
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
    if (error.message === nameInvalidErrorMessage) {
      return res.status(400).send(nameInvalidErrorMessage);
    }
    return res.status(500).end();
  }
};

const handler = nc()
  .use(requireFirebaseToken)
  .post(createPiggybank);

export default handler;
