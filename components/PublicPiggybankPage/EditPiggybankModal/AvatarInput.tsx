import { useState, useRef, useContext, FunctionComponent, useEffect } from "react";
import { Flex, FormLabel, Center, Box, Button, Stack, Text, Spinner } from "@chakra-ui/react";
// Conflict with built-in Javascript Image class:
// eslint-disable-next-line import/no-named-default
import { default as NextImage } from 'next/image';
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { v4 as uuidV4 } from 'uuid';
import { mutate } from 'swr';
import { useUser } from '../../../utils/auth/useUser';
import { storage } from '../../../utils/client/storage';
import { piggybankImageStoragePath } from '../../../utils/storage/image-paths';
import { Avatar } from '../avatar/Avatar';
import { PublicPiggybankDataContext } from '../PublicPiggybankDataContext';
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
    const { piggybankDbData } = useContext(PublicPiggybankDataContext);
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
    const [isDataLoading, setIsDataLoading] = useState(false);
    // const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
    const setAvatar = async (newAvatarStorageId) => {
<<<<<<< Updated upstream
      Promise.all([
        piggybankRef.set({ avatar_storage_id: newAvatarStorageId }, { merge: true }),
        deleteImage({
          storageId: currentAvatarStorageId,
          ownerUid: uid,
          piggybankName,
        }),
      ]);
      mutate(['publicPiggybankData', piggybankName], { ...piggybankDbData, avatar_storage_id: newAvatarStorageId });
=======
      setIsDataLoading(true);
      // if (newAvatarStorageId) {
      //   setIsImageLoading(true);
      // } else {
      //   setIsImageLoading(false);
      // }
      try {
        await Promise.all([
          setDoc(piggybankRef, { avatar_storage_id: newAvatarStorageId }, { merge: true }),
          deleteImage({
            storageId: currentAvatarStorageId,
            ownerUid: uid,
            piggybankName,
          }),
        ]);
        mutate(['publicPiggybankData', piggybankName]);
      } catch (err) { 
        console.error('Error setting avatar', err);
      } finally {
        setIsDataLoading(false);
      }
>>>>>>> Stashed changes
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
              isDataLoading ? (
                <Box
                  w={200}
                  h={200}
                  borderRadius="50%"
                >
                  <Center h="100%" w="100%" backgroundColor="#e1e1e1" borderRadius="50%">
                    <Spinner size="lg" color="#a3a3a3" />
                  </Center>
                </Box>
              ) :
              currentAvatarStorageId
              ? <Avatar />
              : (
                <Box w={200} h={200} borderRadius="50%">
                  <NextImage
                    id="avatar-img"
                    width={200}
                    height={200}
                    src="/avatar-placeholder.png"
                    alt="avatar placeholder"
                    data-cy="avatar-placeholder"
                    style={{borderRadius: '50%'}}
                  />
                </Box>
              )
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
                    data-cy="remove-image-btn"
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
