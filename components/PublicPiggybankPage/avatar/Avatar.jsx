import { useContext } from "react";
import { useRouter } from "next/router";
import { Image } from '@chakra-ui/react';
import styles from './Avatar.module.css';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankImageURL } from '../../../utils/storage/image-paths';
import { AvatarContext } from '../context/avatar-context';

export const Avatar = () => {
    const { piggybankDbData: { owner_uid: ownerUid, has_avatar: hasAvatar } } = useContext(PublicPiggybankData);
    const { imageUploadedDateTime } = useContext(AvatarContext);
    const { query: { piggybankName }} = useRouter();
    const gsPublicImageURL = publicPiggybankImageURL({ ownerUid, piggybankName });
    if (!hasAvatar) return null;
    return (
        <div className={styles["image-wrapper"]}>
            <Image
                src={`${gsPublicImageURL}?${imageUploadedDateTime}`}
                alt="avatar"
                className={styles.image}
            />
        </div>
    );
};
