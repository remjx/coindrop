import { useState, useRef, useContext, FunctionComponent } from "react";
import { Flex, FormLabel, Center, Box, Button, Stack, Text } from "@chakra-ui/react";
// Conflict with built-in Javascript Image class:
// eslint-disable-next-line import/no-named-default
import { default as NextImage } from 'next/image';
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { v4 as uuidV4 } from 'uuid';
import { useUser } from '../../../utils/auth/useUser';
import { storage } from '../../../utils/client/storage';
import { piggybankImageStoragePath } from '../../../utils/storage/image-paths';
import { Avatar } from '../avatar/Avatar';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { db } from '../../../utils/client/db';
import { FileInput, FileInputRef } from '../../Buttons/file-input/FileInput';
import { deleteImage } from '../../../src/db/mutations/delete-image';

function getImageDimensions(file: File): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = reject;
  });
}

const AvatarInput: FunctionComponent = () => {
    const inputRef = useRef<FileInputRef>(null);
    const { piggybankDbData, setPiggybankDbData } = useContext(PublicPiggybankData);
    const currentAvatarStorageId = piggybankDbData.avatar_storage_id;
    const { query: { piggybankName: piggybankNameQuery } } = useRouter();
    const piggybankName = typeof piggybankNameQuery === 'string' ? piggybankNameQuery : piggybankNameQuery[0];
    const { user } = useUser();
    const uid = user?.id;
    const piggybankRef = db.collection('piggybanks').doc(piggybankName);
    const fileSizeError = "Image too large";
    const contentTypeError = "Only images are accepted";
    const imageDimensionsError = "Image height and width must be >= 250px";
    const [fileSelectErrorMessage, setFileSelectErrorMessage] = useState("");
    function clearInput() { inputRef.current.value = null; }
    const setAvatar = async (newAvatarStorageId) => {
      Promise.all([
        piggybankRef.set({ avatar_storage_id: newAvatarStorageId }, { merge: true }),
        deleteImage({
          storageId: currentAvatarStorageId,
          ownerUid: uid,
          piggybankName,
        }),
      ]);
      setPiggybankDbData({ ...piggybankDbData, avatar_storage_id: newAvatarStorageId });
    };
    const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setFileSelectErrorMessage(null);
      const file = event?.target?.files?.[0];
      const storageRef = storage.ref();
      const newAvatarStorageId = uuidV4();
      const newAvatarPath = piggybankImageStoragePath({ ownerUid: uid, piggybankName, imageAs: "avatar", imageStorageId: newAvatarStorageId });
      const newAvatarRef = storageRef.child(newAvatarPath);
      if (file) {
        try {
          const contentType = file.type;
          if (!contentType.startsWith("image/")) {
            throw new Error(contentTypeError);
          }
          if (file.size > 1000000) {
            throw new Error(fileSizeError);
          }
          const { width, height } = await getImageDimensions(file);
          if (width < 250 || height < 250) {
            throw new Error(imageDimensionsError);
          }
          await newAvatarRef.put(file);
          clearInput();
          setAvatar(newAvatarStorageId);
        } catch (err) {
          const { message } = err;
          if (message === fileSizeError) {
            setFileSelectErrorMessage("Image too large. Please resize image to < 1MB.");
          } else if (message === contentTypeError) {
            setFileSelectErrorMessage("Only .jpg, .png, and .webp images are accepted.");
          } else if (message === imageDimensionsError) {
            setFileSelectErrorMessage("Width and height must be at least 250px");
          } else {
            setFileSelectErrorMessage("Error during upload. Please try again.");
          }
          clearInput();
        }
      }
    };
    return (
      <>
        <FormLabel htmlFor="avatar-input">Image</FormLabel>
        <Stack id="avatar-input-container">
          <Box mx="auto">
            {
              currentAvatarStorageId
              ? <Avatar />
              : <NextImage id="avatar-img" width={250} height={250} src="/avatar-placeholder.png" alt="avatar placeholder" />
            }
          </Box>
          <Center>
            <Flex wrap="wrap" justify="center">
              <Box mt={1}>
                <FileInput
                  text={currentAvatarStorageId ? "Upload new image" : "Upload image"}
                  id="avatar-input"
                  ref={inputRef}
                  accept="image/png, image/jpeg, image/webp"
                  onChange={onInputChange}
                />
              </Box>
              {currentAvatarStorageId && (
                <Box ml={2} mt={1}>
                  <Button
                    onClick={() => {
                      setAvatar(null);
                    }}
                    colorScheme="red"
                    size="sm"
                    leftIcon={<DeleteIcon />}
                  >
                    Remove image
                  </Button>
                </Box>
              )}
            </Flex>
          </Center>
          {fileSelectErrorMessage && (
            <Text textAlign="center" color="red.500">
              <WarningIcon mr={2} />
              {fileSelectErrorMessage}
            </Text>
          )}
        </Stack>
      </>
    );
};

export default AvatarInput;
