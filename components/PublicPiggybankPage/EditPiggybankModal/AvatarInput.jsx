import { useState, useRef, useContext } from "react";
import { Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useUser } from '../../../utils/auth/useUser';
import { storage } from '../../../utils/client/storage';
import { piggybankImageStoragePath, publicPiggybankImageURL } from '../../../utils/storage/image-paths';
import { AvatarContext } from '../context/avatar-context';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { db } from '../../../utils/client/db';

// TODO: set file size limit

const AvatarInput = () => {
    const inputRef = useRef(null);
    const { imageUploadedDateTime, setImageUploadedDateTime } = useContext(AvatarContext);
    const { piggybankDbData: { has_avatar: hasAvatar } } = useContext(PublicPiggybankData);
    const { query: { piggybankName } } = useRouter();
    const { user } = useUser();
    const uid = user?.id;
    const fileSizeError = "Image too large";
    const contentTypeError = "Only images are accepted";
    const [fileSelectErrorMessage, setFileSelectErrorMessage] = useState();
    function clearInput() { inputRef.current.value = null; }
    const onInputChange = async ({ event }) => {
      setFileSelectErrorMessage(null);
      const file = event?.target?.files?.[0];
      const storageRef = storage.ref();
      const photoPath = piggybankImageStoragePath({ ownerUid: uid, piggybankName });
      const photoRef = storageRef.child(photoPath);
      if (file) {
        try {
          const contentType = file.type;
          if (!contentType.startsWith("image/")) {
            throw new Error(contentTypeError);
          }
          if (file.size > 1000000) {
            throw new Error(fileSizeError);
          }
          await photoRef.put(file);
          setImageUploadedDateTime(Date.now());
          clearInput();
          if (!hasAvatar) {
            // update db to set to true
            const piggybankRef = db.collection('piggybanks').doc(piggybankName);
            await piggybankRef.set({
              has_avatar: true,
            }, { merge: true });
          }
        } catch (err) {
          const { message } = err;
          if (message === fileSizeError) {
            setFileSelectErrorMessage("Image too large. Please resize image to < 1MB.");
          } else if (message === contentTypeError) {
            setFileSelectErrorMessage("Only .jpg, .png, and .webp images are accepted.");
          } else {
            setFileSelectErrorMessage("Error during upload. Please try again.");
          }
          clearInput();
        }
      }
    };
    const avatarURL = publicPiggybankImageURL({ ownerUid: uid, piggybankName });
    return (
        <>
          <Image src={`${avatarURL}?${imageUploadedDateTime}`} fallbackSrc="https://via.placeholder.com/150" />
            { /* query param forces refetch */ }
          <span>Upload photo...</span>
          <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg, image/webp"
              onChange={(event) => onInputChange({ event, uid, piggybankName })}
            ref={inputRef}
          />
          {fileSelectErrorMessage && <Text color="red.500">{fileSelectErrorMessage}</Text>}
        </>
    );
};

export default AvatarInput;
