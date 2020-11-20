import { useState, useRef, useContext } from "react";
import { Box, Button, Stack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useUser } from '../../../utils/auth/useUser';
import { storage } from '../../../utils/client/storage';
import { piggybankImageStoragePath, publicPiggybankImageURL } from '../../../utils/storage/image-paths';
import { AvatarContext } from '../context/avatar-context';
import { Avatar } from '../avatar/Avatar';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { db } from '../../../utils/client/db';

// TODO: set file size limit

const AvatarInput = () => {
    const inputRef = useRef(null);
    const { setImageUploadedDateTime } = useContext(AvatarContext);
    const { piggybankDbData, setPiggybankDbData } = useContext(PublicPiggybankData);
    const hasAvatar = piggybankDbData.has_avatar;
    const { query: { piggybankName } } = useRouter();
    const { user } = useUser();
    const uid = user?.id;
    const piggybankRef = db.collection('piggybanks').doc(piggybankName);
    const fileSizeError = "Image too large";
    const contentTypeError = "Only images are accepted";
    const [fileSelectErrorMessage, setFileSelectErrorMessage] = useState();
    function clearInput() { inputRef.current.value = null; }
    const setHasAvatar = async (value) => {
      const has_avatar = value;
      await piggybankRef.set({
        has_avatar,
      }, { merge: true });
      setPiggybankDbData({ ...piggybankDbData, has_avatar });
    };
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
            setHasAvatar(true);
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
    return (
        <Stack>
          <Box mx="auto">
            {
              hasAvatar
              ? <Avatar />
              : <Image src="/avatar-placeholder.png" alt="avatar placeholder" />
            }
          </Box>
          <Box>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg, image/webp"
                onChange={(event) => onInputChange({ event, uid, piggybankName })}
                ref={inputRef}
                style={{display: "block", margin: "auto"}}
              />
          </Box>
          {fileSelectErrorMessage && <Text color="red.500">{fileSelectErrorMessage}</Text>}
          {hasAvatar && (
            <Button
              onClick={() => {
                setHasAvatar(false);
              }}
              colorScheme="red"
            >
              Remove Photo
            </Button>
          )}
        </Stack>
    );
};

export default AvatarInput;
