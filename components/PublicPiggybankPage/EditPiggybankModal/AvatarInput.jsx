import { useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from '../../../utils/auth/useUser';
import { storage } from '../../../utils/client/storage';

export const getFileExtensionFromMimeType = (mimeType) => mimeType.split('/')[1];

const onInputChange = async ({ event, uid, piggybankName }) => {
    const file = event?.target?.files?.[0];
    const fileExtension = getFileExtensionFromMimeType(file.type);
    const storageRef = storage.ref();
    const photoRef = storageRef.child(`images/users/${uid}/coindrops/${piggybankName}.${fileExtension}`);
    console.log('photoRef', photoRef);
    if (file) {
      try {
        const contentType = file.type;
        if (!contentType.startsWith("image/")) {
          throw new Error("Only images are accepted");
        }
        const snapshot = await photoRef.put(file);
        console.log('upload successful. snapshot:', snapshot);
      } catch (err) {
        console.log("Error uploading object", err, JSON.stringify(err?.response));
      }
    }
};

const AvatarInput = () => {
    const inputRef = useRef(null)
    const { query: { piggybankName } } = useRouter();
    const { user } = useUser();
    const uid = user?.id;
    return (
        <>
          <span>Upload photo...</span>
          <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg, image/webp"
              onChange={(event) => onInputChange({ event, uid, piggybankName })}
            ref={inputRef}
          />
        </>
    );
};

export default AvatarInput;
